import React from 'react';
import GeneratedImage from './GeneratedImage';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white border-t border-white/20 pt-24">
      
      <div className="max-w-full px-8 md:px-16 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                  <div className="font-mono text-[10px] space-y-2 mb-10 uppercase tracking-[0.2em] text-neutral-500">
                      <p className="hover:text-white transition-colors cursor-pointer">01 Select Your Scent</p>
                      <p className="hover:text-white transition-colors cursor-pointer">02 Select Your Frequency</p>
                      <p className="hover:text-white transition-colors cursor-pointer">03 Sit Back And Escape</p>
                  </div>
                  
                  <div className="border border-white/20 p-2 inline-block">
                     <GeneratedImage 
                       prompt="Minimalist black and white art photography of a glass bottle casting a long shadow, high contrast, studio lighting, abstract shapes."
                       alt="Footer Feature"
                       aspectRatio="1:1"
                       className="w-48 h-48 object-cover grayscale"
                     />
                  </div>
              </div>
              
              <div className="flex flex-col justify-end items-start md:items-end text-left md:text-right">
                  <h3 className="font-display text-4xl md:text-5xl uppercase mb-8 leading-[0.9] max-w-md">
                      Subscribe to monthly deliveries and save up to 15%.
                  </h3>
                  <button className="bg-white text-black px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] border border-white hover:bg-[#FF3333] hover:text-white hover:border-[#FF3333] transition-colors">
                      Subscribe Now
                  </button>
              </div>
          </div>
      </div>

      {/* Massive Text */}
      <div className="border-t border-white/20 border-b border-white/20 overflow-hidden bg-white/5">
          <h1 className="text-[16vw] font-display font-bold leading-none text-center tracking-tighter uppercase whitespace-nowrap opacity-20 hover:opacity-100 transition-opacity duration-700">
              NEVER <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>RUN</span> OUT
          </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/20">
          <div className="p-10 border-r border-white/20 border-b border-white/20 md:border-b-0">
              <h4 className="font-bold uppercase mb-6 text-[10px] tracking-widest">Shop</h4>
              <ul className="space-y-3 text-[10px] font-mono uppercase text-gray-500 tracking-widest">
                  <li><a href="#" className="hover:text-[#FF3333] transition-colors">Subscribe</a></li>
                  <li><a href="#" className="hover:text-[#FF3333] transition-colors">Producers</a></li>
                  <li><a href="#" className="hover:text-[#FF3333] transition-colors">Contact</a></li>
              </ul>
          </div>
          <div className="p-10 border-r border-white/20 border-b border-white/20 md:border-b-0">
               <h4 className="font-bold uppercase mb-6 text-[10px] tracking-widest">Escape Lab</h4>
               <p className="text-[10px] font-mono uppercase text-gray-500 leading-relaxed tracking-widest">
                   1420 rue Notre-Dame Ouest<br/>
                   Montréal, Québec<br/>
                   H3C 1K9
               </p>
          </div>
          <div className="p-10 border-r border-white/20 border-b border-white/20 md:border-b-0 col-span-2 flex flex-col justify-between">
              <h4 className="font-display text-3xl uppercase">And You? How Do You Escape?</h4>
              <div className="flex gap-4 mt-6">
                  <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-white cursor-pointer transition-all text-xs">IG</div>
                  <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-white cursor-pointer transition-all text-xs">FB</div>
              </div>
          </div>
      </div>
      
      <div className="px-10 py-6 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-600 gap-4">
          <p>2024 © FUP Design</p>
          <div className="flex gap-8">
              <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
              <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
          </div>
          <p>Curated by FUP</p>
      </div>
    </footer>
  );
};

export default Footer;