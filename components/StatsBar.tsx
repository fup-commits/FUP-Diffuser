import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import GeneratedImage from './GeneratedImage';

// Sub-component to handle individual breed logic
const BreedItem = ({ breed, index, isMobileRight, isMobileBottom, isDesktopRight, isDesktopBottom }: any) => {
    // Removed onError state to force browser to try loading the user's custom image
    
    return (
        <div 
            className={`
                relative h-[600px] group overflow-hidden cursor-pointer border-white/20
                ${isMobileRight ? 'border-r' : 'border-r-0'}
                ${isMobileBottom ? 'border-b' : 'border-b-0'}
                
                md:border-r-0 md:border-b-0 
                ${isDesktopRight ? 'md:border-r' : ''}
                ${isDesktopBottom ? 'md:border-b' : ''}
            `}
        >
            {/* Image container */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100">
                {/* Logic: Strictly use customImage if available. No automatic fallback to GeneratedImage on error. */}
                {breed.customImage ? (
                    <img 
                        src={breed.customImage}
                        alt={breed.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                ) : (
                    <GeneratedImage 
                        prompt={breed.prompt}
                        alt={breed.name}
                        aspectRatio="3:4"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                )}
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
    );
};

const StatsBar: React.FC = () => {
    // 6 Scents Collection - linking strictly to public/*.png files
    const breeds = [
        {
            id: 1,
            name: "The Doberman",
            country: "Germany",
            scent: "Black Pine / Leather",
            prompt: "Doberman Pinscher",
            customImage: "/doberman01.png"
        },
        {
            id: 2,
            name: "The Greyhound",
            country: "Italy",
            scent: "Warm Stone / Fig Leaf",
            prompt: "Italian Greyhound",
            customImage: "/greyhound01.png"
        },
        {
            id: 3,
            name: "The Retriever",
            country: "Scotland",
            scent: "Golden Amber / Oat",
            prompt: "Golden Retriever",
            customImage: "/golden01.png"
        },
        {
            id: 4,
            name: "The Poodle",
            country: "France",
            scent: "Vetiver / Champagne",
            prompt: "Standard Poodle White",
            customImage: "/poodle01.png"
        },
        {
            id: 5,
            name: "The Shiba",
            country: "Japan",
            scent: "Hinoki / Toasted Rice",
            prompt: "Shiba Inu",
            customImage: "/shiba01.png"
        },
        {
            id: 6,
            name: "The Maltese",
            country: "Malta",
            scent: "Sea Salt / White Musk",
            prompt: "Maltese Dog",
            customImage: "/maltese01.png"
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
            
            <div className="grid grid-cols-2 md:grid-cols-3 w-full">
                {breeds.map((breed, index) => {
                    // Border Logic
                    const isMobileRight = index % 2 === 0;
                    const isMobileBottom = index < breeds.length - 2; 
                    const isDesktopRight = index % 3 !== 2;
                    const isDesktopBottom = index < 3; 

                    return (
                        <BreedItem 
                            key={breed.id}
                            breed={breed}
                            index={index}
                            isMobileRight={isMobileRight}
                            isMobileBottom={isMobileBottom}
                            isDesktopRight={isDesktopRight}
                            isDesktopBottom={isDesktopBottom}
                        />
                    );
                })}
            </div>
        </section>
    )
}
export default StatsBar;