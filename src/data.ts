import { Product, Testimonial, WhyFeature } from './types';

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'apex-90',
    name: 'MAINK APEX Tactile Switch Lube Kit',
    category: 'GADGETS',
    price: 9.99,
    originalPrice: 14.99,
    rating: 4.8,
    reviewsCount: 412,
    description: 'Bespoke hot-swap keycap pulling and mechanical switch lubrication gadget kit. Includes high-grade fine brushes and premium switch clamps.',
    specs: [
      'Precision machined steel keycap extraction head',
      'Ultra-fine high-retention synthetic lubricating brush',
      'Non-magnetic gold-plated alignment switch opener',
      'Protective zipper storage sleeve custom-fit'
    ],
    features: [
      'Ergonomic finger loops to prevent slippage',
      'Dual-compatible with both plate-mount and screw-in switch housings',
      'Anti-static properties safeguard underlying PCBs'
    ],
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Carbon Black', hex: '#111111' },
      { name: 'Electric Cyan', hex: '#00F5FF' }
    ],
    inStock: true,
    pulseBadge: 'BUDGET ESSENTIAL'
  },
  {
    id: 'tron-x',
    name: 'MAINK TRON Tactile Fidget Clicker',
    category: 'GADGETS',
    price: 7.49,
    originalPrice: 12.99,
    rating: 4.8,
    reviewsCount: 284,
    description: 'Pocket-sized mechanical tactile clicker gadget simulating authentic, high-precision optical mouse button button-strokes for stress relief.',
    specs: [
      'Genuine 90-million click optical switch core',
      'Sculpted skeletal composite pocket case',
      'Detachable steel keychain key-loop hanger',
      'Tactile finger landing zone for grip precision'
    ],
    features: [
      'Click-sound optimization satisfies typing focus',
      'High stress resistance design withstands millions of taps',
      'Extremely light - weighs only 12 grams'
    ],
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Skeletal Black', hex: '#0A0A0A' },
      { name: 'Electric Cyan', hex: '#00F5FF' }
    ],
    inStock: true,
    pulseBadge: 'TACTILE CLICKER'
  },
  {
    id: 'kronos-mat',
    name: 'MAINK KRONOS Mini Desk Coaster',
    category: 'GADGETS',
    price: 4.99,
    originalPrice: 9.99,
    rating: 4.8,
    reviewsCount: 156,
    description: 'A micro hydrophobic desk coaster featuring premium schematic grid prints. Fully optimized for coffee-mugs, protecting desks elegantly.',
    specs: [
      'Dimensions: 110mm x 110mm x 4mm ultra-thick cushion',
      'Micro-woven liquid-repellent cloth core',
      'Anti-slip heavy raw-rubber ring underlayer',
      'Double stitched non-fray matching border trim'
    ],
    features: [
      'Completely water-repellent - liquids bead right off',
      'Washable and fade-resistant pigment technology',
      'Fits seamlessly beside high-tier gaming equipment'
    ],
    images: [
      'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Grid Cyberpunk', hex: '#1E1E1E' },
      { name: 'Monochrome Schematics', hex: '#333333' }
    ],
    inStock: true,
    pulseBadge: 'DESK PROTECTION'
  },
  {
    id: 'quantum-cable',
    name: 'MAINK QUANTUM Braided Ties Set',
    category: 'GADGETS',
    price: 3.99,
    originalPrice: 8.00,
    rating: 4.8,
    reviewsCount: 94,
    description: 'Durable dual-layered braided reusable cable management wraps. Features secure lock-tab design to organize complex computer workspaces.',
    specs: [
      'Length: 150mm with flexible structural memory shaping',
      'Double-sleeved build: nylon paracord + outer techflex weave',
      'High-adhesion micro-hook surface layer',
      'Tear-resistant heat-sealed perimeter stitching'
    ],
    features: [
      'Keeps multi-cable setups neat and perfectly aligned',
      'Universal compatibility for all desk cord bundles',
      'Heavy-duty build does not wear down with repeated usage'
    ],
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Amber Glow', hex: '#FF9500' },
      { name: 'Electric Cyan', hex: '#00F5FF' }
    ],
    inStock: true,
    pulseBadge: 'CABLE MANAGEMENT'
  },
  {
    id: 'cyclone-fan',
    name: 'MAINK CYCLONE Mini USB Propeller',
    category: 'GADGETS',
    price: 8.99,
    originalPrice: 15.00,
    rating: 4.8,
    reviewsCount: 72,
    description: 'Compact USB-powered desk cooling propeller. Adjustable speed toggles and quiet motor performance brings immediate localized fresh air.',
    specs: [
      'Direct USB 5V quiet low-vibration operating motor',
      'Sleek structural blade housing cage for absolute safety',
      'Universal USB-A plug links easily with keyboards/laptops',
      'Manual multi-angle tilt hinge rotates up to 90 degrees'
    ],
    features: [
      'Produces cool, non-turbulent quiet breeze stream',
      'Heavy weighted circular base guarantees zero desk-clatter',
      'Super energy-efficient power draw'
    ],
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584438784894-089d6a128f3e?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Industrial Grey', hex: '#2E2D2C' },
      { name: 'Void Black', hex: '#080808' }
    ],
    inStock: true,
    pulseBadge: 'SUMMER COOLING'
  },
  {
    id: 'vortex-mini',
    name: 'MAINK VORTEX Tech status mini screen',
    category: 'GADGETS',
    price: 9.50,
    originalPrice: 18.00,
    rating: 4.8,
    reviewsCount: 312,
    description: 'Micro USB-driven 0.96 inch desktop auxiliary OLED display. Shows system temperatures, core usage statistics and time counters.',
    specs: [
      '0.96 inch high-contrast monochrome OLED screen matrix',
      'Micro-USB connection supports generic device communication',
      'Includes open-source driver package to map status streams',
      'Compact frame size: occupies virtually zero space on base'
    ],
    features: [
      'Rotatable orientation support to fit horizontal/vertical screens',
      'Real-time update logic fetches status every 1000ms',
      'Durable polycarbonate housing shielding'
    ],
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#0D0D0D' }
    ],
    inStock: true,
    pulseBadge: 'TELEMETRY GADGET'
  },
  {
    id: 'model-comp-1',
    name: 'MAINK Horizon Lite Mini-PC',
    category: 'COMPUTERS',
    price: 199.99,
    originalPrice: 269.99,
    rating: 4.9,
    reviewsCount: 145,
    description: 'Compact and powerful budget computing core. Pre-installed with essential open-source development tools, quad-core processor, high-speed RAM, and elegant micro-aluminum case.',
    specs: [
      'Intel Quad-Core Processor up to 2.8GHz boost',
      '8GB dual-channel DDR4 performance memory',
      '256GB NVMe ultra-fast SSD storage core',
      'Dual HDMI out supporting dual monitor setup',
      'Gigabit Ethernet + Wi-Fi 5 wireless capability'
    ],
    features: [
      'Active copper heatpipe silent cooling structure',
      'Saves workspace - attaches easily behind monitors',
      'Incredibly low energy consumption (under 12W idle)',
      'Pre-packaged with power adapter and modular typing guide'
    ],
    images: [
      'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Obsidian Grey', hex: '#2A2A2D' }
    ],
    inStock: true,
    pulseBadge: 'BEST BUDGET UNIT - $199'
  },
  {
    id: 'model-comp-2',
    name: 'MAINK Pioneer Slim Book-14',
    category: 'COMPUTERS',
    price: 349.99,
    originalPrice: 429.99,
    rating: 4.8,
    reviewsCount: 89,
    description: 'Sleek, lightweight 14-inch professional developer laptop. Built with responsive mechanical keys, extremely vivid high-res screen, and outstanding 10-hour battery life.',
    specs: [
      '14.1-inch Full HD 100% sRGB clear glass display',
      'AMD Ryzen 5 Series Processor (6 Cores / 12 Threads)',
      '12GB LPDDR5 low-power high-speed RAM',
      '512GB High-speed PCIe Gen 4 SSD drive storage',
      'Biometric secure fingerprint camera sign-in link'
    ],
    features: [
      'All-aluminum sturdy alloy frame feels premium and light',
      'Enormous glass multi-touch trackpad supporting system guest gestures',
      'Full-size keyboard with adjustable bright backlit comfort keys',
      'PD charging support - charges to full in 1.5 hours'
    ],
    images: [
      'https://images.unsplash.com/photo-1496181130204-755241524eab?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Glacier Silver', hex: '#E2E8F0' },
      { name: 'Dark Metallic Blue', hex: '#0B1E36' }
    ],
    inStock: true,
    pulseBadge: 'STUDENT SPECIAL - $349'
  },
  {
    id: 'model-comp-3',
    name: 'MAINK Titan-X Code-Master Station',
    category: 'COMPUTERS',
    price: 399.99,
    originalPrice: 499.99,
    rating: 4.9,
    reviewsCount: 177,
    description: 'Engineered high-performance processing desktop station. Designed for heavy programming tasks, database indexing, and frictionless multi-window operations.',
    specs: [
      'Intel Core i5 Deca-Core Desktop Processor (12th Gen)',
      '16GB Dual-channel DDR4 RAM clocked at 3200MHz',
      '1TB NVMe PCIe high-speed solid-state SSD core',
      'Integrated Intel Iris Xe Graphics processing engine',
      'Heavy duty multi-port connection hub (6 x USB, 2 x DisplayPort)'
    ],
    features: [
      'Active dual high-flow air cooler with customizable curves',
      'Semi-modular bronze certified secure power supply unit',
      'Reinforced iron internal framing minimizes chassis bend',
      'Pre-loaded clean web design and terminal workspaces'
    ],
    images: [
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Iron Graphite', hex: '#3E3D40' }
    ],
    inStock: true,
    pulseBadge: 'ELITE WORKSTATION - $399'
  },
  {
    id: 'model-comp-4',
    name: 'MAINK Antigravity Compute Engine',
    category: 'COMPUTERS',
    price: 499.99,
    originalPrice: 599.99,
    rating: 5.0,
    reviewsCount: 201,
    description: 'The absolute flagship computing masterpiece. Ideal for local AI inference model parsing, deep neural code compiler operations, and extreme hardware speeds.',
    specs: [
      'AMD Ryzen 7 high-frequency power CPU (8 Cores / 16 Threads)',
      '32GB premium RAM for frictionless extreme multitasking',
      '1TB super-conductive NVMe SSD storage core',
      'NVIDIA RTX Graphics Processing System with 8GB VRAM',
      'Liquid-cooled silent loop dynamic radiator system'
    ],
    features: [
      'See-through tinted tempered glass visual design sidebar door',
      'Fully customizable liquid flow neon temperature display',
      'Intelligent performance modes managed via machine presets',
      'Dual-antenna Wi-Fi 6E ultra-strength wireless link'
    ],
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1555538995-73aa84f15d11?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Space Void Black', hex: '#05050A' }
    ],
    inStock: true,
    pulseBadge: 'POWER WORKSTATION - $499'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    name: 'Marcus Vance',
    verified: true,
    rating: 5,
    quote: 'The APEX-90 is a masterclass in acoustics. It has that deep, clean tactile "thock" sound and perfect key weight. Shipped incredibly fast to Seattle. Absolutely zero regrets.',
    productTag: 'APEX-90 Keyboard'
  },
  {
    id: 't-2',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    name: 'Elena Rostova',
    verified: true,
    rating: 5,
    quote: 'At 54 grams, the TRON-X feels like an extension of my hand. The tracking response is instantaneous. Im already climbing ranks. Highly recommended for any serious competitive setup.',
    productTag: 'TRON-X Mouse'
  },
  {
    id: 't-3',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    name: 'Tariq Al-Masri',
    verified: true,
    rating: 5,
    quote: 'The scheme and density on the KRONOS cyber mat is fantastic. Waterproofing is no joke—spilled an entire energy drink and it wiped off instantly leaving zero stains! Incredible.',
    productTag: 'KRONOS Desk Mat'
  },
  {
    id: 't-4',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    name: 'Sarah Jenkins',
    verified: true,
    rating: 5,
    quote: 'This custom physical aviator cable from MAINK adds that final premium touch to my build. The amber coil memory is rigid and stays perfectly aligned without sagging. Super thick wire.',
    productTag: 'QUANTUM Cable'
  },
  {
    id: 't-5',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
    name: 'Kenji Taniguchi',
    verified: true,
    rating: 5,
    quote: 'Cyclone is a beautiful piece of equipment. Step-less dial controls feel heavy and analog, like an aviator panel. Keeps hands cool and setup completely silent. 5 out of 5 stars.',
    productTag: 'CYCLONE Smart Desk Rotor'
  }
];

