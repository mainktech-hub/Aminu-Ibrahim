import { useState, FormEvent } from 'react';
import { Twitter, Instagram, Youtube, Compass, ArrowRight, ChevronDown, Check, Send } from 'lucide-react';
import { Product } from '../types';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
}

export default function Footer({ onScrollToSection, onSelectProduct, allProducts }: FooterProps) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const toggleAccordion = (column: string) => {
    if (activeAccordion === column) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(column);
    }
  };

  const handleSub = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const handleProdClick = (prodId: string) => {
    const prod = allProducts.find(p => p.id === prodId);
    if (prod) onSelectProduct(prod);
  };

  return (
    <footer id="footer" className="bg-[#080808] border-t border-[#1A1A1A] text-white pt-16 pb-8 relative z-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Map Coordinate Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-[#1A1A1A]">
          
          {/* Col 1: Brand Info & Micro Email */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h2 className="font-display tracking-widest text-2xl font-black text-cyber-cyan uppercase">
                MAINK <span className="text-white">TECH</span>
              </h2>
              <p className="text-gray-500 font-sans text-xs mt-2 leading-relaxed">
                Premium computer peripherals and custom tactical instruments engineered for performance obsessives.
              </p>
            </div>

            {/* Newsletter Micro-Form inside Col 1 */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold tracking-widest text-cyber-amber uppercase">
                SECRET DROP TELEMETRY
              </h4>
              {!newsletterSubscribed ? (
                <form onSubmit={handleSub} className="flex max-w-sm border border-[#222] rounded overflow-hidden focus-within:border-cyber-cyan">
                  <input 
                    type="email" 
                    placeholder="Enter email to track"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-[#111] px-3 py-2 text-xs text-white focus:outline-none placeholder-gray-600 font-sans"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-cyber-cyan text-black px-3 hover:bg-cyber-amber transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan">
                  <Check className="w-4 h-4" /> SUBSCRIBED / FREQUENCY SYNCED
                </div>
              )}
            </div>

            {/* Social SVGs */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">
                VIRTUAL STATIONS
              </h4>
              <div className="flex items-center space-x-3 text-gray-400">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#111] rounded border border-[#1C1C1C] hover:text-cyber-cyan hover:border-cyber-cyan transition-all" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#111] rounded border border-[#1C1C1C] hover:text-cyber-cyan hover:border-cyber-cyan transition-all" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#111] rounded border border-[#1C1C1C] hover:text-cyber-cyan hover:border-cyber-cyan transition-all" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="https://wa.me/2348064394479" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#111] rounded border border-[#1C1C1C] hover:text-cyber-cyan hover:border-cyber-cyan transition-all" aria-label="WhatsApp">
                  <Compass className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2, 3, 4: Shop, Support, Company links */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Col 2: Shop Links */}
            <div>
              {/* Accordion header for mobile, plain for desktop */}
              <div 
                className="flex items-center justify-between border-b md:border-none border-[#222] py-3 md:py-0 cursor-pointer md:cursor-default"
                onClick={() => toggleAccordion('shop')}
              >
                <h3 className="font-display font-medium text-sm tracking-widest text-[#FFF] uppercase">
                  SHOP GEAR
                </h3>
                <ChevronDown className={`w-4 h-4 text-gray-500 md:hidden transition-transform duration-300 ${activeAccordion === 'shop' ? 'rotate-180' : ''}`} />
              </div>

              <ul className={`space-y-2 text-xs font-sans text-gray-400 mt-4 md:block ${activeAccordion === 'shop' ? 'block' : 'hidden'}`}>
                <li><button onClick={() => onScrollToSection('products')} className="hover:text-cyber-cyan cursor-pointer transition-colors text-left uppercase">All Products</button></li>
                <li><button onClick={() => handleProdClick('apex-90')} className="hover:text-cyber-cyan cursor-pointer transition-colors text-left uppercase">Keyboards</button></li>
                <li><button onClick={() => handleProdClick('tron-x')} className="hover:text-cyber-cyan cursor-pointer transition-colors text-left uppercase">Mice</button></li>
                <li><button onClick={() => handleProdClick('kronos-mat')} className="hover:text-cyber-cyan cursor-pointer transition-colors text-left uppercase">Desk Mats</button></li>
                <li><button onClick={() => handleProdClick('cyclone-fan')} className="hover:text-cyber-cyan cursor-pointer transition-colors text-left uppercase">Smart Accessories</button></li>
                <li><button onClick={() => onScrollToSection('products')} className="hover:text-cyber-cyan cursor-pointer transition-colors text-left uppercase">New Drops</button></li>
              </ul>
            </div>

            {/* Col 3: Support Links */}
            <div>
              <div 
                className="flex items-center justify-between border-b md:border-none border-[#222] py-3 md:py-0 cursor-pointer md:cursor-default"
                onClick={() => toggleAccordion('support')}
              >
                <h3 className="font-display font-medium text-sm tracking-widest text-[#FFF] uppercase">
                  OPERATOR HELP
                </h3>
                <ChevronDown className={`w-4 h-4 text-gray-500 md:hidden transition-transform duration-300 ${activeAccordion === 'support' ? 'rotate-180' : ''}`} />
              </div>

              <ul className={`space-y-2 text-xs font-sans text-gray-400 mt-4 md:block ${activeAccordion === 'support' ? 'block' : 'hidden'}`}>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); alert("FAQ Guide loaded: 30-day trial window, USB configurations, globally tracked ports."); }} className="hover:text-cyber-cyan transition-colors uppercase">Support FAQs</a></li>
                <li><button onClick={() => alert("Free priority shipping is automatically bundled on orders exceeding $75 standard threshold.")} className="hover:text-cyber-cyan cursor-pointer transition-colors text-left uppercase">Shipping Blueprints</button></li>
                <li><button onClick={() => alert("Reach aminuibrahimknk37@gmail.com for instant prepaid return shipping vouchers.")} className="hover:text-cyber-cyan cursor-pointer transition-colors text-left uppercase">Easy Returns</button></li>
                <li><button onClick={() => alert("Status Tracking available directly via support phone: 08064394479.")} className="hover:text-cyber-cyan cursor-pointer transition-colors text-left uppercase">Track Order</button></li>
                <li><a href="mailto:aminuibrahimknk37@gmail.com" className="hover:text-cyber-cyan transition-colors uppercase">Contact Us</a></li>
              </ul>
            </div>

            {/* Col 4: Corporate details / Contact address (as requested!) */}
            <div>
              <div 
                className="flex items-center justify-between border-b md:border-none border-[#222] py-3 md:py-0 cursor-pointer md:cursor-default"
                onClick={() => toggleAccordion('company')}
              >
                <h3 className="font-display font-medium text-sm tracking-widest text-[#FFF] uppercase">
                  MAINK HERITAGE
                </h3>
                <ChevronDown className={`w-4 h-4 text-gray-500 md:hidden transition-transform duration-300 ${activeAccordion === 'company' ? 'rotate-180' : ''}`} />
              </div>

              <div className={`space-y-4 text-xs font-sans text-gray-400 mt-4 md:block ${activeAccordion === 'company' ? 'block' : 'hidden'}`}>
                <div className="space-y-1">
                  <p className="font-bold text-gray-300 uppercase font-mono">LAB ADDRESS:</p>
                  <p className="leading-relaxed">Kanti Kankia, Katsina State, Nigeria.</p>
                </div>
                
                <div className="space-y-1">
                  <p className="font-bold text-gray-300 uppercase font-mono">CONTACT HOOKS:</p>
                  <p className="leading-none">Phone: <a href="tel:08064394479" className="text-white hover:text-cyber-cyan">08064394479</a></p>
                  <p className="leading-none mt-1">Chat: <a href="https://wa.me/2348064394479" target="_blank" rel="noopener noreferrer" className="text-cyber-amber hover:underline">WhatsApp Direct</a></p>
                  <p className="leading-none mt-1">Secure: <a href="mailto:aminuibrahimknk37@gmail.com" className="text-white hover:text-cyber-cyan">aminuibrahimknk37@gmail.com</a></p>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] bg-[#1a1a1a] px-2 py-0.5 rounded text-gray-500 font-mono">
                    SECURE_SSL // ENCRYPTED_DB
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom copyright & Payment vectors */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo brand copyrights */}
          <div className="text-center md:text-left">
            <p className="text-xs text-gray-600 font-mono tracking-wider">
              © 2026 MAINK TECH. ALL RIGHTS RESERVED. LABS DESIGN INTENT.
            </p>
          </div>

          {/* Payment providers visual cards */}
          <div className="flex items-center space-x-2 text-gray-500 text-xs">
            <span className="px-2 py-1 bg-[#121212] border border-[#222] rounded text-[10px] font-mono select-none">VISA</span>
            <span className="px-2 py-1 bg-[#121212] border border-[#222] rounded text-[10px] font-mono select-none">MCARD</span>
            <span className="px-2 py-1 bg-[#121212] border border-[#222] rounded text-[10px] font-mono select-none">PAYPAL</span>
            <span className="px-2 py-1 bg-[#121212] border border-[#222] rounded text-[10px] font-mono select-none">APPLE_PAY</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
