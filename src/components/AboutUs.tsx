import React, { useState } from 'react';
import { Mail, Phone, MapPin, Sparkles, Send, ShieldCheck, Cpu, Code, MessageSquare, Laptop, CheckCircle2 } from 'lucide-react';

interface AboutUsProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function AboutUs({ onScrollToSection }: AboutUsProps) {
  // Direct proposal state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Application Custom Build',
    detail: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSuccess(true);
    // Auto reset after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', email: '', service: 'Web Application Custom Build', detail: '' });
    }, 5000);
  };

  const inspirationQuotes = [
    {
      text: "The best way to predict the future is to code and build it. In the realm of MAINK, every complex problem is an invitation to engineer a flawless digital answer.",
      author: "Muhammad Ameeen bn Ibrahim Nafi'u Kankia MAINK",
      role: "CEO & Chief Architect, MAINK TECH Group"
    },
    {
      text: "Innovation is our key to a technological future. We don't just solve immediate business constraints; we build scalable digital systems that inspire communities.",
      author: "MAINK TECH Vision Statement",
      role: "Core Cultural Philosophy"
    }
  ];

  const services = [
    {
      icon: Code,
      iconColor: "text-cyber-cyan",
      title: "Custom Web & App Engineering",
      desc: "From elegant custom web design to robust high-performance web applications, leveraging the most modern, lightning-fast frameworks."
    },
    {
      icon: Cpu,
      iconColor: "text-cyber-amber",
      title: "Enterprise Management Systems",
      desc: "Architecting bespoke school databases, hospital record systems, ERPs, and secure customer relation panels built of pure steel."
    },
    {
      icon: Laptop,
      iconColor: "text-purple-400",
      title: "Hardware Gadgets & Distribution",
      desc: "Supplier of premium laptops, computer components, accessories, structural gaming gear, and elite professional developer workspaces."
    },
    {
      icon: ShieldCheck,
      iconColor: "text-emerald-400",
      title: "Diagnostic Repairs & System Care",
      desc: "High-grade troubleshooting diagnostics, motherboard repairs, system optimization services, and secure cloud system setup."
    }
  ];

  return (
    <section 
      id="about-us" 
      className="py-24 bg-[#05050C] border-t border-[#191830] relative overflow-hidden"
    >
      {/* Decorative Cybernetic Background Lines & Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyber-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyber-amber/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Grid Lines Overlay */}
      <div className="absolute inset-0 perspective-grid pointer-events-none opacity-[0.03]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="px-3.5 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono tracking-widest uppercase rounded">
            FOUNDER SPECS & SCOPE
          </span>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wider uppercase leading-none">
            ABOUT MAINK TECH GROUP
          </h2>
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-[2px] bg-cyber-cyan" />
            <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">LABORATORY CONTEXT</span>
            <div className="w-8 h-[2px] bg-cyber-amber" />
          </div>
        </div>

        {/* Founder Spot & Corporate Identity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column Left: Founder Profile & Vision Statement Panel */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#0A0914] border border-[#191830] rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
              {/* Corner tech lines */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyber-cyan/20 rounded-tr-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyber-amber/20 rounded-bl-2xl pointer-events-none" />

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyber-cyan via-[#8A2BE2] to-cyber-amber p-[2px] flex items-center justify-center">
                    <div className="w-full h-full bg-[#05050C] rounded-full flex items-center justify-center text-white font-display text-lg font-black tracking-tighter">
                      M_
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-extrabold text-white uppercase tracking-wider">
                      MUHAMMAD AMEEEN
                    </h3>
                    <p className="text-xs text-cyber-cyan font-mono tracking-widest uppercase font-bold">
                      CO_FOUNDER & CEO, MAINK TECH GROUP
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                  <p>
                    Greetings. I am <strong className="text-white">Muhammad Ameeen bn Ibrahim Nafi'u Kankia MAINK</strong>, lead architect behind the 
                    multi-operational technological ecosystem of <span className="text-cyber-cyan font-bold font-display">MAINK TECH Group</span>. 
                  </p>
                  <p>
                    Our mission is to build software and hardware realities optimized for demanding professionals. We bridge the gap between abstract user desires and production-grade engineering structures.
                  </p>
                  <p className="border-l-2 border-cyber-amber pl-4 italic text-gray-400 text-xs sm:text-sm font-sans my-4 py-1 bg-cyber-amber/15">
                    "Here, innovation is not just an optional variable; it is our blueprint keys to a technological future where your digital and physical constraints are dissolved completely."
                  </p>
                  <p>
                    Whether we are hand-crafting beautiful responsive portfolios, rolling out robust localized database management systems for schools or clinics, or supplying calibrated hardware components, we stand fully for unmitigated precision.
                  </p>
                </div>

                {/* Micro tech parameters table */}
                <div className="pt-4 border-t border-[#191830]/80 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[10px]">
                  <div>
                    <span className="text-gray-500 block">ORIGIN STATION</span>
                    <span className="text-white font-bold">KATSINA, NIGERIA</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">FOUNDED EST</span>
                    <span className="text-white font-bold">2020_SYS</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">TEAM DIRECTIVE</span>
                    <span className="text-cyber-cyan font-bold">FULL-SPECTRUM DEV</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">PIVOT KEY</span>
                    <span className="text-cyber-amber font-bold">INNOV_FUTURE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspiring Business Quotes Slider / Static Spotlight Box */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] block uppercase">
                ⚙️ FOUNDER INSPIRATIONS & DIRECTIVES
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inspirationQuotes.map((quote, idx) => (
                  <div key={idx} className="bg-[#05050C] border border-[#191830]/80 rounded-xl p-5 space-y-3 flex flex-col justify-between hover:border-cyber-cyan/40 transition-all">
                    <div className="text-xs text-gray-400 italic leading-relaxed relative">
                      <span className="text-2xl text-cyber-cyan/30 font-serif absolute -top-3.5 -left-1">“</span>
                      <p className="pl-3.5">{quote.text}</p>
                    </div>
                    <div className="pt-3 border-t border-[#191830]/40">
                      <h4 className="font-sans text-[11px] font-black text-white uppercase tracking-wide">{quote.author}</h4>
                      <p className="text-[9px] font-mono text-gray-500 uppercase">{quote.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column Right: Technology Sphere & Interactive Contact Form */}
          <div className="lg:col-span-5 space-y-8">
            {/* Interactive Business Connection Panel */}
            <div className="bg-[#0A0914] border border-[#191830] rounded-2xl p-6 relative shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-1 px-1.5 bg-cyber-amberSkin/10 border border-cyber-amber/30 text-cyber-amber rounded text-xs font-mono font-bold">
                    HQ_LINK
                  </div>
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                    SECURE INQUIRY FREQUENCY
                  </h3>
                </div>
                
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  Draft your business requirements directly below to synchronize instantly with Muhammad Ameeen's executive desktop console.
                </p>

                {isSuccess ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl p-5 text-center space-y-3 animate-[letterReveal_400ms_ease]">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">PROPOSAL FREQUENCY BLOCKED AND TRANSMITTED</h4>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Team MAINK has successfully captured your request. We will initiate contact via email or direct WhatsApp call immediately. Thank you for choosing innovation!
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Your Full Name / Company</label>
                      <input 
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Dr. Aliyu Katsina"
                        className="w-full bg-[#05050C] border border-[#191830] rounded p-2.5 text-xs text-white placeholder-gray-600 focus:border-cyber-cyan focus:outline-none transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Secure Contact Email Address</label>
                      <input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="e.g. client@domain.com"
                        className="w-full bg-[#05050C] border border-[#191830] rounded p-2.5 text-xs text-white placeholder-gray-600 focus:border-cyber-cyan focus:outline-none transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Required Domain Scope</label>
                      <select 
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="w-full bg-[#05050C] border border-[#191830] rounded p-2.5 text-xs text-white focus:border-cyber-cyan focus:outline-none transition-all font-sans"
                      >
                        <option value="Web Application Custom Build">Custom Web Application / SaaS</option>
                        <option value="Bespoke School / Clinic Management System">Bespoke Management Systems (School, Hospital, e.t.c)</option>
                        <option value="Hardware Procure & PC Calibration">Procure Gadgets & Custom Rig Building</option>
                        <option value="Expert Hardware Diagnostic Repairs">Specialist Hardware Repairs & Upgrades</option>
                        <option value="Corporate Tech Consultation">Corporate Strategic Design Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Brief Project Constraints or Inquiry</label>
                      <textarea 
                        rows={3}
                        value={formData.detail}
                        onChange={(e) => setFormData({...formData, detail: e.target.value})}
                        placeholder="Please specify deadline guidance, device specs, or target goals..."
                        className="w-full bg-[#05050C] border border-[#191830] rounded p-2.5 text-xs text-white placeholder-gray-600 focus:border-cyber-cyan focus:outline-none transition-all font-sans resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-10 bg-cyber-cyan hover:bg-[#8A2BE2] text-black hover:text-white font-display font-black tracking-widest text-[10px] sm:text-xs text-center flex items-center justify-center gap-2 rounded transition-all duration-300 transform active:scale-95 cursor-pointer uppercase shadow-[0_4px_15px_rgba(0,245,255,0.15)] hover:shadow-purple-500/20"
                    >
                      <Send className="w-3.5 h-3.5" /> DOCK PROPOSAL TO FOUNDER
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Direct Connect Quick Reference card */}
            <div className="bg-[#05050C]/60 border border-[#191830] rounded-xl p-5 space-y-3 font-mono text-xs text-gray-400">
              <span className="text-[10px] font-bold text-cyber-amber block tracking-widest uppercase">
                🔴 SECURED DIRECT COMMUNICATIONS
              </span>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-cyber-cyan flex-shrink-0" />
                  <span className="text-gray-300">work@mainktech.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-cyber-cyan flex-shrink-0" />
                  <span className="text-gray-300">+234 806 439 4479</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-cyber-cyan flex-shrink-0" />
                  <span className="text-gray-300">Katsina Tech Hub, Kankia, Katsina State, Nigeria</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full breadth services showcase grid */}
        <div className="mt-20 pt-16 border-t border-[#191830]">
          <div className="text-center mb-12">
            <h3 className="font-display text-lg sm:text-2xl font-black text-white uppercase tracking-wider">
              MAINK TECH GROUP SERVICES SPHERE
            </h3>
            <p className="text-[10px] font-mono text-gray-500 tracking-wider uppercase mt-1">
              Full list of technical capabilities drafted with extreme accuracy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv, index) => {
              const IconComponent = srv.icon;
              return (
                <div 
                  key={index}
                  className="p-5 rounded-2xl bg-[#0A0914] border border-[#191830] hover:border-cyber-cyan/30 hover:scale-[1.02] transform transition-all duration-300 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-black/40 border border-[#191830] flex items-center justify-center">
                      <IconComponent className={`w-6 h-6 ${srv.iconColor}`} />
                    </div>
                    <h4 className="font-display font-extrabold text-[#ffffff] text-xs sm:text-sm uppercase tracking-wider">
                      {srv.title}
                    </h4>
                    <p className="text-[11px] font-sans text-gray-400 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1 text-[9px] font-mono text-cyber-cyan font-bold tracking-widest uppercase">
                    <span>CAPABILITY ACTIVE</span>
                    <Sparkles className="w-3 h-3 animate-pulse" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
