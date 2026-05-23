import { useState, FormEvent } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Mail, CheckCircle2, Cpu, Sparkles, Copy, Check } from 'lucide-react';
import { CartItem } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, color: string, delta: number) => void;
  onRemoveItem: (productId: string, color: string) => void;
  onScrollToSection: (sectionId: string) => void;
  onClearCart: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onScrollToSection,
  onClearCart
}: CartSidebarProps) {
  const { formatPrice } = useCurrency();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Completed Order structures
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);
  const [invoiceItems, setInvoiceItems] = useState<CartItem[]>([]);
  const [invoiceTotal, setInvoiceTotal] = useState(0);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipmentFee = subtotal > 75 ? 0 : 9.99;
  const dispatchTotal = subtotal + shipmentFee;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('0020201177');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckoutSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill in authorization fields to secure database handshake.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: cartItems,
          total: dispatchTotal,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          details: notes || "No specific payload instructions."
        })
      });

      if (res.ok) {
        const data = await res.json();
        setCompletedOrderId(data.orderId);
        setInvoiceItems([...cartItems]);
        setInvoiceTotal(dispatchTotal);
        
        // Wipe local active cart inside UI
        onClearCart();
      } else {
        alert("Transaction routing blocked by gateway rules.");
      }
    } catch (err) {
      console.error("Order submission error:", err);
      alert("Database link failed. Please check local server terminal console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAndReset = () => {
    setIsCheckingOut(false);
    setCompletedOrderId(null);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden flex justify-end">
      
      {/* Dark overlay backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleCloseAndReset}
      />

      {/* Slide-over cart layout container */}
      <div className="relative w-full max-w-md h-full bg-[#0D0D0D] border-l border-[#1E1E1E] shadow-2xl flex flex-col justify-between z-10 animate-[letterReveal_0.3s_cubic-bezier(0.16,1,0.3,1)]">
        
        {/* Banner Head */}
        <div className="p-6 border-b border-[#1E1E1E] flex items-center justify-between bg-[#080808]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyber-cyan" />
            <h2 className="font-display font-black text-xs sm:text-sm text-white tracking-widest uppercase">
              {completedOrderId 
                ? "ORDER SECURED ✅" 
                : isCheckingOut 
                ? "SECURE CHECKOUT MATRIX" 
                : `COMMAND BUNDLE (${cartItems.reduce((sum, item) => sum + item.quantity, 0)})`
              }
            </h2>
          </div>
          <button 
            onClick={handleCloseAndReset}
            className="p-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Display Areas */}
        <div className="flex-grow overflow-y-auto p-6 space-y-5">
          
          {/* OPTION 1: SUCCESS VIEW RECEIPT */}
          {completedOrderId ? (
            <div className="text-center space-y-5 animate-[letterReveal_400ms_cubic-bezier(0.16,1,0.3,1)]">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <div>
                <h3 className="font-display text-base font-black text-white tracking-wider uppercase">
                  TRANSACTION ESTABLISHED
                </h3>
                <p className="text-gray-500 text-xs mt-1">
                  Unique Order Code: <strong className="text-cyber-cyan font-mono">{completedOrderId}</strong>
                </p>
              </div>

              {/* Alert Note */}
              <div className="p-4 bg-green-950/20 border border-green-900/30 text-green-400 text-left rounded-lg space-y-1.5 text-xs">
                <p className="font-bold flex items-center gap-1">
                  <Mail className="w-4 h-4 text-green-400 shrink-0" />
                  Store Owner Alert Dispatched!
                </p>
                <p className="font-sans leading-relaxed text-[11px] text-gray-300">
                  Your purchase specifications were pushed to the system database. An email notification was generated to alert <strong className="text-white">aminuibrahimknk37@gmail.com</strong>.
                </p>
              </div>

              {/* Invoice Specs */}
              <div className="border border-[#1E1E1E] rounded-lg p-4 bg-[#080808] text-left space-y-3 font-mono text-[11px]">
                <h4 className="font-display text-xs text-[#FF9500] font-bold border-b border-[#222] pb-2 uppercase tracking-wider">Purchase Voucher</h4>
                <div className="space-y-1.5">
                  {invoiceItems.map((item, id) => (
                    <div key={id} className="flex justify-between text-gray-400">
                      <span className="truncate max-w-[250px]">{item.product.name} ({item.selectedColor}) <strong className="text-white">x{item.quantity}</strong></span>
                      <span className="text-white">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#222] pt-2 flex justify-between font-bold text-xs text-cyber-cyan">
                  <span>TOTAL PAID BALANCE:</span>
                  <span>{formatPrice(invoiceTotal)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCloseAndReset}
                  className="w-full font-display text-xs font-black tracking-widest bg-cyber-cyan text-black py-4 rounded hover:scale-102 transition-all uppercase cursor-pointer"
                >
                  DISMISS VOUCHER
                </button>
                <p className="text-[10px] text-gray-500 font-mono tracking-widest">
                  Thank you for supporting MAINK Tech.
                </p>
              </div>
            </div>

          // OPTION 2: CHECKOUT SUBMIT FORM
          ) : isCheckingOut ? (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs font-sans animate-[letterReveal_300ms_cubic-bezier(0.16,1,0.3,1)]">
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-cyber-cyan font-mono font-bold tracking-widest">STEP 2 OF 2</span>
                <h3 className="font-display font-black text-sm text-white tracking-widest uppercase">CONVERT CREDENTIAL PATHS</h3>
                <p className="text-gray-500 text-[11px] leading-relaxed">
                  Provide your client coordinates to establish data connection and alert the terminal operator.
                </p>
              </div>

              {/* BRAND NEW ELEGANT PAYMENT METHOD CARD */}
              <div className="p-4 rounded-lg bg-[#111] border border-cyber-cyan/30 space-y-3 relative overflow-hidden backdrop-blur-sm shadow-[0_4px_20px_rgba(0,245,255,0.05)]">
                <div className="absolute top-0 right-0 w-16 h-16 bg-cyber-cyan/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-[#222] pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-cyber-cyan font-bold uppercase">
                      SECURE BANK TRANSFER
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-gray-500">GATEWAY SECURE</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-[10px] tracking-wider uppercase">Bank Name</span>
                    <span className="text-white font-sans font-bold text-xs uppercase tracking-wide">Jaiz Bank</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-[10px] tracking-wider uppercase">Account Number</span>
                    <div className="flex items-center gap-2">
                      <span className="text-cyber-cyan font-mono font-black text-sm tracking-widest">0020201177</span>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="p-1.5 hover:bg-white/5 active:scale-90 text-gray-400 hover:text-cyber-cyan rounded transition-all cursor-pointer flex items-center justify-center border border-[#1e1e1e]"
                        title="Copy Account Number"
                      >
                        {copied ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-[10px] tracking-wider uppercase">Account Name</span>
                    <span className="text-white font-sans font-bold text-xs uppercase tracking-wide">Aminu Ibrahim</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1E1E1E] text-[10px] text-gray-400 font-sans leading-snug">
                  💡 <strong className="text-gray-200">Instructions:</strong> Please complete your bank transfer of the <strong className="text-white">Total Order Balance</strong> below to the credentials above, then fill in your secure contact information below to finalize order routing.
                </div>
              </div>

              <hr className="border-[#1B1B1B]" />

              {/* Name input */}
              <div className="space-y-1">
                <label className="text-gray-400 uppercase font-mono tracking-widest text-[10px] block font-bold">Commander Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aminu Ibrahim"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#111] hover:bg-[#141414] focus:bg-[#161616] border border-[#222] focus:border-cyber-cyan rounded p-3 text-white text-xs outline-none transition-all"
                />
              </div>

              {/* Email input */}
              <div className="space-y-1">
                <label className="text-gray-400 uppercase font-mono tracking-widest text-[10px] block font-bold">Email Endpoint</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. commander@mainktech.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111] hover:bg-[#141414] focus:bg-[#161616] border border-[#222] focus:border-cyber-cyan rounded p-3 text-white text-xs outline-none transition-all"
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-1">
                <label className="text-gray-400 uppercase font-mono tracking-widest text-[10px] block font-bold">Phone Connection</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +234 806 439 4479"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#111] hover:bg-[#141414] focus:bg-[#161616] border border-[#222] focus:border-cyber-cyan rounded p-3 text-white text-xs outline-none transition-all"
                />
              </div>

              {/* Instructions text area */}
              <div className="space-y-1">
                <label className="text-gray-400 uppercase font-mono tracking-widest text-[10px] block font-bold">Special Shipment Payload Notes</label>
                <textarea
                  placeholder="e.g. Dispatch to Kano state terminal warehouse / Add specific keycap pullers."
                  value={notes}
                  rows={3}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#111] hover:bg-[#141414] focus:bg-[#161616] border border-[#222] focus:border-cyber-cyan rounded p-3 text-white text-xs outline-none transition-all resize-none"
                />
              </div>

              {/* Checkout pricing summary overlay */}
              <div className="bg-[#080808] border border-[#1E1E1E] rounded-md p-4 space-y-1 flex justify-between items-center text-xs font-mono">
                <span className="text-gray-400">TOTAL ORDER BALANCE:</span>
                <span className="text-cyber-cyan font-bold font-sans text-sm">{formatPrice(dispatchTotal)}</span>
              </div>

              {/* Submit Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-display text-xs font-black tracking-widest bg-cyber-cyan text-black py-4 rounded hover:scale-102 transition-all shadow-md hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] uppercase cursor-pointer flex items-center justify-center gap-2"
                >
                  <Cpu className="w-4 h-4 animate-pulse" />
                  {isSubmitting ? "TRANSMITTING HANDSHAKE..." : "AUTHORIZE & DEPLOY PATHWAYS"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="w-full text-center text-[10px] font-mono tracking-widest text-gray-500 hover:text-white py-1 uppercase transition-colors cursor-pointer"
                >
                  ◀ BACK TO COMMAND BUNDLE REVIEW
                </button>
              </div>
            </form>

          // OPTION 3: CART ITEMS LIST VIEW
          ) : (
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full py-16 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#111] border border-dashed border-[#222] flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">
                      STATION BUNDLE EMPTY
                    </h3>
                    <p className="text-gray-500 text-xs font-sans mt-1 max-w-xs leading-relaxed">
                      No active precision instruments mapped. Ready to load e-sports gear?
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onScrollToSection('products');
                    }}
                    className="font-display text-xs font-bold tracking-widest bg-cyber-cyan text-black px-6 py-3 rounded hover:scale-102 transition-all uppercase cursor-pointer"
                  >
                    PROCEED TO GEAR LIST
                  </button>
                </div>
              ) : (
                <div className="space-y-4 divide-y divide-[#1B1B1B]">
                  {cartItems.map((item, index) => (
                    <div 
                      key={`${item.product.id}-${item.selectedColor}`}
                      className={`flex gap-4 pt-4 ${index === 0 ? 'pt-0' : ''}`}
                    >
                      {/* Thumbnail frame */}
                      <div className="w-16 h-16 bg-[#111] p-1 border border-[#222] rounded flex-shrink-0 flex items-center justify-center">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="max-h-full object-contain filter"
                        />
                      </div>

                      {/* Meta descriptions */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-sans font-bold text-xs sm:text-sm text-white leading-tight uppercase">
                              {item.product.name}
                            </h4>
                            <button 
                              onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                              className="text-gray-600 hover:text-red-500 p-0.5 cursor-pointer"
                              aria-label={`Remove ${item.product.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          {/* Active color choice indicators */}
                          <p className="text-[10px] font-mono text-cyber-cyan font-bold uppercase mt-1">
                            SKIN: {item.selectedColor}
                          </p>
                        </div>

                        {/* Quantity Modification steppers & Item subtotals */}
                        <div className="flex justify-between items-center mt-2 font-mono">
                          <div className="flex items-center bg-[#111] border border-[#222] rounded">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, -1)}
                              className="px-2 py-1 text-gray-500 hover:text-white transition-colors cursor-pointer font-bold text-xs"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold text-white select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, 1)}
                              className="px-2 py-1 text-gray-500 hover:text-white transition-colors cursor-pointer font-bold text-xs"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-display font-bold text-xs sm:text-sm text-white">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pricing Summary Footer area */}
        {!completedOrderId && cartItems.length > 0 && (
          <div className="p-6 bg-[#080808] border-t border-[#1E1E1E] space-y-4">
            
            {/* Calculation details */}
            {!isCheckingOut && (
              <div className="space-y-2 text-xs font-mono text-gray-400">
                <div className="flex justify-between">
                  <span>BUNDLE SUB-TOTAL:</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SECURED DELIVERY TRACK:</span>
                  <span>{shipmentFee === 0 ? <strong className="text-green-500">FREE GLOBAL</strong> : formatPrice(shipmentFee)}</span>
                </div>
                {subtotal < 75 && (
                  <div className="text-[9px] text-cyber-amber bg-cyber-amber/5 p-2 rounded border border-cyber-amber/10 leading-snug">
                    * Dynamic dispatch note: Add <strong className="text-white">{formatPrice(75 - subtotal)}</strong> more to gain free global priority delivery.
                  </div>
                )}
                <hr className="border-[#1C1C1C]" />
                <div className="flex justify-between text-sm font-bold pt-1">
                  <span className="text-cyber-cyan uppercase">SECURE DISPATCH BALANCE:</span>
                  <span className="text-cyber-cyan font-sans">{formatPrice(dispatchTotal)}</span>
                </div>
              </div>
            )}

            {/* Glowing active checkout CTAs */}
            {!isCheckingOut && (
              <div className="space-y-2 pt-2 animate-[letterReveal_250ms_cubic-bezier(0.16,1,0.3,1)]">
                <button 
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full font-display text-xs sm:text-sm font-black tracking-widest bg-cyber-cyan text-black py-4 rounded hover:scale-102 transition-all shadow-md hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] uppercase cursor-pointer"
                >
                  DEPLOY COMMAND DESK BILLS
                </button>

                <button 
                  onClick={onClose}
                  className="w-full text-center text-[10px] font-mono tracking-widest text-gray-500 hover:text-white py-1 uppercase transition-colors cursor-pointer"
                >
                  CONTINUE EXPLORING PRODUCTS ARCHIVE
                </button>
              </div>
            )}

            {/* Shield and warranty flags */}
            <div className="pt-2 border-t border-[#1A1A1A] flex items-center justify-center gap-2 text-[9px] font-mono text-gray-500 uppercase">
              <ShieldCheck className="w-4 h-4 text-cyber-cyan" /> 256-Bit SSL protection audit
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
