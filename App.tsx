import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import SplineHero from './components/SplineHero';
import FeatureGrid from './components/FeatureGrid';
import AiSection from './components/AiSection';
import ScrollShowcase from './components/ScrollShowcase';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-neutral-200 selection:bg-white/20 selection:text-white">
      
      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
             <div className="w-16 h-16 border-t-2 border-white rounded-full animate-spin"></div>
             <p className="font-serif text-white animate-pulse tracking-widest text-sm">INITIALIZING FUP</p>
          </div>
        </div>
      )}

      <Navbar />
      
      <main>
        <SplineHero />
        <ScrollShowcase />
        <div className="relative z-20 bg-[#050505] pb-20">
          <FeatureGrid />
        </div>
        <AiSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;