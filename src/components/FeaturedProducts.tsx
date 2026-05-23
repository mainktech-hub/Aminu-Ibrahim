import { useState, useEffect, useRef } from 'react';
import { Star, Eye, ShoppingBag, ArrowLeftRight } from 'lucide-react';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface FeaturedProductsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, colorName: string) => void;
  onCompareProduct: (product: Product) => void;
}

export default function FeaturedProducts({ 
  products, 
  onSelectProduct, 
  onAddToCart,
  onCompareProduct
}: FeaturedProductsProps) {
  const { formatPrice } = useCurrency();
  const [animateUnderline, setAnimateUnderline] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'GADGETS' | 'COMPUTERS'>('ALL');
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateUnderline(true);
        }
      },
      { threshold: 0.2 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'ALL') return true;
    return product.category === selectedCategory;
  });

  return (
    <section 
      id="products" 
      className="bg-[#0A0A0A] py-24 border-t border-[#121212] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Animated Underline */}
        <div ref={headingRef} className="text-center mb-16 relative">
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-widest text-white uppercase">
            GEAR UP
          </h2>
          <p className="text-xs font-mono tracking-[0.3em] text-cyber-cyan mt-3 uppercase">
            Elite Peripherals & Performance Instruments
          </p>
          <div className="flex justify-center mt-4">
            <div 
              className="h-[2px] bg-cyber-cyan transition-all duration-1000 ease-out"
              style={{ width: animateUnderline ? '140px' : '0px' }}
            />
          </div>
        </div>

        {/* Interactive Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {(['ALL', 'GADGETS', 'COMPUTERS'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded text-[10px] font-mono tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyber-cyan border-cyber-cyan text-black font-extrabold shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                  : 'bg-transparent border-[#1E1E1E] text-gray-400 hover:text-white hover:border-cyber-cyan/40'
              }`}
            >
              {cat === 'ALL' ? 'ALL PRODUCTS' : cat === 'GADGETS' ? 'BUDGET GADGETS (≤ $10)' : 'MODEL COMPUTERS ($100 - $500)'}
            </button>
          ))}
        </div>

        {/* 6-Card Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => {
            const displayColor = product.colors[0]?.name || 'Default';
            
            return (
              <div 
                key={product.id}
                className="product-card group/product bg-[#111] border border-[#1E1E1E] hover:border-cyber-cyan rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative"
              >
                {/* Noise Texture Panel */}
                <div className="absolute inset-0 noise-overlay pointer-events-none opacity-50" />

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                  <span className="bg-cyber-amber px-2.5 py-1 text-[10px] font-bebas tracking-[0.14em] text-black font-black rounded">
                    {product.category}
                  </span>
                  
                  {product.pulseBadge && (
                    <span className="bg-black/85 border border-[#222] text-[9px] font-mono tracking-wider font-semibold text-cyber-amber px-2 py-0.5 rounded flex items-center gap-1.5 leading-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-amber animate-ping" />
                      {product.pulseBadge}
                    </span>
                  )}
                </div>

                {/* Quick Action Overlay (View Specs Icon) */}
                <div className="absolute top-3 right-3 opacity-0 group-hover/product:opacity-100 transition-opacity duration-350 z-10 flex gap-2">
                  <button 
                    onClick={() => onCompareProduct(product)}
                    className="p-2 bg-black/80 hover:bg-cyber-cyan text-white hover:text-black rounded border border-white/10 hover:border-black transition-all cursor-pointer shadow-lg"
                    title="Compare Side-by-Side Specs"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onSelectProduct(product)}
                    className="p-2 bg-black/80 hover:bg-cyber-cyan text-white hover:text-black rounded border border-white/10 hover:border-black transition-all cursor-pointer shadow-lg"
                    title="Quick Specs Detail"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Image Stage */}
                <div className="aspect-[4/3] bg-gradient-to-b from-[#141414] to-[#101010] p-6 relative flex items-center justify-center overflow-hidden border-b border-[#1E1E1E]/40">
                  {/* Backdrop grid markings inside */}
                  <div className="absolute inset-4 border border-dashed border-[#1E1E1E] opacity-20 pointer-events-none" />
                  
                  <div 
                    id={`PRODUCT_IMG_${idx + 1}`} 
                    className="relative w-full h-full flex items-center justify-center cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="max-h-36 max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] group-hover/product:scale-110 group-hover/product:-rotate-1 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>

                {/* Product Meta Section */}
                <div className="p-6 space-y-3 relative z-10 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Star Rating Row */}
                    <div className="flex items-center gap-1">
                      <div className="flex text-cyber-amber">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-current' : 'text-gray-600'}`} />
                        ))}
                      </div>
                      <span className="text-[11px] font-mono text-gray-500 font-bold ml-1">
                        4.8 ({product.reviewsCount} REVIEWS)
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 
                      onClick={() => onSelectProduct(product)}
                      className="font-sans font-bold text-lg text-white mt-1.5 tracking-wide leading-snug cursor-pointer hover:text-cyber-cyan transition-colors"
                    >
                      {product.name}
                    </h3>

                    {/* Brief Features line */}
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-snug">
                      {product.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-600 block leading-none font-mono tracking-widest uppercase">DISPATCH PRICE</span>
                      <span className="text-2xl font-display font-black text-cyber-cyan mt-1 block">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 line-through font-mono block">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-[10px] text-green-500 font-mono font-bold leading-none block">
                        SAVE {formatPrice(product.originalPrice - product.price)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* FULL-WIDTH CTA REVEAL ON HOVER (Slides up) */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden h-14 z-20 pointer-events-none group-hover/product:pointer-events-auto">
                  <button 
                    onClick={() => onAddToCart(product, displayColor)}
                    className="product-card-btn w-full h-full bg-cyber-cyan text-black font-display font-black tracking-widest text-xs flex items-center justify-center gap-2 uppercase select-none transition-transform cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" /> ADD TO COMMAND STATION
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* View All Products Trigger */}
        <div className="text-center mt-16">
          <button 
            onClick={() => {
              alert("Loading full interactive archive for MAINK TECH products database Catalog...");
            }}
            className="font-display text-xs font-bold tracking-widest border border-cyber-cyan/40 hover:border-cyber-cyan text-white hover:text-black hover:bg-cyber-cyan px-8 py-4 rounded transition-all uppercase cursor-pointer"
          >
            VIEW ALL PRODUCTS
          </button>
        </div>

      </div>
    </section>
  );
}
