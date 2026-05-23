import { useState } from 'react';
import { Shield, Sparkles, Truck, HeartHandshake, Play, HelpCircle, X, Cpu } from 'lucide-react';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  onSelectProduct: (product: Product) => void;
  heroProduct: Product;
}

export default function Hero({ onScrollToSection, onSelectProduct, heroProduct }: HeroProps) {
  const { formatPrice } = useCurrency();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const headline = "Power Your Setup.";

  const trustItems = [
    { icon: <Sparkles className="w-4 h-4 text-cyber-cyan" />, text: "30,000+ CUSTOMERS" },
    { icon: <Truck className="w-4 h-4 text-cyber-cyan" />, text: "FREE GLOBAL SHIPPING" },
    { icon: <Shield className="w-4 h-4 text-cyber-cyan" />, text: "2-YEAR WARRANTY" },
    { icon: <HeartHandshake className="w-4 h-4 text-cyber-cyan" />, text: "24/7 ELITE SUPPORT" }
  ];

  return (
    <section 
      id="hero"
      className="relative min-h-[100vh] bg-cyber-dark overflow-hidden flex flex-col justify-between pt-16"
    >
      {/* Perspective animated grid background */}
      <div className="perspective-grid">
        <div className="grid-lines"></div>
      </div>

      {/* Cybernetic ambient glow vectors */}
      <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-cyber-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-5%] w-[300px] h-[300px] bg-cyber-amber/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Hero Outer Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex items-center relative z-10 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Text Column (Col 7) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Scarcity / Trust Label Top */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-amber/10 border border-cyber-amber/30 rounded text-cyber-amber text-xs font-mono tracking-[0.2em] uppercase">
              <span className="w-2 h-2 bg-cyber-amber rounded-full animate-ping" />
              Next-Gen Peripherals Drop
            </div>

            {/* Title with letter-by-letter anim */}
            <h2 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-white uppercase select-none">
              {headline.split('').map((char, index) => (
                <span 
                  key={index} 
                  className="letter-anim"
                  style={{ 
                    animationDelay: `${index * 60}ms`,
                    display: char === ' ' ? 'inline' : 'inline-block',
                    marginRight: char === ' ' ? '0.25em' : '0'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>

            {/* Sub-headline */}
            <p className="text-gray-400 text-lg sm:text-xl font-sans tracking-wide max-w-xl leading-relaxed">
              Premium computer gadgets engineered for performance obsessives. Designed for latency rejection and absolute tactical feedback.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => onScrollToSection('products')}
                className="font-display text-sm font-bold tracking-widest bg-cyber-cyan text-black px-8 py-4 rounded hover:scale-[1.04] transition-all hover:shadow-[0_0_25px_rgba(0,245,255,0.6)] uppercase cursor-pointer"
              >
                Shop Now
              </button>

              <button 
                onClick={() => setIsVideoPlaying(true)}
                className="font-display text-sm font-bold tracking-widest border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black px-8 py-4 rounded transition-all uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" /> Watch Demo
              </button>
            </div>

            {/* Direct Tech Cred */}
            <div className="flex items-center gap-6 text-gray-500 font-mono text-xs pt-4 border-t border-[#1C1C1C] max-w-lg">
              <div>
                <span className="text-[#333]">LATENCY:</span> <span className="text-cyber-cyan font-bold">0.125ms</span>
              </div>
              <div className="w-1.5 h-1.5 bg-[#252525] rounded-full" />
              <div>
                <span className="text-[#333]">ENGINE:</span> <span className="text-white">COSMIC_90</span>
              </div>
              <div className="w-1.5 h-1.5 bg-[#252525] rounded-full" />
              <div>
                <span className="text-[#333]">CRAFT:</span> <span className="text-cyber-amber uppercase">CNC-MILLED</span>
              </div>
            </div>
          </div>

          {/* Right Hero Product Column (Col 5) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            <div 
              onClick={() => onSelectProduct(heroProduct)}
              className="relative w-full max-w-[400px] aspect-square rounded-xl bg-gradient-to-br from-[#121212]/90 to-[#080808]/90 border border-[#222] hover:border-cyber-cyan/50 transition-all p-6 cursor-pointer group/hero floating-asset relative"
            >
              {/* Noise texture for depth */}
              <div className="absolute inset-0 rounded-xl noise-overlay pointer-events-none" />

              {/* Scarcity pulsating dot */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#000]/80 px-2.5 py-1 rounded-full border border-cyber-amber/30">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-amber scarcity-pulse" />
                <span className="text-[10px] font-mono text-cyber-amber font-bold tracking-wider">LIMITED EDITION DROP</span>
              </div>

              {/* Specs Badge */}
              <div className="absolute bottom-4 right-4 text-[9px] font-mono text-gray-500 bg-black/50 px-2 py-0.5 rounded border border-white/5">
                FLAGSHIP: KEYBOARD // EX-90
              </div>

              {/* Central gadget placeholder mockup area */}
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 select-none">
                <div id="HERO_PRODUCT_IMAGE" className="relative w-56 h-56 rounded-full bg-gradient-to-tr from-[#1E1E1E]/40 to-[#0D0D0D]/60 flex items-center justify-center border-2 border-dashed border-[#222] group-hover/hero:border-cyber-cyan/30 transition-colors">
                  
                  {/* Cyber circle rotating indicators */}
                  <div className="absolute inset-2 rounded-full border border-cyber-cyan/10 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-6 rounded-full border border-dashed border-cyber-cyan/10 animate-[spin_15s_linear_infinite_reverse]" />

                  {/* Flagship product actual image (or premium fallback) */}
                  <img 
                    src={heroProduct.images[0]} 
                    alt={heroProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-48 h-48 object-contain rounded-xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] transform group-hover/hero:scale-105 group-hover/hero:rotate-2 transition-transform duration-500"
                  />
                </div>

                <div className="text-center group-hover/hero:text-cyber-cyan transition-colors">
                  <h3 className="font-display tracking-widest text-sm font-bold text-white uppercase">{heroProduct.name}</h3>
                  <div className="flex justify-center items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 line-through">{formatPrice(heroProduct.originalPrice)}</span>
                    <span className="text-sm text-cyber-cyan font-display font-medium">{formatPrice(heroProduct.price)}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Trust bar below fold line - Scrolling on mobile, desktop static grid */}
      <div className="w-full bg-cyber-darker border-t border-[#161616] py-6 relative z-10">
        
        {/* Mobile: Smooth horizontal marquee */}
        <div className="md:hidden marquee-row">
          <div className="marquee-stream">
            {trustItems.concat(trustItems).map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 px-8 text-xs font-mono font-bold tracking-widest text-gray-400">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-4 divide-x divide-[#1E1E1E] text-center">
            {trustItems.map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-3 text-xs font-mono font-bold tracking-[0.25em] text-gray-400">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Watch Demo Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/95 z-[10000] flex items-center justify-center p-4">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsVideoPlaying(false)} />
          <div className="bg-[#111] border border-[#222] rounded-xl w-full max-w-3xl aspect-video p-1 relative z-10 shadow-2xl overflow-hidden animate-[letterReveal_0.3s_ease-out]">
            <button 
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-3 right-3 bg-black/60 hover:bg-[#222] border border-white/10 rounded-full p-1.5 text-white z-20"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Embedded mockup video content (represented as a dynamic cyber render layout) */}
            <div className="w-full h-full bg-[#0A0A0A] rounded-lg flex flex-col justify-center items-center gap-4 relative">
              <div className="absolute top-3 left-4 text-[10px] font-mono text-cyber-cyan/60 tracking-widest">
                STREAM_ESTABLISHED // SECURE_LINE
              </div>
              
              {/* Fake animated play scanlines */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,245,255,0.06))] pointer-events-none animate-pulse" />
              
              <div className="relative w-24 h-24 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-cyber-cyan/20 animate-ping" />
                <span className="absolute inset-3 rounded-full border border-cyber-amber/20 animate-pulse" />
                <Cpu className="w-10 h-10 text-cyber-cyan" />
              </div>

              <div className="text-center space-y-2 px-6">
                <h4 className="font-display font-bold text-lg tracking-wider text-white">MAINK PERFORMANCE DISCLOSURE</h4>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  A comprehensive overview highlighting the 0.01mm aerospace CNC framing details, custom linear switch acoustics, and real-time latency tests proving 0.125ms limits.
                </p>
              </div>

              <button 
                onClick={() => {
                  alert("Maink Tech demo video starts streaming... (In production, this launches the YouTube/Vimeo embed element)");
                  setIsVideoPlaying(false);
                }}
                className="font-bebas tracking-widest text-sm bg-cyber-cyan text-black px-6 py-2.5 rounded hover:scale-105 transition-all mt-2"
              >
                LAUNCH SIMULATOR RUN
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
