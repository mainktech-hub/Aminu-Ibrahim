import { useState, useEffect, useRef, TouchEvent } from 'react';
import { ShieldCheck, Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [stats, setStats] = useState({ average: 0, reviews: 0, recommend: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const statsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Auto scroll carousel every 4s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  // Swipe handlers for mobile touch support
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - endX;
    if (diff > 50) {
      // Swipe Left -> Next
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    } else if (diff < -50) {
      // Swipe Right -> Prev
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  // Stats Intersection Countup Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let startAverage = 0;
          let startReviews = 2000;
          let startRecommend = 0;
          
          const duration = 1500; // 1.5s animation
          const steps = 60;
          const stepTime = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const t = step / steps;
            
            // Easing out quadratic
            const easeOut = 1 - (1 - t) * (1 - t);

            setStats({
              average: parseFloat((4.9 * easeOut).toFixed(1)),
              reviews: Math.floor(startReviews + (2847 - startReviews) * easeOut),
              recommend: Math.floor(98 * easeOut)
            });

            if (step >= steps) {
              setStats({ average: 4.9, reviews: 2847, recommend: 98 });
              clearInterval(timer);
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section 
      id="testimonials" 
      className="bg-[#111111] py-24 border-t border-[#1E1E1E] relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-[0.2em] text-cyber-cyan uppercase block mb-3">
            VERIFIED CRITIQUES // PILOT FEEDBACK
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-wider text-white uppercase">
            WHAT THE COMMUNITY SAYS
          </h2>
          <div className="w-16 h-[2px] bg-cyber-amber mx-auto mt-4" />
        </div>

        {/* Carousel Viewport Container */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main active reviews card box */}
          <div 
            className="bg-[#161616] border border-[#252525] rounded-2xl p-8 sm:p-12 shadow-2xl relative min-h-[280px] flex flex-col justify-between transition-all duration-300"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute top-4 right-6 text-cyber-cyan/10 pointer-events-none">
              <Quote className="w-24 h-24 fill-current rotate-180" />
            </div>

            {/* Quote details */}
            <div className="space-y-6 relative z-10">
              {/* Star line */}
              <div className="flex text-cyber-amber">
                {[...Array(testimonials[activeIndex].rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Quote text - Italic DM Sans, max 2 lines, truncated with "..." */}
              <p className="italic text-gray-300 text-lg sm:text-xl font-sans leading-relaxed line-clamp-2">
                "{testimonials[activeIndex].quote}"
              </p>
            </div>

            {/* Author details with verified labels */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-[#252525]">
              <div className="flex items-center gap-4">
                {/* Visual Avatar frame with custom fallback labels */}
                <div className="w-12 h-12 rounded-full border border-cyber-cyan bg-[#1E1E1E] p-[2px] flex-shrink-0 relative overflow-hidden">
                  <span className="absolute inset-0 bg-cyber-dark text-[9px] font-mono flex items-center justify-center text-cyber-cyan font-bold uppercase select-none">
                    AVATAR_{activeIndex + 1}
                  </span>
                  <img 
                    src={testimonials[activeIndex].avatar} 
                    alt={testimonials[activeIndex].name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full relative z-10"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-wide uppercase">
                      {testimonials[activeIndex].name}
                    </h3>
                    <span className="inline-flex text-cyber-cyan" title="Verified Gadget Operator">
                      <ShieldCheck className="w-4 h-4 fill-[#000]" />
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                    DEPLOYED CUSTOMER
                  </p>
                </div>
              </div>

              {/* Purchased Badge pill */}
              <div>
                <span className="px-3 py-1 bg-cyber-amber/10 border border-cyber-amber/35 text-cyber-amber text-xs font-bebas font-black tracking-widest rounded-full uppercase">
                  {testimonials[activeIndex].productTag}
                </span>
              </div>
            </div>

          </div>

          {/* Carousel Manual Arrows navigation buttons */}
          <button 
            onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous Review"
            className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111] hover:bg-cyber-cyan border border-[#252525] hover:border-black text-gray-400 hover:text-black flex items-center justify-center transition-all shadow-md cursor-pointer z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
            aria-label="Next Review"
            className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111] hover:bg-cyber-cyan border border-[#252525] hover:border-black text-gray-400 hover:text-black flex items-center justify-center transition-all shadow-md cursor-pointer z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Swiper Dot indicator pills below fold */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, dotIdx) => (
              <button 
                key={dotIdx}
                onClick={() => setActiveIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === dotIdx ? 'w-8 bg-cyber-cyan' : 'w-2.5 bg-[#252525] hover:bg-gray-600'
                }`}
              />
            ))}
          </div>

        </div>

        {/* Aggregate statistics bar with automatic scroll triggers */}
        <div 
          ref={statsRef}
          className="max-w-4xl mx-auto mt-20 pt-10 border-t border-[#222] grid grid-cols-3 gap-6 text-center"
        >
          <div>
            <span className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-cyber-cyan tracking-wider">
              {stats.average.toFixed(1)} <span className="text-xs text-gray-600">/ 5.0</span>
            </span>
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gray-500 uppercase block mt-2">
              SETUP RATINGS
            </span>
          </div>

          <div>
            <span className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-cyber-cyan tracking-wider">
              {stats.reviews.toLocaleString()}
            </span>
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gray-500 uppercase block mt-2">
              VERIFIED REVIEWS
            </span>
          </div>

          <div>
            <span className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-cyber-cyan tracking-wider">
              {stats.recommend}%
            </span>
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gray-500 uppercase block mt-2">
              OPERATORS RECOMMEND
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
