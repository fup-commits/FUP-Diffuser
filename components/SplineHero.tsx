import React, { useEffect } from 'react';

const SplineHero: React.FC = () => {

  useEffect(() => {
    // Load Unicorn Studio Script dynamically
    const loadScript = () => {
      // Check if UnicornStudio is already defined or script is present
      const existingScript = document.querySelector('script[src*="unicornStudio.umd.js"]');
      
      if (!existingScript) {
         const script = document.createElement("script");
         script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js";
         script.async = true;
         script.onload = () => {
            if ((window as any).UnicornStudio) {
                (window as any).UnicornStudio.init();
            }
         };
         document.body.appendChild(script);
      } else {
         // If already loaded, re-init just in case
         if ((window as any).UnicornStudio) {
            (window as any).UnicornStudio.init();
         }
      }
    };
    
    loadScript();
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden">
      
      {/* Background - Unicorn Studio */}
      <div className="absolute inset-0 z-0">
            {/* The project container - set to 100% to fill screen */}
            <div 
                data-us-project="RA4VYyXf84FUB6X0O4H5" 
                style={{ width: '100%', height: '100%' }}
                className="w-full h-full"
            ></div>

            {/* Overlay Gradient for Text Readability - Darkens the left side slightly for text */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 pointer-events-none">
         
         {/* Main Heading */}
         <div className="mb-12 mt-16">
            <div className="w-2 h-2 bg-[#FF3333] mb-8 shadow-[0_0_10px_#FF3333]"></div>
            <h1 className="text-6xl md:text-[7vw] lg:text-[8vw] font-display font-bold text-white leading-[1.1] tracking-tighter break-words drop-shadow-2xl">
                SCULPTURAL<br/>
                REED<br/>
                <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>DIFFUSERS</span>
            </h1>
         </div>
         
         {/* Supporting Text & CTA */}
         <div className="space-y-8 max-w-lg pointer-events-auto">
             <p className="font-serif text-xl md:text-2xl text-neutral-300 italic leading-relaxed text-shadow-sm border-l-2 border-[#FF3333] pl-6 mix-blend-difference">
                 "Transform your home into a sanctuary with architectural scent objects."
             </p>
             <button className="group relative px-10 py-4 border border-white/30 bg-black/20 backdrop-blur-sm overflow-hidden transition-all hover:border-white">
                 <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                 <span className="relative font-bold uppercase tracking-[0.2em] text-xs text-white group-hover:text-black transition-colors">Shop Diffusers</span>
             </button>
         </div>

      </div>

      {/* Floating Details - Top Right */}
      <div className="absolute top-28 right-8 z-20 flex flex-col items-end gap-2 pointer-events-none">
            <span className="text-[9px] bg-[#FF3333] text-white px-2 py-1 font-bold uppercase tracking-widest shadow-lg">Vol. 25</span>
            <span className="text-[9px] border border-white/30 text-white/80 px-2 py-1 font-bold uppercase tracking-widest backdrop-blur-sm">Est. 2024</span>
      </div>
        
      {/* Floating Caption - Bottom Right */}
      <div className="absolute bottom-10 right-8 md:right-12 max-w-xs p-6 border border-white/10 bg-black/60 backdrop-blur-md z-20 hidden md:block">
            <p className="text-[9px] text-[#FF3333] font-mono uppercase mb-3 tracking-widest">Figure 01. The Distorted Reality</p>
            <p className="text-sm text-neutral-300 font-serif leading-relaxed italic">
                Traditional home fragrance is boring. We build architectural reed diffusers for the avant-garde space.
            </p>
      </div>

    </div>
  );
};

export default SplineHero;