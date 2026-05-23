import { useState, useEffect } from 'react';
import { Database, Mail, Eye, Activity, RefreshCw, X, ShieldAlert, CheckCircle2, AlertTriangle, PlayCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface AdminConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminConsole({ isOpen, onClose }: AdminConsoleProps) {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'visits' | 'orders' | 'emails'>('visits');
  const [logs, setLogs] = useState<{
    visits: Array<any>;
    orders: Array<any>;
    emails: Array<any>;
  }>({ visits: [], orders: [], emails: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMail, setSelectedMail] = useState<any | null>(null);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/owner-data');
      if (res.ok) {
        const data = await res.json();
        setLogs({
          visits: data.visits || [],
          orders: data.orders || [],
          emails: data.emails || [],
        });
      }
    } catch (err) {
      console.error("Error fetching logs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen]);

  const handleResetLogs = async () => {
    if (window.confirm("Are you sure you want to clear all database tracking logs (visits, orders, sent emails)?")) {
      try {
        const res = await fetch('/api/reset-logs', { method: 'POST' });
        if (res.ok) {
          fetchLogs();
          setSelectedMail(null);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[20000] overflow-hidden flex items-end sm:items-center justify-center p-4">
      {/* Dark Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      {/* Control Station Panel */}
      <div className="relative w-full max-w-5xl h-[85vh] bg-[#0c0c0c] border border-[#222] rounded-xl shadow-2xl overflow-hidden flex flex-col z-10 animate-[letterReveal_400ms_cubic-bezier(0.16,1,0.3,1)]">
        
        {/* Header Ribbon */}
        <div className="p-4 sm:p-6 bg-[#080808] border-b border-[#1E1E1E] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#FF9500]/10 border border-[#FF9500]/30 flex items-center justify-center text-[#FF9500]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 px-2 py-0.5 rounded">
                  System Database Portal
                </span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <h2 className="font-display font-black text-base sm:text-lg text-white tracking-widest uppercase">
                Owner Control Station
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={fetchLogs}
              disabled={isLoading}
              className="px-3 py-2 bg-[#111] hover:bg-white/5 border border-[#222] text-gray-400 hover:text-white rounded flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer"
              title="Refresh logs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              RELOAD DB
            </button>
            <button
              onClick={handleResetLogs}
              className="px-3 py-2 bg-red-950/20 hover:bg-red-900/30 border border-red-900/40 text-red-400 hover:text-red-300 rounded text-xs font-mono transition-colors cursor-pointer"
            >
              RESET DB
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Informational Config Instructions Banner */}
        <div className="px-6 py-3 bg-[#111111]/80 border-b border-[#1E1E1E] flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-gray-400 font-sans">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-cyber-cyan shrink-0 animate-pulse" />
            <span>
              Real-time Database is live tracking <strong>Website Visits</strong> and <strong>Orders</strong>. Next, they attempt to route mail alerts to <strong className="text-white">aminuibrahimknk37@gmail.com</strong>.
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyber-amber px-2.5 py-1 bg-cyber-amber/5 border border-cyber-amber/20 rounded">
            <Activity className="w-3.5 h-3.5 shrink-0" />
            <span>Set SMTP_HOST & SMTP_USER in .env for true outbox relays</span>
          </div>
        </div>

        {/* Database Content Columns */}
        <div className="flex-grow overflow-hidden flex flex-col md:flex-row">
          
          {/* Side Tabs Navigation */}
          <div className="w-full md:w-56 bg-[#080808] border-r border-[#1E1E1E] p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
            <button
              onClick={() => { setActiveTab('visits'); setSelectedMail(null); }}
              className={`flex-1 md:flex-initial w-full text-left px-4 py-3 rounded font-display text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-3.5 border cursor-pointer ${
                activeTab === 'visits'
                  ? 'bg-cyber-cyan/10 border-cyber-cyan text-white shadow-sm'
                  : 'bg-transparent border-[#222]/0 text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-4 h-4 text-cyber-cyan" />
              <span>Visits Log ({logs.visits.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('orders'); setSelectedMail(null); }}
              className={`flex-1 md:flex-initial w-full text-left px-4 py-3 rounded font-display text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-3.5 border cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-cyber-cyan/10 border-cyber-cyan text-white shadow-sm'
                  : 'bg-transparent border-[#222]/0 text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Database className="w-4 h-4 text-cyber-amber" />
              <span>Orders ({logs.orders.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('emails'); setSelectedMail(null); }}
              className={`flex-1 md:flex-initial w-full text-left px-4 py-3 rounded font-display text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-3.5 border cursor-pointer ${
                activeTab === 'emails'
                  ? 'bg-cyber-cyan/10 border-cyber-cyan text-white shadow-sm'
                  : 'bg-transparent border-[#222]/0 text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mail className="w-4 h-4 text-green-400" />
              <span>Sent Emails ({logs.emails.length})</span>
            </button>
          </div>

          {/* Database Content Area */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 bg-[#0c0c0c]">
            
            {/* TA 1: Visits Monitor */}
            {activeTab === 'visits' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-bold text-xs sm:text-sm tracking-widest text-[#FF9500] uppercase">
                    ACTIVE SESSIONS DATABASE (VISITORS)
                  </h3>
                  <span className="text-[10px] font-mono text-gray-500">
                    Saves visitor IP and client user agent
                  </span>
                </div>

                {logs.visits.length === 0 ? (
                  <div className="border border-dashed border-[#222] rounded-lg p-10 text-center text-gray-500 text-xs">
                    No session footprints stored. Close and reinitialize connection to begin tracking.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-[#1E1E1E] rounded">
                    <table className="w-full text-left border-collapse font-sans text-xs">
                      <thead>
                        <tr className="bg-[#080808] border-b border-[#1E1E1E] text-gray-400 font-mono text-[10px] uppercase">
                          <th className="p-3">Visit Code</th>
                          <th className="p-3">Timestamp</th>
                          <th className="p-3">Client Address (IP)</th>
                          <th className="p-3">Agent Specs</th>
                          <th className="p-3 text-center">Alert Mail Triggered</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.visits.slice().reverse().map((visit: any) => (
                          <tr key={visit.id} className="border-b border-[#1e1e1e] hover:bg-white/[0.02] transition-colors">
                            <td className="p-3 font-mono text-cyber-cyan font-bold">{visit.id}</td>
                            <td className="p-3 text-gray-400 font-mono text-[11px]">{new Date(visit.timestamp).toLocaleString()}</td>
                            <td className="p-3 text-cyber-amber font-mono font-bold">{visit.ip}</td>
                            <td className="p-3 text-gray-400 truncate max-w-xs" title={visit.userAgent}>{visit.userAgent}</td>
                            <td className="p-3 text-center">
                              {visit.sessionStarted ? (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px]">
                                  <CheckCircle2 className="w-3 h-3" /> YES
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 text-gray-500 text-[10px]">
                                  No (Interval)
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TA 2: Orders Monitor */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-bold text-xs sm:text-sm tracking-widest text-[#FF9500] uppercase">
                    CONFIRMED PURCHASE ORDERS DATABASE
                  </h3>
                  <span className="text-[10px] font-mono text-gray-500">
                    Stores client profiles and items bought
                  </span>
                </div>

                {logs.orders.length === 0 ? (
                  <div className="border border-dashed border-[#222] rounded-lg p-10 text-center text-gray-500 text-xs text-balance">
                    🚨 No transactions logged in db.json files. Proceed to checkout inside the CART sidebar and place an order to see it populate live here.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {logs.orders.slice().reverse().map((order: any) => (
                      <div key={order.id} className="border border-[#1E1E1E] hover:border-cyber-cyan/30 rounded-lg p-5 bg-[#080808]/60 space-y-4 transition-all">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-[#1E1E1E] pb-3">
                          <div>
                            <span className="text-[10px] font-mono text-cyber-amber font-bold tracking-widest uppercase bg-cyber-amber/10 border border-cyber-amber/20 px-2 py-0.5 rounded">
                              SECURED TRANSACTION
                            </span>
                            <h4 className="font-display font-bold text-sm text-white mt-1.5">
                              CODE: {order.id}
                            </h4>
                          </div>
                          <div className="text-right sm:text-right">
                            <p className="text-xs text-cyber-cyan font-bold font-display text-lg">{formatPrice(order.total)}</p>
                            <p className="text-[10px] text-gray-500 font-mono mt-0.5">{new Date(order.timestamp).toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                          {/* Client profiles */}
                          <div className="space-y-2 border-r border-[#1E1E1E] pr-4">
                            <h5 className="font-display text-[11px] tracking-wide text-gray-400 uppercase">Customer Meta Profiles</h5>
                            <p className="text-white"><strong className="text-gray-500">Name:</strong> {order.customerName}</p>
                            <p className="text-cyber-cyan"><strong className="text-gray-500">Email:</strong> {order.customerEmail}</p>
                            <p className="text-white"><strong className="text-gray-500">Phone:</strong> {order.customerPhone}</p>
                            {order.details && <p className="text-gray-400 italic">"{order.details}"</p>}
                          </div>

                          {/* Items descriptions */}
                          <div className="space-y-2">
                            <h5 className="font-display text-[11px] tracking-wide text-gray-400 uppercase">Acquired Gear Specs</h5>
                            <ul className="space-y-1">
                              {order.items?.map((item: any, i: number) => (
                                <li key={i} className="flex justify-between text-white font-mono text-[11px]">
                                  <span>{item.product?.name} ({item.selectedColor}) <strong className="text-[#FF9500]">x{item.quantity}</strong></span>
                                  <span className="text-gray-400">{formatPrice(item.product?.price * item.quantity)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TA 3: Emails Outbox/Inbox Monitor */}
            {activeTab === 'emails' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">
                
                {/* Left Side: Mail Lists */}
                <div className="lg:col-span-5 space-y-3 overflow-y-auto max-h-[50vh]">
                  <h3 className="font-display font-black text-[11px] tracking-widest text-[#FF9500] uppercase mb-1">
                    OUTGOING NOTIFICATION STREAM
                  </h3>

                  {logs.emails.length === 0 ? (
                    <div className="border border-dashed border-[#222] rounded p-5 text-center text-gray-500 text-xs">
                      No relay mails recorded in buffer.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {logs.emails.slice().reverse().map((mail: any) => (
                        <div
                          key={mail.id}
                          onClick={() => setSelectedMail(mail)}
                          className={`p-3 rounded border text-left cursor-pointer transition-all ${
                            selectedMail?.id === mail.id
                              ? 'bg-cyber-cyan/10 border-cyber-cyan'
                              : 'bg-[#080808]/80 border-[#1E1E1E] hover:border-gray-700'
                          }`}
                        >
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-[#FF9500] font-bold">{mail.id}</span>
                            <span className="text-gray-500">{new Date(mail.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <h4 className="font-sans font-bold text-xs text-white truncate mt-1">{mail.subject}</h4>
                          <p className="text-[10px] text-gray-400 mt-1">To: {mail.to}</p>
                          
                          <div className="mt-2 flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded text-[8px] uppercase font-bold tracking-widest font-mono ${
                              mail.status === 'Sent'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : mail.status === 'Failed'
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                            }`}>
                              {mail.status}
                            </span>
                            <button className="text-[9px] text-cyber-cyan hover:underline flex items-center gap-1">
                              <Eye className="w-3 h-3" /> PREVIEW
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Side: Visual Email HTML Previewer */}
                <div className="lg:col-span-7 border border-[#1E1E1E] rounded-lg bg-[#050505] p-4 flex flex-col justify-between overflow-hidden">
                  {selectedMail ? (
                    <div className="flex flex-col h-full space-y-4">
                      
                      {/* Email metadata header */}
                      <div className="border-b border-[#222] pb-3 space-y-1.5 text-xs font-sans text-gray-400">
                        <p><strong className="text-white">FROM:</strong> MAINK Tech Automation (Port 3000 Node Alert Express)</p>
                        <p><strong className="text-white">TO:</strong> {selectedMail.to} (Owner Endpoint)</p>
                        <p><strong className="text-white">SUBJECT:</strong> <span className="text-white font-bold">{selectedMail.subject}</span></p>
                        <p><strong className="text-white">SENT:</strong> {new Date(selectedMail.timestamp).toLocaleString()}</p>
                      </div>

                      {/* Visual email markup template render (styled inside custom shadow container or iframe) */}
                      <div className="flex-grow bg-[#0c0c0c] border border-[#1e1e1e] rounded overflow-y-auto p-4 flex justify-center">
                        <div 
                          className="w-full max-w-lg"
                          dangerouslySetInnerHTML={{ __html: selectedMail.html }}
                        />
                      </div>

                      <div className="text-[10px] font-mono text-gray-500 text-center">
                        This HTML email compiles with beautiful tables and neon styling triggers. Set your SMTP environment keys outside the sandbox to dispatch actual emails.
                      </div>

                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10 text-gray-500 text-xs text-balance">
                      <Mail className="w-12 h-12 text-gray-600 mb-3" />
                      <h4>SELECT AN OUTGOING MAIL TO RENDER PREVIEW</h4>
                      <p className="mt-1">Allows you to view HTML alert templates dispatched dynamically on visitors/purchases.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