export const WHY_FEATURES: WhyFeature[] = [
  {
    iconName: 'Cpu',
    title: 'Precision Engineered',
    description: 'Every chassis CNC machined to 0.01mm tolerances. No flexing, squeaking, or compromises.'
  },
  {
    iconName: 'ShieldCheck',
    title: '2-Year Full Warranty',
    description: 'We build gear to survive extreme duty cycles. Backed by our standard, bulletproof no-hassle guarantee.'
  },
  {
    iconName: 'Truck',
    title: 'Same-Day Dispatch',
    description: 'Order by 2:00 PM for dispatch within 4 hours. Fully secured tracked shipping worldwide.'
  }
];

export const FAQS = [
  {
    question: 'How fast does default shipping take?',
    answer: 'Standard domestic shipments arrive in 2-3 business days. International takes 5-7 business days depending on customs. Priority overnighting is available at dispatch checklists.'
  },
  {
    question: 'Does the APEX-90 support hot-swapping switch models?',
    answer: 'Yes, it supports both 3-pin and 5-pin mechanical switches (Cherry, Gateron, Kailh, Outemu, etc.) without requiring soldering irons.'
  },
  {
    question: 'What is the refund and replacement policy?',
    answer: 'We provide a 30-day money-back satisfaction trial. If you feel the build quality doesnt match your elite hardware standards, return it for a full immediate reimbursement.'
  }
];
