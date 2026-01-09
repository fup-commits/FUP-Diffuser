import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Scan } from 'lucide-react';

const Tag = ({ text, delay, x, y }: { text: string; delay: number; x: string; y: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5, type: 'spring' }}
    style={{ top: y, left: x }}
    className="absolute bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm px-3 py-1.5 rounded-full pointer-events-none z-10 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
  >
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/20 rotate-45"></div>
    {text}
  </motion.div>
);

const AiSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasCamera(true);
        }
      } catch (e) {
        console.log("Camera access denied or not available", e);
        setHasCamera(false);
      }
    }
    setupCamera();
  }, []);

  return (
    <section className="min-h-screen bg-[#050505] flex items-center justify-center relative py-20 overflow-hidden border-t border-white/10">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-neutral-800/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Text Side */}
        <div className="text-left space-y-8 order-2 md:order-1">
          <div className="flex items-center gap-3 text-white mb-4">
             <Scan className="w-5 h-5 animate-pulse" />
             <span className="text-xs uppercase tracking-[0.2em]">AI Scent Curator</span>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-white leading-tight"
          >
            Find your <br />
            <span className="italic text-gray-400">Signature.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-gray-400 font-light leading-relaxed max-w-md"
          >
            Not sure which scent fits your space? Our AI analyzes your environment's lighting, texture, and mood to recommend the perfect match from the fup collection.
          </motion.p>
          
          <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors">
            Start Analysis
          </button>
        </div>

        {/* Live Camera Side */}
        <div className="relative aspect-[3/4] max-w-md mx-auto md:mx-0 order-1 md:order-2">
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1 }}
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}
             className="w-full h-full overflow-hidden border border-white/20 relative shadow-2xl bg-gray-900"
          >
             {/* Video Feed */}
             <video 
               ref={videoRef}
               autoPlay 
               playsInline 
               muted 
               className={`w-full h-full object-cover grayscale contrast-125 transition-opacity duration-1000 ${hasCamera ? 'opacity-100' : 'opacity-0'}`}
             />
             
             {/* Fallback Image if no camera */}
             {!hasCamera && (
               <img 
                 src="https://picsum.photos/600/800?grayscale" 
                 alt="AI Analysis Fallback" 
                 className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
               />
             )}
             
             {/* Scanning Line Animation */}
             <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[1px] bg-white w-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                />
             </div>

             {/* UI Overlay */}
             <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                   <div className="bg-black/50 backdrop-blur border border-white/30 px-2 py-1 text-[10px] text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                      LIVE
                   </div>
                   <Camera className="w-5 h-5 text-white/60" />
                </div>
                
                <div className="border border-white/20 p-2 bg-black/40 backdrop-blur">
                  <p className="text-[10px] uppercase text-white mb-1">Recommendation:</p>
                  <p className="text-lg font-serif italic text-white">Modern Black</p>
                </div>
             </div>
             
             {/* Dynamic Tags */}
             <Tag text="Space: Living Room" delay={0.5} x="50%" y="20%" />
             <Tag text="Lighting: Dim" delay={1.5} x="20%" y="40%" />
             <Tag text="Texture: Wood" delay={2.5} x="70%" y="60%" />
             <Tag text="Match: Woody/Amber" delay={3.5} x="30%" y="80%" />
             
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AiSection;