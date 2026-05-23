import { useState, FormEvent } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setIsError(true);
      return;
    }
    
    setIsError(false);
    setIsSubmitted(true);
  };

  return (
    <section 
      id="newsletter" 
      className="relative bg-cyber-cyan py-20 overflow-hidden text-black block w-full"
    >
      {/* Noise texture overlay for that premium raw steel look */}
      <div className="absolute inset-0 noise-overlay pointer-events-none mix-blend-multiply opacity-25" />

      {/* Cyber ambient rings inside light block */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-black/5 rounded-full pointer-events-none animate-[spin_50s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-dashed border-black/5 rounded-full pointer-events-none animate-[spin_20s_linear_infinite_reverse]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Scarcity badge */}
        <div className="inline-block px-3 py-1 bg-black/10 border border-black/15 text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4">
          EXCLUSIVE SUBSCRIBER CHANNELS
        </div>

        {/* Heading */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none">
          GET 15% OFF YOUR FIRST ORDER
        </h2>

        {/* Subcopy */}
        <p className="font-sans text-sm sm:text-base font-medium text-black/80 max-w-xl mx-auto mt-4 leading-relaxed tracking-wide">
          Join 30,000+ tech enthusiasts. Secure first access to limited edition drops, secret discount blueprints, and custom mechanical reviews. Zero spam.
        </p>

        {/* Form area replacing dynamically on submit */}
        <div className="mt-10 max-w-lg mx-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <div className="relative flex-grow">
                  <input 
                    type="email"
                    name="email"
                    placeholder="Enter your secret email..."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (isError) setIsError(false);
                    }}
                    className={`w-full px-5 py-4 bg-[#0A0A0A] text-white placeholder-gray-500 rounded font-sans text-sm focus:outline-none focus:ring-2 ${
                      isError ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-black'
                    } transition-all`}
                    required
                  />
                  {isError && (
                    <span className="absolute left-1 -bottom-5 text-[10px] text-red-700 font-mono font-bold uppercase">
                      * VALID EMAIL TARGET REQUIRED
                    </span>
                  )}
                </div>

                <button 
                  type="submit"
                  className="px-8 py-4 bg-[#0A0A0A] hover:bg-cyber-amber text-white hover:text-black font-display text-sm font-black tracking-widest transition-colors duration-300 rounded uppercase cursor-pointer flex items-center justify-center gap-2 flex-shrink-0"
                >
                  CLAIM DISCOUNT <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Micro-copy below */}
              <p className="text-[11px] text-black/70 font-sans mt-3">
                🔒 No spam. We hold privacy to 99.9% standards. Unsubscribe anytime in one click.
              </p>
            </form>
          ) : (
            <div className="animate-[letterReveal_0.4s_ease-out] bg-[#0A0A0A] border border-[#1E1E1E] text-white p-8 rounded-xl shadow-2xl space-y-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-cyber-cyan/10 border border-cyber-cyan flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-cyber-cyan" />
              </div>
              
              <div className="space-y-1">
                <h3 className="font-display font-bold text-xl tracking-wider text-white uppercase">
                  ✅ CODE SENT!
                </h3>
                <p className="text-xs text-gray-400 font-mono uppercase tracking-widest text-center">
                  Check your inbox for target key: <span className="text-cyber-cyan font-bold font-sans">MAINK15</span>
                </p>
              </div>

              <div className="w-full h-[1px] bg-[#222] my-2" />

              <p className="text-[11px] text-gray-500 max-w-sm">
                Your 15% discount activation coupon has been routed. Enter key <span className="text-cyber-amber font-bold font-sans">MAINK15</span> during checkouts to claim. Welcome to the MAINK TECH core community.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
