import React, { useEffect, useState, Suspense } from 'react';
import Navbar from './components/Navbar';
import FeatureGrid from './components/FeatureGrid'; 
import AiSection from './components/AiSection';
import ScrollShowcase from './components/ScrollShowcase';
import Footer from './components/Footer';
import StatsBar from './components/StatsBar';
import GeneratedImage from './components/GeneratedImage';

// Lazy load the 3D component so imports don't block the main thread or crash the whole app
const Hero3D = React.lazy(() => import('./components/Hero3D'));

// A Static Fallback Hero in case 3D fails or is loading
const HeroFallback = () => (
  <div className="relative w-full h-screen bg-[#050505] overflow-hidden">
     {/* Static Background Image */}
     <div className="absolute inset-0 z-0 opacity-40">
        <GeneratedImage 
            prompt="Abstract architectural glass sculpture, black background, red accent lighting, moody atmosphere"
            alt="Background"
            aspectRatio="16:9"
            className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
     </div>
     
     <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
         <div className="mb-12 mt-16">
            <div className="w-2 h-2 bg-[#FF3333] mb-8 shadow-[0_0_10px_#FF3333]"></div>
            <h1 className="text-6xl md:text-[7vw] lg:text-[8vw] font-display font-bold text-white leading-[1.1] tracking-tighter break-words">
                SCULPTURAL<br/>REED<br/>DIFFUSERS
            </h1>
         </div>
     </div>
  </div>
);

// Global Error Boundary to catch crashes
class ErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

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
        {/* Protected 3D Hero Section */}
        <ErrorBoundary fallback={<HeroFallback />}>
            <Suspense fallback={<HeroFallback />}>
                <Hero3D />
            </Suspense>
        </ErrorBoundary>

        <StatsBar />
        <FeatureGrid /> 
        <ScrollShowcase />
        <AiSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;