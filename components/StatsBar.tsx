import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import GeneratedImage from './GeneratedImage';

const StatsBar: React.FC = () => {
    const breeds = [
        {
            id: 1,
            name: "The Doberman",
            country: "Germany",
            scent: "Black Pine / Leather",
            // Reference: Close-up, intense, Berlin background
            prompt: "Extreme close-up portrait of a Doberman Pinscher face, intense gaze, glossy black and tan fur, blurred Berlin cityscape background with TV tower, dramatic red lighting, high contrast, cinematic 8k resolution.",
        },
        {
            id: 2,
            name: "The Dalmatian",
            country: "Croatia",
            scent: "Sea Salt / Sage",
            // Reference: Spots, coastal background
            prompt: "Close-up portrait of a Dalmatian dog face, distinct black spots on white fur, elegant posture, blurred Dubrovnik coastal background with terracotta roofs and blue sea, bright daylight, high fashion photography, black and white aesthetic.",
        },
        {
            id: 3,
            name: "The Afghan",
            country: "Afghanistan",
            scent: "Saffron / Silk",
            // Reference: Silky hair, desert background
            prompt: "Close-up portrait of an Afghan Hound, long silky flowing hair filling the frame, wind blowing, blurred golden hour desert mountain background, majestic and regal, highly detailed hair texture, warm monochrome.",
        },
        {
            id: 4,
            name: "The Akita",
            country: "Japan",
            scent: "Hinoki / Yuzu",
            // Reference: Fluffy, neon background
            prompt: "Close-up face portrait of an Akita Inu, fluffy texture, loyal expression, snowflakes falling, blurred Tokyo neon street background at night with red neon lights, moody cinematic lighting, shallow depth of field.",
        }
    ];

    return (
        <section className="border-b border-white/20 bg-[#050505] relative z-20">
            <div className="w-full px-8 py-10 border-b border-white/20 bg-[#050505] text-white flex justify-between items-end">
                <div>
                     <span className="text-[#FF3333] font-mono text-[10px] uppercase tracking-widest block mb-2">Reed Diffuser Collection</span>
                     <h2 className="font-display text-5xl md:text-6xl uppercase tracking-tighter leading-none">
                        Select Your<br/><span className="text-white">Companion</span>
                    </h2>
                </div>
                <p className="hidden md:block font-serif text-sm text-neutral-400 italic max-w-xs text-right leading-relaxed">
                    "A home fragrance as loyal as your shadow. Inspired by the world's most noble breeds."
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 w-full">
                {breeds.map((breed, index) => (
                    <div 
                        key={breed.id} 
                        className={`
                            relative h-[600px] group overflow-hidden cursor-pointer
                            border-b border-white/20 md:border-b-0
                            ${(index === 0 || index === 2) ? 'border-r border-white/20' : ''} 
                            md:border-r 
                            ${index === 3 ? 'md:border-r-0' : ''}
                            ${index === 1 ? 'border-r-0 md:border-r' : ''}
                        `}
                    >
                         {/* Image container - Close up Dog Photography */}
                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100">
                            <GeneratedImage 
                                prompt={breed.prompt}
                                alt={breed.name}
                                aspectRatio="3:4"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-300"></div>
                        
                        {/* Text Overlay */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                             <div className="self-start flex items-center gap-2">
                                <span className="text-[9px] font-bold text-[#FF3333]">0{breed.id}</span>
                                <span className="bg-white/10 backdrop-blur text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest border border-white/10">
                                    {breed.country}
                                </span>
                             </div>

                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#FF3333] mb-3 font-bold">{breed.scent}</p>
                                <div className="flex justify-between items-end border-t border-white/20 pt-4">
                                    <h3 className="font-display text-3xl text-white uppercase leading-none tracking-tight">{breed.name}</h3>
                                    <ArrowUpRight className="text-white w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default StatsBar;