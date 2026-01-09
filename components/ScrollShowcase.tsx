import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GeneratedImage from './GeneratedImage';

const ScrollShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.3], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#050505] border-b border-white/20">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Text Motion Area */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center relative border-r border-white/20 bg-[#050505] z-10 p-12">
          
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none opacity-10">
              <div className="border-r border-b border-white"></div>
              <div className="border-b border-white"></div>
              <div className="border-r border-white"></div>
          </div>

          <motion.div style={{ opacity: opacity1 }} className="absolute px-8 md:px-16 w-full text-left">
             <div className="text-[#FF3333] font-mono text-[9px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-[#FF3333]"></span>
                Note 01
             </div>
             <h2 className="text-6xl md:text-8xl font-display font-bold text-white uppercase mb-8 leading-none tracking-tighter">
               Liquid<br/>Silk
             </h2>
             <p className="text-xl font-serif text-neutral-500 max-w-sm italic leading-relaxed">
               The scent begins as a fluid emotion. Smooth, enveloping, and impossible to hold.
             </p>
          </motion.div>

          <motion.div style={{ opacity: opacity2 }} className="absolute px-8 md:px-16 w-full text-left">
             <div className="text-white font-mono text-[9px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-white"></span>
                Note 02
             </div>
             <h2 className="text-6xl md:text-8xl font-display font-bold text-white uppercase mb-8 leading-none tracking-tighter">
               Cold<br/>Crystal
             </h2>
             <p className="text-xl font-serif text-neutral-500 max-w-sm italic leading-relaxed">
                Sharp citrus notes cutting through the air like refracted light in a prism.
             </p>
          </motion.div>

          <motion.div style={{ opacity: opacity3 }} className="absolute px-8 md:px-16 w-full text-left">
             <div className="text-neutral-500 font-mono text-[9px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-neutral-500"></span>
                Note 03
             </div>
             <h2 className="text-6xl md:text-8xl font-display font-bold text-white uppercase mb-8 leading-none tracking-tighter">
               Deep<br/>Ink
             </h2>
             <p className="text-xl font-serif text-neutral-500 max-w-sm italic leading-relaxed">
                The dry down. A permanent mark on the memory, dark and resonant.
             </p>
          </motion.div>
          
        </div>

        {/* Right Side: Product Image Area */}
        <div className="hidden md:block w-1/2 h-full relative bg-[#000]">
           <motion.div style={{ opacity: opacity1 }} className="absolute inset-0">
             <GeneratedImage 
               prompt="Macro photography of red silk fabric rippling in water, elegant fluid motion, high contrast, cinematic lighting, luxurious texture, black background, red and black."
               alt="Silk Texture"
               aspectRatio="3:4"
               className="w-full h-full object-cover"
             />
           </motion.div>
           
           <motion.div style={{ opacity: opacity2 }} className="absolute inset-0">
             <GeneratedImage 
               prompt="Abstract crystal macro photography, shards of glass reflecting light, sharp angles, clean and minimalist, cool tones, black and white photography."
               alt="Crystal Texture"
               aspectRatio="3:4"
               className="w-full h-full object-cover"
             />
           </motion.div>

           <motion.div style={{ opacity: opacity3 }} className="absolute inset-0">
             <GeneratedImage 
               prompt="Black ink dropping into water, swirling smoke effect, macro photography, high speed capture, abstract art, mysterious and dark, white background, high contrast."
               alt="Ink Texture"
               aspectRatio="3:4"
               className="w-full h-full object-cover"
             />
           </motion.div>
        </div>

      </div>
    </section>
  )
}

export default ScrollShowcase;