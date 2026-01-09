import React from 'react';
import { motion } from 'framer-motion';

const SplineHero: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-brand-dark">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src='https://my.spline.design/hellodistortingintro-ARHLUQ6iL2L1bqojGki1lQKl/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full" 
          title="FUP 3D Experience"
        ></iframe>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/60">Fill Ur Place</span>
        <div className="w-[1px] h-12 bg-white"></div>
      </motion.div>
    </div>
  );
};

export default SplineHero;