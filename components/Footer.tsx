import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-20 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        
        <div>
          {/* Updated Logo Style: Image based */}
          <div className="mb-6">
            <img 
              src="/logo.png" 
              alt="FUP Logo" 
              className="h-20 w-auto object-contain"
              onError={(e) => {
                   // Fallback to text if image fails to load
                   e.currentTarget.style.display = 'none';
                   e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback Text */}
            <h1 className="hidden text-6xl font-sans font-black text-white tracking-tighter mb-6 scale-y-125 origin-left">FUP</h1>
          </div>

          <div className="flex flex-col space-y-2 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>

        <div className="flex gap-10 text-sm text-gray-400">
          <div className="flex flex-col space-y-2">
            <span className="text-white font-medium mb-2">Product</span>
            <a href="#" className="hover:text-white transition-colors">Download</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Locations</a>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-white font-medium mb-2">Company</span>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Careers</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs text-gray-600">
        <p>&copy; 2024 FUP Diffuser. All rights reserved.</p>
        <p>Designed for Atmosphere.</p>
      </div>
    </footer>
  );
};

export default Footer;