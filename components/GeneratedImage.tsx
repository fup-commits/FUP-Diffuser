import React, { useEffect, useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface GeneratedImageProps {
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
}

// 1. GLOBAL CACHE (The "Fixing" Layer)
// This map stores generated images by key. Once generated, they are locked here.
// Navigating away and back will simply retrieve the image from here instantly.
const globalImageCache = new Map<string, string>();

// Fallback System (Unsplash) - Used if generation fails
const getFallbackImage = (prompt: string): string => {
  const p = prompt.toLowerCase();
  const params = "?auto=format&fit=crop&w=1200&q=80";
  let id = "photo-1615634260167-c8cdede054de"; // Default abstract smoke

  // Breeds
  if (p.includes('doberman')) id = "photo-1636573880479-7a760f38b24d";
  else if (p.includes('dalmatian')) id = "photo-1608096299210-db7e38487075";
  else if (p.includes('afghan') || p.includes('borzoi') || p.includes('greyhound')) id = "photo-1552053831-71594a27632d";
  else if (p.includes('akita') || p.includes('inu')) id = "photo-1563888392157-5c26b52c004a";
  else if (p.includes('retriever') || p.includes('golden')) id = "photo-1633722715463-d30f4f325e24";
  else if (p.includes('bichon') || p.includes('frise')) id = "photo-1591852504443-34e8574169c9";
  
  // Textures/Products
  else if (p.includes('silk')) id = "photo-1616401784845-180882ba9ba8";
  else if (p.includes('crystal') || p.includes('glass')) id = "photo-1610419842608-5421516e8140";
  else if (p.includes('ink')) id = "photo-1550684848-fac1c5b4e853";
  else if (p.includes('bottle') || p.includes('diffuser')) id = "photo-1602143407151-0111d25687da";

  return `https://images.unsplash.com/${id}${params}`;
};

const GeneratedImage: React.FC<GeneratedImageProps> = ({ prompt, alt, className, aspectRatio = "1:1" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const [imgLoadError, setImgLoadError] = useState(false);
  
  const mounted = useRef(true);
  const retryCount = useRef(0);
  const MAX_RETRIES = 1;

  useEffect(() => {
    mounted.current = true;
    
    // Create a unique key for the cache based on prompt and ratio
    const cacheKey = `${prompt.trim()}-${aspectRatio}`;

    // 2. CACHE CHECK
    // If we have already "fixed" this image in memory, load it instantly.
    if (globalImageCache.has(cacheKey)) {
        setImageUrl(globalImageCache.get(cacheKey)!);
        setLoading(false);
        setUseFallback(false);
        return; // Skip generation
    }

    setLoading(true);
    setUseFallback(false);
    setImgLoadError(false);
    retryCount.current = 0;

    const generate = async () => {
      // Check for API Key
      if (!process.env.API_KEY) {
          console.warn("No API Key found. Using fallback.");
          if (mounted.current) {
              setUseFallback(true);
              setLoading(false);
          }
          return;
      }

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Timeout protection (15 seconds for high quality gen)
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Timeout")), 15000)
        );

        // 3. NANO BANANA GENERATION
        const apiPromise = ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: prompt }] },
          config: { 
            imageConfig: { 
              aspectRatio: aspectRatio 
            } 
          }
        });

        const response: any = await Promise.race([apiPromise, timeoutPromise]);

        if (!mounted.current) return;

        // Parse result
        const imagePart = response.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);
        
        if (imagePart && imagePart.inlineData) {
            const mimeType = imagePart.inlineData.mimeType || 'image/png';
            const generatedUrl = `data:${mimeType};base64,${imagePart.inlineData.data}`;
            
            // 4. FIX TO CACHE
            // Store successful generation in global map
            globalImageCache.set(cacheKey, generatedUrl);
            
            setImageUrl(generatedUrl);
            setLoading(false);
        } else {
            throw new Error("No image data returned");
        }

      } catch (err) {
        // console.error("Generation failed", err);
        
        if (mounted.current) {
            // Retry logic
            if (retryCount.current < MAX_RETRIES) {
                retryCount.current++;
                setTimeout(() => generate(), 2000); // Wait 2s before retry
            } else {
                // If all fails, use fallback
                setUseFallback(true);
                setLoading(false);
            }
        }
      }
    };

    generate();

    return () => {
        mounted.current = false;
    };
  }, [prompt, aspectRatio]);

  // Determine final source
  const finalSrc = useFallback || !imageUrl ? getFallbackImage(prompt) : imageUrl;

  // Loading State UI
  if (loading) {
    return (
        <div className={`${className} bg-[#0a0a0a] flex flex-col items-center justify-center border border-white/5 relative overflow-hidden`}>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
            
            {/* Spinner */}
            <div className="w-5 h-5 border border-white/20 border-t-[#FF3333] rounded-full animate-spin mb-3 relative z-10"></div>
            
            <span className="text-[8px] text-white/30 tracking-widest font-mono uppercase">
                {retryCount.current > 0 ? "Retrying..." : "AI Generating"}
            </span>
        </div>
    );
  }

  // Error State UI (if img tag fails)
  if (imgLoadError) {
      return (
          <div className={`${className} bg-[#111] flex flex-col items-center justify-center border border-white/10 p-4 text-center group`}>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center mb-2 group-hover:border-[#FF3333] transition-colors">
                 <span className="text-[8px] text-white/50">IMG</span>
              </div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest line-clamp-2">{alt}</span>
          </div>
      );
  }

  // Render Image
  return (
    <img 
        src={finalSrc} 
        alt={alt} 
        onError={() => setImgLoadError(true)} 
        className={`${className} animate-in fade-in duration-1000 bg-[#050505]`} 
    />
  );
};

export default GeneratedImage;