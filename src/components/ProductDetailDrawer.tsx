import { useState, useEffect, useRef, MouseEvent } from 'react';
import { Star, Shield, ArrowRight, X, Heart, MessageSquare, ListCheck, Sparkles, Truck, RefreshCw, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface ProductDetailDrawerProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: string, quantity: number) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function ProductDetailDrawer({
  product,
  onClose,
  onAddToCart,
  onScrollToSection
}: ProductDetailDrawerProps) {
  if (!product) return null;

  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'features'>('desc');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedColorHex, setSelectedColorHex] = useState(product.colors[0]?.hex || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center center' });
  const [showStickyBar, setShowStickyBar] = useState(false);

  const purchasePanelRef = useRef<HTMLDivElement>(null);

  // Reset states when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedColorHex(product.colors[0]?.hex || '');
      setQuantity(1);
      setActiveImageIndex(0);
      setActiveTab('desc');
    }
  }, [product]);

  // Handle Scroll to toggle Sticky Bottom Bar using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If purchase panel is out of view, show sticky anchor bar
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const target = purchasePanelRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [product]);

  // Image Zoom on Hover Handler
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%` });
  };

  const handleRatingClick = () => {
    onClose();
    setTimeout(() => {
      onScrollToSection('testimonials');
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-[999] overflow-hidden flex justify-end">
      
      {/* Dark Overlay behind Drawer */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main PDP Sliding Panel */}
      <div className="relative w-full max-w-5xl h-full bg-[#0E0E0E] border-l border-[#1E1E1E] shadow-2xl overflow-y-auto flex flex-col justify-between animate-[letterReveal_0.35s_cubic-bezier(0.16,1,0.3,1)] z-10 scrollbar-thin">
        
        {/* Top Sticky Header */}
        <div className="sticky top-0 bg-[#0E0E0E]/90 backdrop-blur-sm z-50 px-6 py-4 border-b border-[#1E1E1E] flex items-center justify-between">
          <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">
            HOME &gt; Catalog &gt; <span className="text-cyber-cyan">{product.category}</span>
          </span>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-cyber-cyan bg-[#141414] hover:bg-[#1E1E1E] border border-[#222] rounded-full transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Product Body */}
        <div className="px-6 py-8 md:p-10 space-y-12">
          
          {/* Two-Column Core Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            
            {/* Left Image Gallery */}
            <div className="space-y-4">
              
              {/* Highlight main image frame with zoom helper */}
              <div 
                id="PDP_MAIN_IMG"
                className="relative aspect-square rounded-xl bg-gradient-to-tr from-[#141414] to-[#0A0A0A] border border-[#1E1E1E] p-6 flex items-center justify-center overflow-hidden cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <div className="absolute inset-4 border border-dashed border-[#1E1E1E] opacity-20 pointer-events-none" />
                <div className="absolute top-3 right-3 text-[9px] font-mono text-gray-500 uppercase">
                  HOVER TO ZOOM IN (1.8X)
                </div>

                {/* Noise overlays */}
                <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.05]" />

                <img 
                  src={product.images[activeImageIndex]} 
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  style={isZoomed ? { transform: 'scale(1.8)', ...zoomStyle } : {}}
                  className="max-h-80 max-w-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] transition-transform duration-300 ease-out"
                />
              </div>

              {/* 4 Thumbnails Gallery underneath */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((imgUrl, thumbIdx) => (
                  <button
                    key={thumbIdx}
                    onClick={() => setActiveImageIndex(thumbIdx)}
                    className={`aspect-square rounded border p-2 flex items-center justify-center bg-[#111] hover:border-cyber-cyan transition-all cursor-pointer ${
                      activeImageIndex === thumbIdx ? 'border-cyber-cyan ring-1 ring-cyber-cyan' : 'border-[#1E1E1E]'
                    }`}
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Thumbnail ${thumbIdx + 1}`}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain filter drop-shadow-md"
                    />
                  </button>
                ))}
              </div>

            </div>

            {/* Right Purchase Panel */}
            <div ref={purchasePanelRef} className="space-y-6 lg:pl-4">
              
              {/* Limited Stock Scarcity alert */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyber-amber/15 border border-cyber-amber/35 rounded text-cyber-amber text-xs font-mono font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyber-amber scarcity-pulse" />
                LIMITED SUPPLY Drop: Max 2 units
              </div>

              {/* Product title name */}
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-wide uppercase leading-tight">
                {product.name}
              </h2>

              {/* Reviews score heading trigger */}
              <div className="flex items-center gap-2">
                <div className="flex text-cyber-amber">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-cyber-amber" />
                  ))}
                </div>
                <button 
                  onClick={handleRatingClick}
                  className="text-xs font-mono font-bold text-gray-400 hover:text-cyber-cyan underline uppercase tracking-tight"
                >
                  ({product.reviewsCount} REVIEWS)
                </button>
              </div>

              <hr className="border-[#1E1E1E]" />

              {/* Description body context */}
              <p className="text-gray-400 font-sans text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Pricing section with compare original */}
              <div className="flex items-end gap-3 pt-2">
                <span className="text-4xl font-display font-black text-cyber-cyan leading-none">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-gray-500 line-through leading-none pb-1">
                  Compare: {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-mono font-bold text-green-500 bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded ml-2">
                  SAVE {formatPrice(product.originalPrice - product.price)}
                </span>
              </div>

              {/* Color variant Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase block">
                  CHOOSE HARDWARE SKIN: <span className="text-white ml-1">{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {product.colors.map((col, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedColor(col.name);
                        setSelectedColorHex(col.hex);
                      }}
                      className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 relative cursor-pointer ${
                        selectedColor === col.name ? 'border-cyber-cyan scale-110' : 'border-[#333]'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {selectedColor === col.name && (
                        <span className="absolute inset-0.5 rounded-full border border-black/50 pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector Stepper */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase block">
                  SELECT BUNDLE QUANTITY:
                </label>
                <div className="inline-flex items-center bg-[#111] border border-[#222] rounded">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-mono font-bold text-white text-sm select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => quantity < 2 && setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-gray-500 font-mono italic block mt-1">
                  * Limit 2 units per elite deployment protocol.
                </span>
              </div>

              {/* Large glowing ADD TO CART CTA */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => onAddToCart(product, selectedColor, quantity)}
                  className="w-full font-display text-sm font-black tracking-widest bg-cyber-cyan text-black py-4 rounded hover:scale-[1.02] shadow-md hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all uppercase cursor-pointer"
                >
                  ADD TO BUNDLE COMMAND STATION
                </button>

                {/* Buy now direct CTA */}
                <button
                  onClick={() => {
                    onAddToCart(product, selectedColor, quantity);
                    alert("Proceeding directly to cyber checkout portal secure pathways...");
                  }}
                  className="w-full font-display text-sm font-bold tracking-widest border border-white hover:border-cyber-cyan text-white hover:text-black hover:bg-cyber-cyan py-4 rounded transition-all uppercase cursor-pointer"
                >
                  BUY NOW SECURE
                </button>
              </div>

              {/* Below CTA Trust indicators */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#1C1C1C] text-center text-[10px] font-mono font-bold text-gray-500 uppercase">
                <div className="flex items-center justify-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-cyber-cyan" /> Free Shipping
                </div>
                <div className="flex items-center justify-center gap-1 border-x border-[#1C1C1C]">
                  <RefreshCw className="w-3.5 h-3.5 text-cyber-cyan" /> 30-Day returns
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-cyber-cyan" /> 2yr warranty
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Tabs fold layout: Description vs Specs vs Features */}
          <div className="border-t border-[#1C1C1C] pt-8">
            
            {/* Tab Heads */}
            <div className="flex border-b border-[#1C1C1C] gap-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-3 text-xs font-mono font-bold tracking-widest uppercase transition-all relative cursor-pointer ${
                  activeTab === 'desc' ? 'text-cyber-cyan' : 'text-gray-500 hover:text-white'
                }`}
              >
                DEPLOYMENT REVIEW
                {activeTab === 'desc' && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyber-cyan" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-xs font-mono font-bold tracking-widest uppercase transition-all relative cursor-pointer ${
                  activeTab === 'specs' ? 'text-cyber-cyan' : 'text-gray-500 hover:text-white'
                }`}
              >
                TECHNICAL BLUEPRINTS
                {activeTab === 'specs' && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyber-cyan" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('features')}
                className={`pb-3 text-xs font-mono font-bold tracking-widest uppercase transition-all relative cursor-pointer ${
                  activeTab === 'features' ? 'text-cyber-cyan' : 'text-gray-500 hover:text-white'
                }`}
              >
                SPECIAL FEATURES
                {activeTab === 'features' && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyber-cyan" />
                )}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-6 min-h-[160px]">
              
              {activeTab === 'desc' && (
                <div className="space-y-4 text-sm text-gray-400 font-sans leading-relaxed">
                  <p>
                    Each aspect of the <strong className="text-white">{product.name}</strong> is designed to perform at the limits of modern e-sports. Engineered with deep carbon frame elements, high tension stabilizer arrays, and micro-aligned internal shielding vectors.
                  </p>
                  <p>
                    Whether you are developing core database modules in Katsina or climbing ranking brackets in competitive matches, this peripheral grants instant physical responses with 0.125ms limits, eliminating structural input lag permanently.
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <ul className="space-y-2 font-mono text-xs text-gray-400">
                  {product.specs.map((sec, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-cyber-cyan font-bold mt-0.5">//</span>
                      <span>{sec}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'features' && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-sm text-gray-400">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 p-3 bg-[#111] rounded border border-[#1E1E1E]">
                      <Sparkles className="w-4 h-4 text-cyber-cyan flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}

            </div>

          </div>

        </div>

        {/* Footer info line inside drawer */}
        <div className="bg-[#090909] py-8 px-6 border-t border-[#1C1C1C] text-center text-xs text-gray-600 font-mono tracking-widest uppercase">
          MAINK LAB INSTRUMENT // REF: {product.id.toUpperCase()}-2026
        </div>

      </div>

      {/* Sticky Bottom Purchase bar (triggers past initial fold) */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-[#0B0B0B]/95 backdrop-blur-md border-t border-cyber-cyan/30 py-4 px-6 flex items-center justify-between z-[1000] shadow-2xl transition-all duration-300 transform ${
          showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-[#161616] p-1 border border-[#222] hidden sm:flex items-center justify-center">
              <img src={product.images[0]} alt={product.name} className="max-h-full object-contain filter" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h4 className="font-display text-xs font-bold text-white tracking-widest uppercase leading-none">{product.name}</h4>
              <p className="text-[10px] font-mono text-cyber-cyan mt-1 lowercase font-bold">{selectedColor} skin</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-display font-black text-cyber-cyan text-lg sm:text-2xl">{formatPrice(product.price)}</span>
            <button
              onClick={() => onAddToCart(product, selectedColor, quantity)}
              className="font-display text-xs font-bold tracking-widest bg-cyber-cyan text-black px-6 py-3 rounded hover:scale-105 active:scale-95 transition-all uppercase flex items-center gap-1 cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> ADD TO COMMAND
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
