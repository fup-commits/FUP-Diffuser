import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';

const ScentCard = ({ number, name, notes, desc, image, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="group relative flex flex-col"
  >
    <div className="relative aspect-[4/5] overflow-hidden bg-gray-900 border border-white/10 mb-6">
      <img 
        src={image} 
        alt={name} 
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
      />
      {/* Product Label Overlay Style */}
      <div className="absolute top-6 left-6 right-6 bottom-6 border border-white/20 pointer-events-none flex flex-col justify-between p-4">
         <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-white border border-white px-2 py-0.5">NO. {number}</span>
            <span className="text-[10px] text-white/60 tracking-widest uppercase">Eau de Diffuser</span>
         </div>
         <div className="text-center">
            <h3 className="text-3xl font-serif text-white mb-1 uppercase tracking-wider">{name}</h3>
            <p className="text-[10px] text-white/60 uppercase tracking-widest">{notes}</p>
         </div>
         <div className="text-center text-[10px] text-white/40">
            200ML + 200ML
         </div>
      </div>
      
      {/* Action Button */}
      <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
         <button className="w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-200">
           Add to Cart — 24,900₩
         </button>
      </div>
    </div>
    
    <p className="text-sm text-gray-400 font-light leading-relaxed px-2">
      {desc}
    </p>
  </motion.div>
);

const FeatureGrid: React.FC = () => {
  return (
    <section className="relative py-32 px-4 md:px-12 bg-[#050505] z-20 border-t border-white/10">
      
      <div className="max-w-7xl mx-auto mb-24 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4 block"
        >
          Signature Collection
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-serif text-white mb-6"
        >
          Curated for <span className="italic text-gray-400">Atmosphere</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        <ScentCard 
          number="1"
          name="Modern Black"
          notes="Woody / Amber / Musk"
          desc="Ideally suited for the modern workspace. A scent that wears a black suit. Calm, collected, and undeniably sophisticated."
          image="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800&auto=format&fit=crop&grayscale"
          delay={0}
        />

        <ScentCard 
          number="2"
          name="Pure White"
          notes="Aldehyde / White Rose / Cotton"
          desc="The clean elegance of white soap and fresh linens. Inspired by the powdery classicism of No.5, reinterpreted for the home."
          image="https://images.unsplash.com/photo-1585120040315-2241b774ad0f?q=80&w=800&auto=format&fit=crop&grayscale"
          delay={0.2}
        />

        <ScentCard 
          number="3"
          name="Chic Gold"
          notes="Grapefruit / Neroli / Sandalwood"
          desc="A balance of citrus freshness and warm woods. Like a glass of champagne in a lounge with low lighting."
          image="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=800&auto=format&fit=crop&grayscale"
          delay={0.4}
        />

      </div>

      {/* 1+1 Promo Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mt-32 relative overflow-hidden bg-white/5 border border-white/10 p-12 text-center"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/10"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-white/10"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-6">
           <h3 className="text-4xl md:text-5xl font-serif text-white">1 + 1 Exclusive</h3>
           <p className="text-gray-400 max-w-md">
             We believe in abundance. Every order includes a full size refill or a twin bottle. <br/> 
             <span className="text-white font-bold">400ml Total Capacity.</span>
           </p>
           <button className="bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
             Shop The Set
           </button>
        </div>
      </motion.div>

    </section>
  );
};

export default FeatureGrid;