import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import GeneratedImage from './GeneratedImage';

const FeatureGrid: React.FC = () => {
  return (
    <section className="bg-[#050505] text-white border-b border-white/20">
      
      {/* Editorial Header - Split Layout */}
      <div className="flex flex-col md:flex-row border-b border-white/20 min-h-[300px]">
          <div className="w-full md:w-1/2 border-r border-white/20 relative overflow-hidden group">
             {/* Background Image for Header */}
             <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                <GeneratedImage 
                    prompt="Abstract texture of dog fur close up, Dalmatian spots pattern mixed with red paint strokes, artistic texture, high fashion background, black and white photography with red accents."
                    alt="Pattern Texture"
                    aspectRatio="16:9"
                    className="w-full h-full object-cover grayscale contrast-125"
                />
             </div>
             <div className="absolute inset-0 p-12 flex flex-col justify-center z-10">
                 <div className="inline-flex items-center gap-2 mb-4">
                    <Star className="w-3 h-3 fill-[#FF3333] text-[#FF3333]" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF3333]">Home Collection</span>
                 </div>
                 <h2 className="text-6xl md:text-8xl font-display uppercase leading-[0.85] tracking-tighter mix-blend-screen text-white">
                     Scent<br/>The<br/>Space
                 </h2>
             </div>
          </div>

          <div className="w-full md:w-1/2 bg-[#F4F4F5] text-black p-12 flex flex-col justify-between relative">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF3333] rounded-bl-full"></div>
             
             <p className="text-2xl font-serif italic leading-tight max-w-md z-10 pt-8">
                 "We don't create perfumes for skin. We bottle the noble spirit of breeds into architectural reed diffusers for your home."
             </p>
             
             <div className="flex justify-between items-end z-10 border-t border-black/10 pt-8">
                 <div className="flex flex-col">
                     <span className="font-display text-4xl font-bold uppercase mb-1">The Borzoi</span>
                     <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500">Reed Diffuser • 200ml</span>
                 </div>
                 <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">
                    <ArrowRight className="w-5 h-5 -rotate-45" />
                 </div>
             </div>
          </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Item 1: The 'Hero' Art Piece - Borzoi / Russia */}
          <div className="relative h-[900px] border-r border-white/20 border-b border-white/20 md:border-b-0 overflow-hidden">
             <div className="absolute inset-0 p-8 md:p-12">
                <div className="w-full h-full relative shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)]">
                    <GeneratedImage 
                       prompt="Cinematic close-up profile shot of a Borzoi dog (Russian Wolfhound), extremely long elegant snout, white silky fur blowing in wind, blurred snowy birch forest background, ethereal winter atmosphere, high fashion aesthetic, detailed eye focus, black and white photography."
                       alt="The Borzoi Campaign"
                       aspectRatio="3:4"
                       className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    
                    {/* Floating Badge */}
                    <div className="absolute bottom-8 right-8 bg-[#FF3333] text-white w-24 h-24 rounded-full flex items-center justify-center animate-spin-slow mix-blend-multiply">
                        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                            <path
                                id="curve"
                                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                fill="transparent"
                            />
                            <text className="text-[10px] font-bold uppercase tracking-widest fill-current">
                                <textPath href="#curve">
                                    New Arrival • The Borzoi •
                                </textPath>
                            </text>
                        </svg>
                    </div>
                </div>
             </div>
          </div>

          {/* Item 2: Product Showcase - The Bottle */}
          <div className="grid grid-rows-2 h-full">
              
              {/* Image Block - Bottle in Environment */}
              <div className="relative group overflow-hidden border-b border-white/20 h-[450px]">
                   <GeneratedImage 
                    prompt="Product photography of a luxury square glass reed diffuser bottle with black reeds sticks labeled 'THE BORZOI', sitting on ice, blurred snow background, sharp focus on bottle and sticks, minimalist, cold blue and white tones, studio lighting, high contrast."
                    alt="The Borzoi Diffuser Bottle"
                    aspectRatio="16:9"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                   <div className="absolute top-6 left-6 bg-black/80 backdrop-blur text-white px-4 py-2 text-[9px] font-bold uppercase border border-white/10 tracking-widest">
                       Winter Home Scent
                   </div>
              </div>

              {/* Text / Interaction Block */}
              <div className="p-16 flex flex-col justify-center bg-[#0a0a0a] relative">
                  <h3 className="text-5xl font-display font-bold uppercase mb-6 text-white tracking-tighter">
                      Arctic<br/><span className="text-[#FF3333]">Ambience</span>
                  </h3>
                  <div className="space-y-4 mb-10">
                      <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-gray-500">
                          <span className="w-2 h-2 bg-white rounded-full"></span> Top: Frosted Juniper
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-gray-500">
                           <span className="w-2 h-2 bg-white/50 rounded-full"></span> Heart: White Iris
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-gray-500">
                           <span className="w-2 h-2 bg-white/20 rounded-full"></span> Base: Siberian Musk
                      </div>
                  </div>

                  <div className="flex gap-4">
                      <button className="bg-white text-black px-10 py-4 text-[10px] font-bold uppercase hover:bg-[#FF3333] hover:text-white transition-colors tracking-[0.2em]">
                          Shop Diffuser — $120
                      </button>
                  </div>
              </div>
          </div>

      </div>
      
      {/* Marquee Separator */}
       <div className="w-full bg-[#FF3333] text-white overflow-hidden py-2 border-b border-white/20">
            <div className="animate-marquee whitespace-nowrap flex gap-16 text-lg font-bold uppercase tracking-widest font-mono">
                <span>The Greyhound Diffuser</span>
                <span>The Doberman Diffuser</span>
                <span>The Dalmatian Diffuser</span>
                <span>The Akita Diffuser</span>
                <span>The Borzoi Diffuser</span>
                <span>The Greyhound Diffuser</span>
                <span>The Doberman Diffuser</span>
            </div>
        </div>

    </section>
  );
};

export default FeatureGrid;