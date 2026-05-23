import { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, ArrowLeftRight, Trash2, Check, ShieldAlert } from 'lucide-react';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  initialProductA?: Product | null;
  initialProductB?: Product | null;
  onAddToCart: (product: Product, colorName: string) => void;
}

export default function CompareModal({
  isOpen,
  onClose,
  products,
  initialProductA,
  initialProductB,
  onAddToCart
}: CompareModalProps) {
  const { formatPrice } = useCurrency();
  const [productA, setProductA] = useState<Product | null>(null);
  const [productB, setProductB] = useState<Product | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialProductA) setProductA(initialProductA);
      if (initialProductB) setProductB(initialProductB);
    }
  }, [isOpen, initialProductA, initialProductB]);

  if (!isOpen) return null;

  const handleSwap = () => {
    const temp = productA;
    setProductA(productB);
    setProductB(temp);
  };

  const handleClearA = () => setProductA(null);
  const handleClearB = () => setProductB(null);

  // Filter out already selected products for slot selection
  const availableForA = products.filter(p => !productB || p.id !== productB.id);
  const availableForB = products.filter(p => !productA || p.id !== productA.id);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#020205]/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-[#0A0914] border border-[#191830] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col z-10 max-h-[90vh] animate-[letterReveal_400ms_cubic-bezier(0.16,1,0.3,1)]">
        {/* Decorative Neon top line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-cyber-cyan via-[#8A2BE2] to-cyber-amber" />
        
        {/* Header Column */}
        <div className="px-6 py-4 border-b border-[#191830] bg-[#05050C]/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan rounded">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold tracking-widest text-white uppercase">
                SPECIFICATIONS COMPARATOR
              </h2>
              <p className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase">
                Side-by-side physical validation & feature routing
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-white rounded-full transition-all cursor-pointer border border-transparent hover:border-[#191830]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Panel for Setup */}
        <div className="bg-[#05050C]/50 px-6 py-3 border-b border-[#191830] flex flex-wrap gap-4 items-center justify-between text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
            <span>Select any two hardware units to dynamically inspect metrics</span>
          </div>

          {productA && productB && (
            <button
              onClick={handleSwap}
              className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 text-white rounded border border-[#191830] cursor-pointer hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all text-[11px]"
            >
              <ArrowLeftRight className="w-3 h-3" />
              SWAP SLOTS
            </button>
          )}
        </div>

        {/* Content Container (Scrollable) */}
        <div className="flex-grow overflow-y-auto p-6 space-y-8 scrollbar-thin">
          
          {/* Active Product Selectors & Hero Info Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* Splitter Line on desktop */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-[#191830]/60 -translate-x-1/2" />

            {/* Left Slot - Product A */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wide text-cyber-cyan font-bold uppercase">SLOT ALPHA</span>
                {productA && (
                  <button 
                    onClick={handleClearA}
                    className="text-[10px] font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> RESET
                  </button>
                )}
              </div>

              {!productA ? (
                <div className="p-6 rounded-xl border border-dashed border-[#191830] bg-[#05050C]/30 hover:bg-[#0A0914] text-center space-y-4 transition-all flex flex-col items-center justify-center min-h-[180px]">
                  <span className="text-xs text-gray-500 font-mono">CHOOSE THE FIRST SPEC DEVICE</span>
                    <select 
                      onChange={(e) => {
                        const found = products.find(p => p.id === e.target.value);
                        if (found) setProductA(found);
                      }}
                      defaultValue=""
                      className="w-full max-w-xs bg-[#05050C] border border-[#191830] text-white text-xs rounded p-2.5 focus:border-cyber-cyan outline-none font-sans"
                    >
                      <option value="" disabled>-- Choose Device --</option>
                      {availableForA.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({formatPrice(p.price)})</option>
                      ))}
                    </select>
                </div>
              ) : (
                <div className="bg-[#05050C]/60 rounded-xl border border-[#191830] p-4 flex gap-4 transition-all">
                  <div className="w-24 h-24 bg-[#0A0914] border border-[#191830] p-2 flex items-center justify-center rounded-lg flex-shrink-0">
                    <img 
                      src={productA.images[0]} 
                      alt={productA.name} 
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-grow space-y-1">
                    <span className="text-[9px] font-mono bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                      {productA.category}
                    </span>
                    <h3 className="text-white text-sm font-bold tracking-wide leading-tight hover:text-cyber-cyan transition-colors">
                      {productA.name}
                    </h3>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-lg font-black text-cyber-cyan font-display">
                        {formatPrice(productA.price)}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        {formatPrice(productA.originalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Slot - Product B */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wide text-cyber-amber font-bold uppercase">SLOT BETA</span>
                {productB && (
                  <button 
                    onClick={handleClearB}
                    className="text-[10px] font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> RESET
                  </button>
                )}
              </div>

              {!productB ? (
                <div className="p-6 rounded-xl border border-dashed border-[#191830] bg-[#05050C]/30 hover:bg-[#0A0914] text-center space-y-4 transition-all flex flex-col items-center justify-center min-h-[180px]">
                  <span className="text-xs text-gray-500 font-mono">CHOOSE THE SECOND SPEC DEVICE</span>
                    <select 
                      onChange={(e) => {
                        const found = products.find(p => p.id === e.target.value);
                        if (found) setProductB(found);
                      }}
                      defaultValue=""
                      className="w-full max-w-xs bg-[#05050C] border border-[#191830] text-white text-xs rounded p-2.5 focus:border-cyber-cyan outline-none font-sans"
                    >
                      <option value="" disabled>-- Choose Device --</option>
                      {availableForB.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({formatPrice(p.price)})</option>
                      ))}
                    </select>
                </div>
              ) : (
                <div className="bg-[#05050C]/60 rounded-xl border border-[#191830] p-4 flex gap-4 transition-all">
                  <div className="w-24 h-24 bg-[#0A0914] border border-[#191830] p-2 flex items-center justify-center rounded-lg flex-shrink-0">
                    <img 
                      src={productB.images[0]} 
                      alt={productB.name} 
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-grow space-y-1">
                    <span className="text-[9px] font-mono bg-cyber-amber/10 text-cyber-amber border border-cyber-amber/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                      {productB.category}
                    </span>
                    <h3 className="text-white text-sm font-bold tracking-wide leading-tight hover:text-cyber-amber transition-colors">
                      {productB.name}
                    </h3>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-lg font-black text-cyber-cyan font-display">
                        {formatPrice(productB.price)}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        {formatPrice(productB.originalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Side by Side Specs Core Comparison Table */}
          {productA || productB ? (
            <div className="space-y-6">
              <div className="border border-[#191830] rounded-xl overflow-hidden bg-[#05050C]/40">
                <table className="w-full text-left font-sans text-xs text-gray-300">
                  <thead>
                    <tr className="bg-[#05050C] border-b border-[#191830] text-[#94A3B8] font-mono text-[10px] uppercase tracking-wider">
                      <th className="p-4 w-1/4">SPEC CRITERIA</th>
                      <th className="p-4 w-3/8 text-left">SLOT A VALUE</th>
                      <th className="p-4 w-3/8 text-left">SLOT B VALUE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#191830]/60">
                    {/* Category Compare */}
                    <tr>
                      <td className="p-4 font-mono font-bold text-[10px] uppercase text-gray-500">CATEGORY</td>
                      <td className="p-4 font-sans text-white text-xs">{productA?.category || <span className="text-gray-600 font-mono">UNSET</span>}</td>
                      <td className="p-4 font-sans text-white text-xs">{productB?.category || <span className="text-gray-600 font-mono">UNSET</span>}</td>
                    </tr>

                    {/* Pricing Compare */}
                    <tr>
                      <td className="p-4 font-mono font-bold text-[10px] uppercase text-gray-500">PRICING</td>
                      <td className="p-4">
                        {productA ? (
                          <div className="flex flex-col">
                            <span className="text-cyber-cyan font-bold text-sm">{formatPrice(productA.price)}</span>
                            <span className="text-[10px] text-gray-500 font-mono">Original: {formatPrice(productA.originalPrice)} ({Math.round(((productA.originalPrice - productA.price)/productA.originalPrice)*100)}% off)</span>
                          </div>
                        ) : (
                          <span className="text-gray-600 font-mono">UNSET</span>
                        )}
                      </td>
                      <td className="p-4">
                        {productB ? (
                          <div className="flex flex-col">
                            <span className="text-cyber-cyan font-bold text-sm">{formatPrice(productB.price)}</span>
                            <span className="text-[10px] text-gray-500 font-mono">Original: {formatPrice(productB.originalPrice)} ({Math.round(((productB.originalPrice - productB.price)/productB.originalPrice)*100)}% off)</span>
                          </div>
                        ) : (
                          <span className="text-gray-600 font-mono">UNSET</span>
                        )}
                      </td>
                    </tr>

                    {/* Interactive Ratings */}
                    <tr>
                      <td className="p-4 font-mono font-bold text-[10px] uppercase text-gray-500">USER SATISFACTION</td>
                      <td className="p-4">
                        {productA ? (
                          <div className="flex items-center gap-1.5">
                            <div className="flex text-cyber-amber">
                              <Star className="w-3.5 h-3.5 fill-current" />
                            </div>
                            <span className="font-bold text-white font-mono">{productA.rating}</span>
                            <span className="text-gray-500 text-[10px]">({productA.reviewsCount} reviews)</span>
                          </div>
                        ) : (
                          <span className="text-gray-600 font-mono">UNSET</span>
                        )}
                      </td>
                      <td className="p-4">
                        {productB ? (
                          <div className="flex items-center gap-1.5">
                            <div className="flex text-cyber-amber">
                              <Star className="w-3.5 h-3.5 fill-current" />
                            </div>
                            <span className="font-bold text-white font-mono">{productB.rating}</span>
                            <span className="text-gray-500 text-[10px]">({productB.reviewsCount} reviews)</span>
                          </div>
                        ) : (
                          <span className="text-gray-600 font-mono">UNSET</span>
                        )}
                      </td>
                    </tr>

                    {/* Stock status */}
                    <tr>
                      <td className="p-4 font-mono font-bold text-[10px] uppercase text-gray-500">STATION STOCK</td>
                      <td className="p-4">
                        {productA ? (
                          productA.inStock ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> IN STOCK
                            </span>
                          ) : (
                            <span className="font-mono text-[10px] text-rose-500">STATION DEPLEATED</span>
                          )
                        ) : (
                          <span className="text-gray-600 font-mono">UNSET</span>
                        )}
                      </td>
                      <td className="p-4">
                        {productB ? (
                          productB.inStock ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> IN STOCK
                            </span>
                          ) : (
                            <span className="font-mono text-[10px] text-rose-500">STATION DEPLEATED</span>
                          )
                        ) : (
                          <span className="text-gray-600 font-mono">UNSET</span>
                        )}
                      </td>
                    </tr>

                    {/* Color Chips compare */}
                    <tr>
                      <td className="p-4 font-mono font-bold text-[10px] uppercase text-gray-500">PRESETS AVAILABLE</td>
                      <td className="p-4">
                        {productA ? (
                          <div className="flex flex-wrap gap-2">
                            {productA.colors.map((c, i) => (
                              <div key={i} className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded border border-[#191830] text-[10px]">
                                <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                                <span className="text-gray-300 font-sans">{c.name}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-600 font-mono">UNSET</span>
                        )}
                      </td>
                      <td className="p-4">
                        {productB ? (
                          <div className="flex flex-wrap gap-2">
                            {productB.colors.map((c, i) => (
                              <div key={i} className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded border border-[#191830] text-[10px]">
                                <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                                <span className="text-gray-300 font-sans">{c.name}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-600 font-mono">UNSET</span>
                        )}
                      </td>
                    </tr>

                    {/* High level specifications */}
                    <tr>
                      <td className="p-4 font-mono font-bold text-[10px] uppercase text-gray-500">CORE INSTRUMENT SPECS</td>
                      <td className="p-4 align-top">
                        {productA ? (
                          <ul className="space-y-2 list-none p-0">
                            {productA.specs.map((s, idx) => (
                              <li key={idx} className="text-xs text-gray-300 leading-normal border-l-2 border-cyber-cyan pl-2.5">
                                {s}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-600 font-mono">UNSET</span>
                        )}
                      </td>
                      <td className="p-4 align-top">
                        {productB ? (
                          <ul className="space-y-2 list-none p-0">
                            {productB.specs.map((s, idx) => (
                              <li key={idx} className="text-xs text-gray-300 leading-normal border-l-2 border-cyber-amber pl-2.5">
                                {s}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-600 font-mono">UNSET</span>
                        )}
                      </td>
                    </tr>

                    {/* Integrated Features */}
                    <tr>
                      <td className="p-4 font-mono font-bold text-[10px] uppercase text-gray-500">PREMIUM SYSTEM FEATURES</td>
                      <td className="p-4 align-top">
                        {productA ? (
                          <ul className="space-y-1.5 list-none p-0">
                            {productA.features.map((f, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-xs text-gray-300 leading-tight">
                                <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-600 font-mono">UNSET</span>
                        )}
                      </td>
                      <td className="p-4 align-top">
                        {productB ? (
                          <ul className="space-y-1.5 list-none p-0">
                            {productB.features.map((f, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-xs text-gray-300 leading-tight">
                                <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-600 font-mono">UNSET</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action purchase boxes at the bottom of specs table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {productA && (
                    <button
                      onClick={() => onAddToCart(productA, productA.colors[0]?.name || 'Standard')}
                      className="w-full h-11 bg-cyber-cyan text-black font-display font-black tracking-widest text-[11px] flex items-center justify-center gap-2 uppercase rounded cursor-pointer duration-300 transition-all shadow-[0_4px_15px_rgba(0,245,255,0.2)]"
                    >
                      <ShoppingBag className="w-4 h-4" /> RECRUIT ALPHA TO CART
                    </button>
                  )}
                </div>

                <div>
                  {productB && (
                    <button
                      onClick={() => onAddToCart(productB, productB.colors[0]?.name || 'Standard')}
                      className="w-full h-11 bg-cyber-amber text-white font-display font-black tracking-widest text-[11px] flex items-center justify-center gap-2 uppercase rounded cursor-pointer duration-300 transition-all shadow-[0_4px_15px_rgba(255,0,127,0.2)]"
                    >
                      <ShoppingBag className="w-4 h-4" /> RECRUIT BETA TO CART
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full border border-[#191830] bg-[#05050C]/50 flex items-center justify-center mx-auto text-gray-500">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h4 className="text-white text-sm font-semibold">NO SPECIMEN SELECTED</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Please pick any two of MAINK's professional grade technical items above to start immediate side-by-side evaluation.
              </p>
            </div>
          )}
        </div>

        {/* Footer info lock */}
        <div className="px-6 py-4 bg-[#05050C] border-t border-[#191830] flex items-center justify-between text-[10px] text-gray-500 font-mono">
          <span>SECURE VALIDATOR COMPLETED v1.07</span>
          <span className="text-cyber-cyan uppercase font-bold tracking-widest">MAINK TECH LABS</span>
        </div>
      </div>
    </div>
  );
}
