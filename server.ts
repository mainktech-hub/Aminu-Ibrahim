import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "db.json");
const OWNER_EMAIL = "aminuibrahimknk37@gmail.com";

// Express configurations
app.use(express.json());

// Initialize Database
interface DBStructure {
  visits: Array<{
    id: string;
    userAgent: string;
    ip: string;
    timestamp: string;
    sessionStarted: boolean;
  }>;
  orders: Array<{
    id: string;
    items: Array<any>;
    total: number;
    customerEmail: string;
    customerPhone: string;
    customerName: string;
    details: string;
    timestamp: string;
  }>;
  emails: Array<{
    id: string;
    to: string;
    subject: string;
    text: string;
    html: string;
    timestamp: string;
    status: "Sent" | "Failed" | "Console (No SMTP)";
  }>;
}

const getDB = (): DBStructure => {
  if (!fs.existsSync(DB_FILE)) {
    const initialDb: DBStructure = { visits: [], orders: [], emails: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2));
    return initialDb;
  }
  try {
    const content = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error parsing Database, resetting...", error);
    const initialDb: DBStructure = { visits: [], orders: [], emails: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2));
    return initialDb;
  }
};

const saveDB = (db: DBStructure) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
};

// Helper function to send email notifications and log them to Database
async function sendNotificationEmail(subject: string, text: string, html: string) {
  const db = getDB();
  const mailId = `mail-${Math.random().toString(36).substring(2, 9)}`;
  const timestamp = new Date().toISOString();

  let status: "Sent" | "Failed" | "Console (No SMTP)" = "Console (No SMTP)";

  // Check if SMTP is configured (even of basic keys)
  const isSmtpConfigured = process.env.SMTP_USER || process.env.SMTP_HOST || process.env.SMTP_PASS;

  if (isSmtpConfigured) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"MAINK Tech System" <${process.env.SMTP_USER || "no-reply@mainktech.com"}>`,
        to: OWNER_EMAIL,
        subject,
        text,
        html,
      });

      status = "Sent";
      console.log(`[EMAIL] Successfully sent email to ${OWNER_EMAIL} via SMTP.`);
    } catch (err: any) {
      console.error("[EMAIL] SMTP connection failed:", err.message);
      status = "Failed";
    }
  } else {
    console.log(`\n=============================================================`);
    console.log(`[SIMULATED EXTERNAL OUTBOX] New Email To: ${OWNER_EMAIL}`);
    console.log(`Subject: ${subject}`);
    console.log(`Timestamp: ${timestamp}`);
    console.log(`Body:\n${text}`);
    console.log(`=============================================================\n`);
  }

  // Push to local database log
  db.emails.push({
    id: mailId,
    to: OWNER_EMAIL,
    subject,
    text,
    html,
    timestamp,
    status,
  });
  saveDB(db);
}

// REST API Database Endpoints
// 1. Visit Log Action
app.post("/api/visit", async (req, res) => {
  const { sessionStarted, userAgent } = req.body;
  const db = getDB();
  
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1") as string;
  const timestamp = new Date().toISOString();
  const id = `visit-${Math.random().toString(36).substring(2, 9)}`;

  // Log in db
  db.visits.push({
    id,
    userAgent: userAgent || "Unknown Client",
    ip,
    timestamp,
    sessionStarted: !!sessionStarted,
  });
  saveDB(db);

  // Trigger email notification for new visitor session
  if (sessionStarted) {
    const subject = `🔥 MAINK TECH NEW VISITOR ALERT`;
    const text = `A user has just accessed the MAINK Tech platform.\n\nDetails:\n- Visitor ID: ${id}\n- IP: ${ip}\n- Client: ${userAgent}\n- Time: ${timestamp}\n\nReview this visitor record in the Owner Command dashboard.`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background-color: #0d0d0d; color: #ffffff; border: 2px solid #00F5FF; border-radius: 8px;">
        <h2 style="color: #00F5FF; border-bottom: 1px solid #1E1E1E; padding-bottom: 10px; text-transform: uppercase; margin-top: 0;">🔥 Visitor Tracking Alert</h2>
        <p>A new commander has connected to the <strong>MAINK Tech</strong> platform network.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr>
            <td style="padding: 10px; background-color: #111; font-weight: bold; border: 1px solid #1e1e1e; width: 30%;">Session ID</td>
            <td style="padding: 10px; border: 1px solid #1e1e1e;">${id}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #111; font-weight: bold; border: 1px solid #1e1e1e;">IP Address</td>
            <td style="padding: 10px; border: 1px solid #1e1e1e; font-family: monospace; color: #FF9500;">${ip}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #111; font-weight: bold; border: 1px solid #1e1e1e;">Client Browser</td>
            <td style="padding: 10px; border: 1px solid #1e1e1e; font-size: 12px; color: #9CA3AF;">${userAgent}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #111; font-weight: bold; border: 1px solid #1e1e1e;">Universal Time</td>
            <td style="padding: 10px; border: 1px solid #1e1e1e; font-family: monospace;">${timestamp}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; font-size: 11px; color: #6b7280; text-align: center; border-t: 1px solid #1E1E1E; padding-top: 10px;">
          MAINK Tech Live Database Tracking • Port 3000 Ingress
        </div>
      </div>
    `;

    await sendNotificationEmail(subject, text, html);
  }

  res.status(200).json({ success: true, visitId: id });
});

