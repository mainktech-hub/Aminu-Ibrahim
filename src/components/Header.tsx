import { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingCart, ArrowRight, Keyboard, MousePointer, Layers, Cpu, Sun, Moon, ArrowLeftRight } from 'lucide-react';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectProduct: (product: Product) => void;
  featuredProducts: Product[];
  onScrollToSection: (sectionId: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenCompare: () => void;
}

export default function Header({ 
  cartCount, 
  onOpenCart, 
  onSelectProduct, 
  featuredProducts,
  onScrollToSection,
  theme,
  onToggleTheme,
  onOpenCompare
}: HeaderProps) {
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const promoProduct = featuredProducts.find(p => p.id === 'apex-90') || featuredProducts[0];

  return (
    <header 
      id="maink-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#1E1E1E] py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer" 
            onClick={() => onScrollToSection('hero')}
          >
            <h1 className="font-display tracking-[0.14em] text-xl sm:text-2xl font-black uppercase">
              <span className="text-cyber-cyan">MAINK</span>
              <span className="text-white ml-1">TECH</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            
            {/* Products Dropdown Trigger */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <button 
                onClick={() => onScrollToSection('products')}
                className="font-sans text-sm font-medium text-gray-300 hover:text-cyber-cyan py-2 flex items-center gap-1 uppercase tracking-widest transition-colors cursor-pointer"
              >
                Products
                <span className="text-[10px] transform group-hover:rotate-180 transition-transform duration-300">▼</span>
              </button>

              {/* Mega Menu Dropdown */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 mt-1 w-[800px] bg-[#0F0F0F] border border-[#1E1E1E] rounded-md shadow-2xl p-6 grid grid-cols-12 gap-6 transition-all duration-300 ease-out origin-top ${
                  isProductsDropdownOpen 
                    ? 'opacity-100 scale-100 pointer-events-auto' 
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                {/* Left Side: 4 Category Cards */}
                <div className="col-span-7 grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => {
                      onScrollToSection('products');
                      setIsProductsDropdownOpen(false);
                    }}
                    className="p-4 bg-[#141414] rounded border border-[#222] hover:border-cyber-cyan transition-all group/cat cursor-pointer"
                  >
                    <Keyboard className="w-6 h-6 text-cyber-cyan mb-2 group-hover/cat:scale-110 transition-transform" />
                    <h4 className="font-display text-sm font-bold tracking-wider text-white">MECHANICAL KEYBOARDS</h4>
                    <p className="text-xs text-gray-500 mt-1">High-polling rate, hot-swappable tactile decks.</p>
                  </div>

                  <div 
                    onClick={() => {
                      onScrollToSection('products');
                      setIsProductsDropdownOpen(false);
                    }}
                    className="p-4 bg-[#141414] rounded border border-[#222] hover:border-cyber-cyan transition-all group/cat cursor-pointer"
                  >
                    <MousePointer className="w-6 h-6 text-cyber-cyan mb-2 group-hover/cat:scale-110 transition-transform" />
                    <h4 className="font-display text-sm font-bold tracking-wider text-white">ERGONOMIC MICE</h4>
                    <p className="text-xs text-gray-500 mt-1">Hyperspeed telemetry with absolute tracking.</p>
                  </div>

                  <div 
                    onClick={() => {
                      onScrollToSection('products');
                      setIsProductsDropdownOpen(false);
                    }}
                    className="p-4 bg-[#141414] rounded border border-[#222] hover:border-cyber-cyan transition-all group/cat cursor-pointer"
                  >
                    <Layers className="w-6 h-6 text-cyber-cyan mb-2 group-hover/cat:scale-110 transition-transform" />
                    <h4 className="font-display text-sm font-bold tracking-wider text-white">DESK MATS</h4>
                    <p className="text-xs text-gray-500 mt-1">Stitch-reinforced hydrophobic blueprint skins.</p>
                  </div>

                  <div 
                    onClick={() => {
                      onScrollToSection('products');
                      setIsProductsDropdownOpen(false);
                    }}
                    className="p-4 bg-[#141414] rounded border border-[#222] hover:border-cyber-cyan transition-all group/cat cursor-pointer"
                  >
                    <Cpu className="w-6 h-6 text-cyber-cyan mb-2 group-hover/cat:scale-110 transition-transform" />
                    <h4 className="font-display text-sm font-bold tracking-wider text-white">SMART DEVICES</h4>
                    <p className="text-xs text-gray-500 mt-1">Interactive turbine coolants with OLED diagnostics.</p>
                  </div>
                </div>

                {/* Right Side: Featured Product Card in Mega Menu */}
                <div className="col-span-5 bg-[#080808] p-4 rounded border border-[#1E1E1E] flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 text-[9px] bg-cyber-amber/20 text-cyber-amber border border-cyber-amber/40 font-bebas tracking-widest rounded">FEATURED REVELATION</span>
                    <h3 className="font-display text-base font-bold text-white mt-2 tracking-wide leading-tight">
                      {promoProduct.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 pr-2 line-clamp-3">
                      {promoProduct.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1E1E1E] flex items-center justify-between">
                    <span className="text-cyber-cyan font-bold font-display text-sm">{formatPrice(promoProduct.price)}</span>
                    <button 
                      onClick={() => {
                        onSelectProduct(promoProduct);
                        setIsProductsDropdownOpen(false);
                      }}
                      className="text-xs text-white hover:text-cyber-cyan flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      SPEC DETAILS <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onScrollToSection('why-maink')}
              className="font-sans text-sm font-medium text-gray-300 hover:text-cyber-cyan py-1 uppercase tracking-widest transition-colors cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyber-cyan hover:after:w-full after:transition-all after:duration-300"
            >
              Why Maink Tech
            </button>

            <button 
              onClick={() => onScrollToSection('about-us')}
              className="font-sans text-sm font-medium text-gray-300 hover:text-cyber-cyan py-1 uppercase tracking-widest transition-colors cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyber-cyan hover:after:w-full after:transition-all after:duration-300"
            >
              About Us
            </button>

            <button 
              onClick={() => onScrollToSection('testimonials')}
              className="font-sans text-sm font-medium text-gray-300 hover:text-cyber-cyan py-1 uppercase tracking-widest transition-colors cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyber-cyan hover:after:w-full after:transition-all after:duration-300"
            >
              Reviews
            </button>

            <button 
              onClick={onOpenCompare}
              className="bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan hover:text-black hover:border-transparent px-2.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Compare Specs
            </button>

            <button 
              onClick={() => onScrollToSection('newsletter')}
              className="font-sans text-sm font-medium text-gray-300 hover:text-cyber-cyan py-1 uppercase tracking-widest transition-colors cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyber-cyan hover:after:w-full after:transition-all after:duration-300"
            >
              Join Club
            </button>
          </nav>

          {/* Right Side Utility Elements */}
          <div className="flex items-center space-x-4">
            
            {/* Search Button & Overlay Input */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-[#111] border border-cyber-cyan/40 rounded px-2 py-1 w-60 z-50">
                  <input
                    type="text"
                    placeholder="Search premium gear..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none text-white text-xs focus:outline-none w-full pr-6"
                    autoFocus
                  />
                  <button 
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="absolute right-2 text-gray-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1.5 text-gray-400 hover:text-cyber-cyan transition-colors cursor-pointer"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 pointer-events-none" />
                </button>
              )}
            </div>

            {/* Currency Selector */}
            <div className="flex bg-[#111111] hover:bg-[#181818] border border-[#222222] rounded p-0.5 font-mono text-[10px] font-bold">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-1.5 py-1 rounded transition-all cursor-pointer ${
                  currency === 'USD' 
                    ? 'bg-cyber-cyan text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
                title="USD Currency"
              >
                USD
              </button>
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-1.5 py-1 rounded transition-all cursor-pointer ${
                  currency === 'NGN' 
                    ? 'bg-cyber-cyan text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
                title="NGN Currency (₦)"
              >
                NGN
              </button>
            </div>

            {/* Global Theme Toggle */}
            <button 
              onClick={onToggleTheme}
              className="p-1.5 text-gray-400 hover:text-cyber-cyan transition-all duration-300 cursor-pointer flex items-center justify-center rounded-full hover:bg-white/5 active:scale-90"
              title={theme === 'dark' ? "Shift to High Contrast Light Mode" : "Shift to Futuristic Dark Mode"}
              aria-label="Toggle Theme Mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-cyber-cyan animate-pulse" />
              ) : (
                <Moon className="w-5 h-5 text-black" />
              )}
            </button>

            {/* Cart Button */}
            <button 
              onClick={onOpenCart}
              className="p-1.5 text-gray-400 hover:text-cyber-cyan transition-colors relative cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyber-amber text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center scale-90 border-2 border-[#111]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Shop Now Primary Button */}
            <button 
              onClick={() => onScrollToSection('products')}
              className="hidden sm:inline-block font-display text-xs font-bold tracking-widest bg-cyber-cyan text-black px-5 py-2.5 rounded hover:scale-105 active:scale-95 transition-all neon-glow-cyan-hover uppercase cursor-pointer"
            >
              Shop Now
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Main Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sliding Menu Panel */}
      <div 
        className={`fixed right-0 top-0 h-full w-4/5 max-w-sm bg-[#0C0C0C] border-l border-[#1E1E1E] z-50 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#222]">
            <h2 className="font-display tracking-widest text-lg font-black uppercase text-cyber-cyan">
              MAINK MENU
            </h2>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col space-y-6">
            <button 
              onClick={() => {
                onScrollToSection('products');
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-display text-lg tracking-widest text-white hover:text-cyber-cyan uppercase transition-colors cursor-pointer"
            >
              Products Catalog
            </button>
            <button 
              onClick={() => {
                onScrollToSection('why-maink');
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-display text-lg tracking-widest text-white hover:text-cyber-cyan uppercase transition-colors cursor-pointer"
            >
              Engineer Heritage
            </button>
            <button 
              onClick={() => {
                onScrollToSection('about-us');
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-display text-lg tracking-widest text-white hover:text-cyber-cyan uppercase transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button 
              onClick={() => {
                onScrollToSection('testimonials');
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-display text-lg tracking-widest text-white hover:text-cyber-cyan uppercase transition-colors cursor-pointer"
            >
              Reviews & Stats
            </button>
            <button 
              onClick={() => {
                onScrollToSection('newsletter');
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-display text-lg tracking-widest text-white hover:text-cyber-cyan uppercase transition-colors cursor-pointer"
            >
              Discount Club
            </button>
            <button 
              onClick={() => {
                onOpenCompare();
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-display text-lg tracking-widest text-cyber-cyan hover:text-white uppercase transition-colors cursor-pointer flex items-center gap-2"
            >
              ⚖️ Compare Specs
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#1E1E1E] space-y-4">
          {/* Currency Toggle for Mobile */}
          <div className="flex justify-between items-center text-xs font-mono font-bold text-gray-400">
            <span>CURRENCY</span>
            <div className="flex bg-black border border-[#222222] rounded p-0.5 font-mono text-[10px] font-bold">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  currency === 'USD' 
                    ? 'bg-cyber-cyan text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  currency === 'NGN' 
                    ? 'bg-cyber-cyan text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                NGN (₦)
              </button>
            </div>
          </div>

          <button 
            onClick={() => {
              onScrollToSection('products');
              setIsMobileMenuOpen(false);
            }}
            className="w-full font-display text-sm text-center font-bold tracking-widest bg-cyber-cyan text-black py-3 rounded hover:scale-102 transition-all uppercase cursor-pointer"
          >
            Shop Now
          </button>
          <p className="text-[10px] text-gray-500 text-center mt-3 tracking-widest font-mono">
            MAINK TECH // SERIOUS ENGINE 2026
          </p>
        </div>
      </div>
    </header>
  );
}
