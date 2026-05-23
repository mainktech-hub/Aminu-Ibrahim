import { useEffect, useState, useRef } from 'react';
import { Cpu, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

interface WhyMainkProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function WhyMaink({ onScrollToSection }: WhyMainkProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Cpu className="w-12 h-12 text-cyber-cyan" />,
      title: "Precision Engineered",
      description: "Built to 0.01mm aerospace tolerances. Extreme rigidity meets professional grade components. No compromises."
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-cyber-cyan" />,
      title: "2-Year Full Warranty",
      description: "Every flagship mouse, keyboard, and accessory is fully backed by our no-questions hardware guarantee."
    },
    {
      icon: <Truck className="w-12 h-12 text-cyber-cyan" />,
      title: "Same-Day Dispatch",
      description: "Order catalog devices before 2:00 PM and they ship out from Katsina Hub today. Fully tracked worldwide."
    }
  ];

  return (
    <section 
      id="why-maink" 
      className="bg-cyber-dark py-24 relative overflow-hidden"
    >
      {/* Clip-path diagonal amber strike element */}
      <div className="absolute inset-0 diagonal-amber-strike z-0" />

      {/* Futuristic technical layout markings */}
      <div className="absolute top-10 left-10 text-gray-800 font-mono text-[9px] tracking-widest hidden lg:block">
        SPEC_REF: MAINK_QUALITY_STABILITY_PROTOCOL
      </div>
      <div className="absolute bottom-10 right-10 text-gray-800 font-mono text-[9px] tracking-widest hidden lg:block">
        VER: 2026.04 // HEAVY_DUTY_CALIBRATIONS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <span className="px-3 py-1 bg-cyber-cyan/15 border border-cyber-cyan/35 text-cyber-cyan text-xs font-mono tracking-widest uppercase rounded">
            THE MAINK TECH STANDARDS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase mt-4 tracking-wider leading-none">
            WHY MAINK TECH?
          </h2>
          <div className="w-16 h-[2px] bg-cyber-amber mx-auto mt-4" />
        </div>

        {/* 3-Column Layout with staggered animation on visible */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {features.map((feat, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center text-center p-8 bg-[#111111]/80 rounded-xl border border-[#222] hover:border-cyber-cyan/40 transition-all duration-500 ease-out transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-12 scale-95'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#161616] to-[#0A0A0A] border border-[#292929] flex items-center justify-center p-4 hover:shadow-[0_0_20px_rgba(0,245,255,0.15)] hover:border-cyber-cyan transition-all duration-300">
                {feat.icon}
              </div>
              
              <h3 className="font-display font-bold text-xl text-white mt-6 uppercase tracking-wider">
                {feat.title}
              </h3>
              
              <div className="w-10 h-[10px] border-b border-[#292929] my-3" />
              
              <p className="text-gray-400 text-sm font-sans leading-relaxed tracking-wide">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Big Section CTA Below */}
        <div className="mt-20 pt-16 border-t border-[#1E1E1E]/40 text-center">
          <div className="max-w-xl mx-auto space-y-6">
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-wider leading-tight">
              BUILT DIFFERENT. <span className="text-cyber-cyan">SHOP MAINK TECH.</span>
            </h3>
            <p className="text-xs font-mono text-gray-500 tracking-widest uppercase leading-snug">
              Invest in precision control instruments engineered for elite software and hardware operators.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onScrollToSection('products')}
                className="font-display text-xs font-bold tracking-widest bg-white hover:bg-cyber-cyan text-black px-8 py-4 rounded hover:scale-105 active:scale-95 transition-all uppercase inline-flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(0,245,255,0.35)]"
              >
                EXPLORE ALL MODELS <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
