import { useState, useEffect } from 'react';
import { ArrowUp, ShoppingBag, Check, CheckCircle, Database, MessageCircle, Mail, Phone } from 'lucide-react';

// Custom component imports
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import WhyMaink from './components/WhyMaink';
import Testimonials from './components/Testimonials';
import EmailCapture from './components/EmailCapture';
import Footer from './components/Footer';
import ProductDetailDrawer from './components/ProductDetailDrawer';
import CartSidebar from './components/CartSidebar';
import AdminConsole from './components/AdminConsole';
import CompareModal from './components/CompareModal';
import AboutUs from './components/AboutUs';

// Data & Types
import { FEATURED_PRODUCTS, TESTIMONIALS } from './data';
import { Product, CartItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Specs Comparison Modal States
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareProductA, setCompareProductA] = useState<Product | null>(null);
  const [compareProductB, setCompareProductB] = useState<Product | null>(null);
  
  // Theme State Engine (recovers setting or defaults to dynamic Dark)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('maink-theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // Track page visitor and push to dynamic database log on mount
  useEffect(() => {
    const trackVisitorFootprints = async () => {
      // Limit visit email trigger to once per session to avoid hot-reload spamming the outbox
      const isAlreadyLogged = sessionStorage.getItem('maink_session_logged');
      try {
        await fetch('/api/visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userAgent: navigator.userAgent,
            sessionStarted: !isAlreadyLogged
          })
        });
        sessionStorage.setItem('maink_session_logged', 'true');
      } catch (err) {
        console.warn("[DB ENGINE] Footprint transmission delay:", err);
      }
    };
    
    trackVisitorFootprints();
  }, []);

  // Update DOM body classes when theme modifies
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
    localStorage.setItem('maink-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // High-converting added to cart toast states
  const [toast, setToast] = useState<{ show: boolean; text: string; sub: string } | null>(null);

  // Monitor Scroll for Back-to-Top Button (appears past 400px)
  useEffect(() => {
    const checkScrollPosition = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  // Handle section scrolling
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add Item to Cart with configurable quantity
  const handleAddToCart = (product: Product, colorName: string, count: number = 1) => {
    setCart((prevCart) => {
      // Check if product with the exact same color choice exists
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === colorName
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        // Enforce the premium max quantity of 2 drops per client rule
        const currentQty = updated[existingIdx].quantity;
        const newQty = Math.min(2, currentQty + count);
        updated[existingIdx].quantity = newQty;
        
        // Custom message based on limit thresholds
        if (currentQty + count > 2) {
          triggerToast(
            "ALERT: LIMIT REACHED",
            `Maximum 2 slots allocated for the ${product.name} (Skin: ${colorName}).`
          );
        } else {
          triggerToast(
            "CART MODIFIED ✅",
            `Increased bundle: ${product.name} count updated to ${newQty}.`
          );
        }
        return updated;
      } else {
        triggerToast(
          "ADDED TO BUNDLE 🛒",
          `${product.name} (${colorName}) loaded into command command station.`
        );
        return [...prevCart, { product, quantity: Math.min(2, count), selectedColor: colorName }];
      }
    });
  };

  // Toast Auto-Decay Alert Timer
  const triggerToast = (title: string, msg: string) => {
    setToast({ show: true, text: title, sub: msg });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
         setToast(null);
      }, 4000); // 4-second auto decay
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Adjust Quantity inside active cart sidebar
  const handleUpdateCartQty = (productId: string, color: string, delta: number) => {
    setCart((prevCart) => {
      const targetIdx = prevCart.findIndex(
        (item) => item.product.id === productId && item.selectedColor === color
      );
      if (targetIdx === -1) return prevCart;

      const updated = [...prevCart];
      const newQty = updated[targetIdx].quantity + delta;

      if (newQty <= 0) {
        // Filter out
        return prevCart.filter((_, idx) => idx !== targetIdx);
      } else if (newQty > 2) {
        triggerToast("LIMIT MET", "Allocations capped at 2 units to prevent scalper drafts.");
        return prevCart;
      } else {
        updated[targetIdx].quantity = newQty;
        return updated;
      }
    });
  };

  // Manual Remove item
  const handleRemoveCartItem = (productId: string, color: string) => {
    setCart((prevCart) => prevCart.filter(
      (item) => !(item.product.id === productId && item.selectedColor === color)
    ));
    triggerToast("STATION REMOVED 🗑️", "Selected peripheral cleared from configuration matrix.");
  };

  // Clear Cart helper
  const handleClearCart = () => {
    setCart([]);
  };

  // Specs compare handler
  const handleCompareProduct = (product: Product) => {
    if (!compareProductA) {
      setCompareProductA(product);
    } else if (!compareProductB && compareProductA.id !== product.id) {
      setCompareProductB(product);
    } else if (compareProductA.id === product.id) {
      // already in slot alpha, ignore
    } else {
      // both slots filled, cycle slots to load this in Alpha
      setCompareProductB(compareProductA);
      setCompareProductA(product);
    }
    setIsCompareOpen(true);
  };

  // Selected Flagship hero product (defaulting to APEX-90 for quick highlight)
  const heroProduct = FEATURED_PRODUCTS.find((p) => p.id === 'apex-90') || FEATURED_PRODUCTS[0];

  return (
    <div className="relative min-h-screen bg-cyber-dark text-white select-none selection:bg-cyber-cyan selection:text-black">
      
      {/* Noise Background Overlay */}
      <div className="fixed inset-0 noise-overlay pointer-events-none opacity-[0.03] z-[99999]" />

      {/* Primary Sticky Header */}
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectProduct={setSelectedProduct}
        featuredProducts={FEATURED_PRODUCTS}
        onScrollToSection={scrollToSection}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* App Body Sections */}
      <main className="space-y-0">
        
        {/* 1. Hero Landing Block */}
        <Hero 
          onScrollToSection={scrollToSection}
          onSelectProduct={setSelectedProduct}
          heroProduct={heroProduct}
        />

        {/* 2. Featured Grid Catalog */}
        <FeaturedProducts 
          products={FEATURED_PRODUCTS}
          onSelectProduct={setSelectedProduct}
          onAddToCart={handleAddToCart}
          onCompareProduct={handleCompareProduct}
        />

        {/* 3. Why MAINK Pillars */}
        <WhyMaink 
          onScrollToSection={scrollToSection}
        />

        {/* About Us section */}
        <AboutUs 
          onScrollToSection={scrollToSection}
        />

        {/* 4. Horizontal Testimonials & Stats */}
        <Testimonials 
          testimonials={TESTIMONIALS}
        />

        {/* 5. Light contrast Discount email capture */}
        <EmailCapture />

      </main>

      {/* Comprehensive Footer Area */}
      <Footer 
        onScrollToSection={scrollToSection}
        onSelectProduct={setSelectedProduct}
        allProducts={FEATURED_PRODUCTS}
      />

      {/* FLOATING ACTION TRIGGER 1: OWNER DATABASE COMMAND SYSTEM (Bottom Left) */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 left-6 z-[100] px-4 py-3 bg-[#0c0c0c] hover:bg-[#141414] text-cyber-cyan hover:text-white border border-[#222] hover:border-cyber-cyan rounded-full flex items-center gap-2.5 transition-all duration-300 transform active:scale-95 shadow-2xl font-mono text-[10px] sm:text-xs uppercase tracking-widest cursor-pointer"
        title="Admin Database Console"
      >
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
        <Database className="w-4 h-4 text-cyber-amber shrink-0" />
        <span className="font-bold">Command Center</span>
      </button>

      {/* FLOATING ACTION TRIGGER 2: Back to Top (appears past 400px, Bottom Right) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-[100] w-12 h-12 bg-[#111] hover:bg-cyber-cyan text-gray-400 hover:text-black border border-[#222] hover:border-black rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-90 shadow-2xl hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] cursor-pointer ${
          showScrollTop ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto' : 'translate-y-8 opacity-0 scale-75 pointer-events-none'
        }`}
        title="Command center apex"
        aria-label="Back to Top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* FLOATING ACTION TRIGGER 3: SECURE OPERATOR CONTACT DOCK */}
      <div className="fixed bottom-24 right-6 z-[100] flex flex-col gap-3.5 items-center animate-[letterReveal_600ms_cubic-bezier(0.16,1,0.3,1)]">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/2348064394479"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-12 h-12 bg-[#09090D]/90 backdrop-blur-md hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#222] hover:border-transparent rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-90 shadow-2xl hover:shadow-[0_0_20px_rgba(37,211,102,0.55)] cursor-pointer"
          title="Secure Tech Line (WhatsApp)"
          aria-label="Secure WhatsApp Chat"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="absolute right-16 scale-0 group-hover:scale-100 bg-[#09090D] border border-[#222] text-white text-[10px] font-mono tracking-widest uppercase py-1.5 px-3 rounded shadow-xl whitespace-nowrap transition-all duration-200 pointer-events-none origin-right">
            WhatsApp Operator
          </span>
        </a>

        {/* Email Button */}
        <a
          href="mailto:aminuibrahimknk37@gmail.com"
          className="group relative w-12 h-12 bg-[#09090D]/90 backdrop-blur-md hover:bg-cyber-cyan text-cyber-cyan hover:text-black border border-[#222] hover:border-transparent rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-90 shadow-2xl hover:shadow-[0_0_20px_rgba(0,255,234,0.55)] cursor-pointer"
          title="Secure Mail Transfer"
          aria-label="Secure Email Channel"
        >
          <Mail className="w-5 h-5" />
          <span className="absolute right-16 scale-0 group-hover:scale-100 bg-[#09090D] border border-[#222] text-white text-[10px] font-mono tracking-widest uppercase py-1.5 px-3 rounded shadow-xl whitespace-nowrap transition-all duration-200 pointer-events-none origin-right">
            Email Operator
          </span>
        </a>

        {/* Phone Button */}
        <a
          href="tel:+2348064394479"
          className="group relative w-12 h-12 bg-[#09090D]/90 backdrop-blur-md hover:bg-cyber-amber text-cyber-amber hover:text-black border border-[#222] hover:border-transparent rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-90 shadow-2xl hover:shadow-[0_0_20px_rgba(255,102,0,0.55)] cursor-pointer"
          title="Direct Telephone Connection"
          aria-label="Direct Phone Hot-line"
        >
          <Phone className="w-5 h-5" />
          <span className="absolute right-16 scale-0 group-hover:scale-100 bg-[#09090D] border border-[#222] text-white text-[10px] font-mono tracking-widest uppercase py-1.5 px-3 rounded shadow-xl whitespace-nowrap transition-all duration-200 pointer-events-none origin-right">
            Call Operator
          </span>
        </a>
      </div>

      {/* Interactive PDP Drawer Panel Overlay */}
      <ProductDetailDrawer 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onScrollToSection={scrollToSection}
      />

      {/* Cart Sidebar Inventory Drawer Overlay */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onScrollToSection={scrollToSection}
        onClearCart={handleClearCart}
      />

      {/* Owner Console Overlay Panels */}
      <AdminConsole 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Specs side-by-side comparative logic controller */}
      <CompareModal 
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        products={FEATURED_PRODUCTS}
        initialProductA={compareProductA}
        initialProductB={compareProductB}
        onAddToCart={handleAddToCart}
      />

      {/* Sticky added-to-cart Toast Notification Alert (Decays every 4s) */}
      {toast && (
        <div className="fixed top-24 right-4 sm:right-6 md:right-8 z-[11000] bg-[#111] border-2 border-cyber-cyan text-white p-4 rounded-xl shadow-[0_10px_35px_rgba(0,245,255,0.45)] flex items-start gap-4 max-w-sm animate-[letterReveal_500ms_cubic-bezier(0.16,1,0.3,1)] select-none">
          <div className="w-10 h-10 rounded-full bg-cyber-cyan/10 border border-cyber-cyan flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-cyber-cyan" />
          </div>
          <div className="flex-grow space-y-1">
            <h4 className="font-display font-black text-xs sm:text-sm text-white tracking-widest uppercase">
              {toast.text}
            </h4>
            <p className="text-[11px] text-gray-400 font-sans leading-relaxed tracking-wide">
              {toast.sub}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
