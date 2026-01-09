import React from 'react';
import { motion } from 'framer-motion';

const SplineHero: React.FC = () => {
  return (
    <div className="relative w-full h-screen pt-[5.5rem] bg-[#050505] flex flex-col md:flex-row border-b border-white/20">
      
      {/* Left Column: Big Text */}
      <div className="w-full md:w-1/2 h-full border-r border-white/20 relative flex flex-col justify-between p-8 md:p-12 z-10 pointer-events-none">
         <div>
            <div className="w-2 h-2 bg-[#FF3333] mb-8"></div>
            <h1 className="text-6xl md:text-[8vw] font-display font-bold text-white leading-[0.8] tracking-tighter mb-8 break-words mix-blend-difference">
                SCULPTURAL<br/>REED<br/><span className="text-outline-white text-transparent" style={{ WebkitTextStroke: '1px white' }}>DIFFUSERS</span>
            </h1>
         </div>
         
         <div className="space-y-8">
             <p className="font-serif text-xl md:text-2xl text-neutral-400 max-w-sm italic leading-tight">
                 "Transform your home into a sanctuary with architectural scent objects."
             </p>
             <button className="pointer-events-auto group relative px-10 py-4 border border-white/30 bg-transparent overflow-hidden">
                 <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                 <span className="relative font-bold uppercase tracking-[0.2em] text-xs text-white group-hover:text-black transition-colors">Shop Diffusers</span>
             </button>
         </div>
      </div>

      {/* Right Column: 3D Scene / Visual */}
      <div className="w-full md:w-1/2 h-full relative overflow-hidden bg-[#0a0a0a]">
        {/* Newspaper overlay details */}
        <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-2">
            <span className="text-[9px] bg-[#FF3333] text-white px-2 py-1 font-bold uppercase tracking-widest">Vol. 25</span>
            <span className="text-[9px] border border-white/30 text-neutral-400 px-2 py-1 font-bold uppercase tracking-widest">Est. 2024</span>
        </div>

        {/* The Spline Scene acting as the 'Hero Image' */}
        <div className="absolute inset-0">
             <iframe 
              src='https://my.spline.design/hellodistortingintro-ARHLUQ6iL2L1bqojGki1lQKl/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              className="w-full h-full grayscale contrast-125 brightness-75 scale-110" 
              title="FUP 3D Experience"
            ></iframe>
        </div>
        
        {/* Floating caption */}
        <div className="absolute bottom-8 left-8 max-w-xs p-6 border border-white/10 bg-black/60 backdrop-blur-md z-20">
            <p className="text-[9px] text-[#FF3333] font-mono uppercase mb-3 tracking-widest">Figure 01. The Distorted Reality</p>
            <p className="text-sm text-neutral-300 font-serif leading-relaxed italic">
                Traditional home fragrance is boring. We build architectural reed diffusers for the avant-garde space.
            </p>
        </div>
      </div>

    </div>
  );
};

export default SplineHero;