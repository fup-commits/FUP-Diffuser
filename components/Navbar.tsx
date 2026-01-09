import React from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95%] transition-all duration-300">
        <div className="flex items-center justify-between p-2 pl-8 bg-black/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
          {/* Logo */}
          <div className="flex items-center gap-8 mr-6">
             {/* Updated Logo: Image based */}
             {/* Make sure to place your 'logo.png' in the public folder */}
             <a href="#" className="block">
               <img 
                 src="/logo.png" 
                 alt="FUP Logo" 
                 className="h-8 w-auto object-contain"
                 onError={(e) => {
                   // Fallback to text if image fails to load
                   e.currentTarget.style.display = 'none';
                   e.currentTarget.nextElementSibling?.classList.remove('hidden');
                 }}
               />
               {/* Fallback Text (Hidden by default, shown if image missing) */}
               <span className="hidden font-sans text-3xl font-black text-white tracking-tighter scale-y-125 origin-center">FUP</span>
             </a>
             
             <div className="hidden md:flex gap-8 text-xs font-medium text-gray-400 uppercase tracking-widest">
               <a href="#" className="hover:text-white transition-colors">Collection</a>
               <a href="#" className="hover:text-white transition-colors">Our Story</a>
               <a href="#" className="hover:text-white transition-colors">Review</a>
             </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-black bg-white hover:bg-gray-200 rounded-full transition-all">
              <ShoppingBag size={14} />
              <span>SHOP</span>
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 md:hidden">
          <a href="#" className="text-4xl font-serif text-white italic">Collection</a>
          <a href="#" className="text-4xl font-serif text-white italic">Story</a>
          <a href="#" className="text-4xl font-serif text-white italic">Review</a>
        </div>
      )}
    </>
  );
};

export default Navbar;