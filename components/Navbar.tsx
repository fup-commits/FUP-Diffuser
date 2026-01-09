import React from 'react';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/20 text-white transition-all duration-300">
        <div className="flex items-stretch justify-between h-20">
          
          {/* Logo Section - Left */}
          <div className="flex items-center px-8 border-r border-white/20">
             <a href="#" className="block group">
               <span className="font-display font-bold text-4xl tracking-tighter uppercase group-hover:text-[#FF3333] transition-colors">FUP.</span>
             </a>
          </div>

          {/* Desktop Links - Center */}
          <div className="hidden md:flex flex-1 items-center justify-center border-r border-white/20">
             <div className="flex gap-16 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
               <a href="#" className="hover:text-white transition-colors">Diffusers</a>
               <a href="#" className="hover:text-white transition-colors">Refills</a>
               <a href="#" className="hover:text-white transition-colors">Objects</a>
             </div>
          </div>

          {/* Actions - Right */}
          <div className="flex items-center">
             <div className="hidden md:flex items-center justify-center h-full w-20 border-r border-white/20 cursor-pointer hover:bg-white/5 transition-colors">
                <Search size={18} className="text-white" />
             </div>
             <div className="hidden md:flex items-center h-full px-8 border-r border-white/20 hover:bg-white hover:text-black transition-colors cursor-pointer group">
                <span className="text-[10px] font-bold uppercase tracking-widest group-hover:tracking-[0.25em] transition-all">Account</span>
             </div>
             <button className="flex items-center justify-center h-full px-8 bg-[#FF3333] text-white hover:bg-[#CC0000] transition-colors">
                <ShoppingBag size={18} />
                <span className="ml-3 text-[10px] font-bold hidden md:inline tracking-widest">CART (0)</span>
             </button>
             <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex items-center justify-center h-full px-6 border-l border-white/20 text-white"
             >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
             </button>
          </div>
        </div>
        
        {/* Marquee text - Inverted colors for contrast */}
        <div className="w-full bg-white text-black overflow-hidden py-1.5 border-b border-white/20">
            <div className="animate-marquee whitespace-nowrap flex gap-12 text-[9px] font-bold uppercase tracking-[0.2em]">
                <span>Global Shipping Included</span>
                <span className="text-[#FF3333]">•</span>
                <span>The Red Reed Collection</span>
                <span className="text-[#FF3333]">•</span>
                <span>Limited Edition Borzoi Diffuser</span>
                <span className="text-[#FF3333]">•</span>
                <span>Global Shipping Included</span>
                <span className="text-[#FF3333]">•</span>
                <span>The Red Reed Collection</span>
                <span className="text-[#FF3333]">•</span>
                <span>Limited Edition Borzoi Diffuser</span>
            </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#050505] z-40 flex flex-col pt-32 px-6">
          <div className="flex flex-col space-y-6">
            <a href="#" className="text-5xl font-display font-bold text-white uppercase border-b border-white/20 pb-4 hover:text-[#FF3333] transition-colors">Diffusers</a>
            <a href="#" className="text-5xl font-display font-bold text-white uppercase border-b border-white/20 pb-4 hover:text-[#FF3333] transition-colors">Refills</a>
            <a href="#" className="text-5xl font-display font-bold text-white uppercase border-b border-white/20 pb-4 hover:text-[#FF3333] transition-colors">Journal</a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;