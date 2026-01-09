import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.5, 0.6], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8, 0.9], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Abstract Video Background */}
        <motion.div style={{ scale }} className="absolute inset-0 w-full h-full">
           <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
          >
            {/* Ink swirling represents the diffusion of scent in a monochrome world */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-209-large.mp4" type="video/mp4" />
          </video>
        </motion.div>
        
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center justify-center pointer-events-none">
          
          <motion.div style={{ opacity: opacity1 }} className="absolute text-center max-w-4xl px-6">
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">Homage to Classic</h2>
            <p className="text-lg md:text-xl text-white/70 font-light tracking-wide leading-relaxed">
              Inspired by the timeless elegance of <span className="text-white italic">Chanel</span> codes. <br/>
              Black lines, white canvas, and the perfect square.
            </p>
          </motion.div>

          <motion.div style={{ opacity: opacity2 }} className="absolute text-center max-w-4xl px-6">
             <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">The Square</h2>
             <p className="text-lg md:text-xl text-white/70 font-light tracking-wide leading-relaxed">
               Heavy glass bottom. Architectural angles. <br/>
               A scent object designed to be the centerpiece of your space.
             </p>
          </motion.div>

           <motion.div style={{ opacity: opacity3 }} className="absolute text-center max-w-4xl px-6">
             <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">Luxury Daily</h2>
             <p className="text-lg md:text-xl text-white/70 font-light tracking-wide leading-relaxed">
               200ml + 200ml Capacity. <br/>
               Uncompromising quality at <span className="text-white font-serif italic">24,900 KRW</span>.
             </p>
          </motion.div>
        </div>
        
        {/* Progress Bar */}
        <motion.div style={{ scaleX: scrollYProgress }} className="absolute bottom-0 left-0 h-1 bg-white origin-left w-full" />
      </div>
    </section>
  )
}

export default ScrollShowcase;