// 2. Order Submission Action
app.post("/api/order", async (req, res) => {
  const { items, total, customerName, customerEmail, customerPhone, details } = req.body;
  const db = getDB();

  const id = `order-${Math.random().toString(36).substring(2, 5).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const timestamp = new Date().toISOString();

  const newOrder = {
    id,
    items: items || [],
    total: total || 0,
    customerEmail: customerEmail || OWNER_EMAIL,
    customerPhone: customerPhone || "Not Provided",
    customerName: customerName || "Anonymised Commander",
    details: details || "No details provided",
    timestamp,
  };

  db.orders.push(newOrder);
  saveDB(db);

  // Compile visual orders list
  const formattedItems = newOrder.items.map((item: any) => 
    `- ${item.product.name} (${item.selectedColor}) x${item.quantity} = $${(item.product.price * item.quantity).toFixed(2)}`
  ).join("\n");

  const itemsHtml = newOrder.items.map((item: any) => `
    <tr style="border-bottom: 1px solid #1e1e1e;">
      <td style="padding: 12px; font-weight: bold;">${item.product.name} <span style="font-size: 11px; font-weight: normal; color: #FF9500; display: block;">Skin: ${item.selectedColor}</span></td>
      <td style="padding: 12px; text-align: center; color: #9CA3AF;">x${item.quantity}</td>
      <td style="padding: 12px; text-align: right; font-weight: bold; color: #00F5FF;">$${(item.product.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join("");

  // Trigger real or simulated notification mail to aminuibrahimknk37@gmail.com
  const subject = `🚨 MAINK TECH ALERT: ORDER PLACED BY ${newOrder.customerName.toUpperCase()}`;
  const text = `Congratulations! You received a new purchase order.\n\nOrder Code: ${id}\nClient: ${newOrder.customerName}\nEmail: ${newOrder.customerEmail}\nPhone: ${newOrder.customerPhone}\n\nItems Ordered:\n${formattedItems}\n\nTOTAL AMOUNT SECURED: $${newOrder.total.toFixed(2)}\n\nCommand Station Instructions: ${newOrder.details}\nTimestamp: ${timestamp}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 25px; background-color: #070707; color: #ffffff; border: 2px solid #FF9500; border-radius: 12px;">
      <div style="text-align: center; border-bottom: 2px solid #1E1E1E; padding-bottom: 15px; margin-bottom: 20px;">
        <span style="background-color: rgb(255, 149, 0, 0.15); border: 1px solid #FF9500; color: #FF9500; padding: 4px 12px; font-size: 10px; font-weight: bold; border-radius: 4px; letter-spacing: 2px;">NEW TRANSACTION</span>
        <h2 style="color: #FF9500; text-transform: uppercase; margin: 10px 0 0 0; font-size: 20px; font-weight: 900; letter-spacing: 1px;">Order Confirmed!</h2>
        <p style="color: #a3a3a3; font-size: 12px; margin: 5px 0 0 0;">Transaction Code: ${id}</p>
      </div>

      <h3 style="color: #00F5FF; font-size: 14px; text-transform: uppercase; margin-top: 0; border-left: 2px solid #00F5FF; padding-left: 8px;">Commander Profiles</h3>
      <table style="width: 100%; margin-bottom: 20px; font-size: 13px;">
        <tr>
          <td style="color: #a3a3a3; padding: 4px 0; width: 30%;">Full Name</td>
          <td style="font-weight: bold; color: white;">${newOrder.customerName}</td>
        </tr>
        <tr>
          <td style="color: #a3a3a3; padding: 4px 0;">Email Endpoint</td>
          <td style="font-weight: bold; color: #00F5FF;">${newOrder.customerEmail}</td>
        </tr>
        <tr>
          <td style="color: #a3a3a3; padding: 4px 0;">Phone Device</td>
          <td style="font-weight: bold; color: #white;">${newOrder.customerPhone}</td>
        </tr>
        <tr>
          <td style="color: #a3a3a3; padding: 4px 0;">Special Payload</td>
          <td style="font-style: italic; color: #FF9500;">"${newOrder.details}"</td>
        </tr>
      </table>

      <h3 style="color: #00F5FF; font-size: 14px; text-transform: uppercase; border-left: 2px solid #00F5FF; padding-left: 8px; margin-bottom: 12px;">Order Inventories</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="background-color: #111; color: #a3a3a3;">
            <th style="padding: 10px; text-align: left; border: 1px solid #1e1e1e;">Unit Name</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #1e1e1e; width: 15%;">Qty</th>
            <th style="padding: 10px; text-align: right; border: 1px solid #1e1e1e; width: 25%;">Allocated</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
          <tr style="background-color: #141414; font-size: 15px; font-weight: bold;">
            <td colspan="2" style="padding: 12px; text-align: right; color: white; border-top: 2px solid #1e1e1e;">TOTAL VALUE SECURED</td>
            <td style="padding: 12px; text-align: right; color: #FF9500; border-top: 2px solid #1e1e1e; font-size: 16px;">$${newOrder.total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 25px; border-top: 1px solid #1e1e1e; padding-top: 15px; text-align: center;">
        <p style="font-size: 12px; color: #888; margin: 0;">Automated SMTP Server Alert Engine</p>
        <p style="font-size: 10px; color: #555; margin: 5px 0 0 0;">Receivers: ${OWNER_EMAIL} • WhatsApp Direct Admin Ready</p>
      </div>
    </div>
  `;

  await sendNotificationEmail(subject, text, html);

  res.status(200).json({ success: true, orderId: id });
});

// 3. Admin Console Data Retrieve
app.get("/api/owner-data", (req, res) => {
  const db = getDB();
  res.status(200).json(db);
});

// 4. Admin Reset Action (for user interactive playfulness)
app.post("/api/reset-logs", (req, res) => {
  const resetDb: DBStructure = { visits: [], orders: [], emails: [] };
  saveDB(resetDb);
  res.status(200).json({ success: true, message: "Engine log files reset." });
});

// Integrate Vite middleware in dev env
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] Ready. Serving MAINK Tech system on http://0.0.0.0:${PORT}`);
  });
}

startServer();
