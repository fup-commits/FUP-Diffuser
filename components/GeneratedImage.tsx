import React, { useEffect, useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface GeneratedImageProps {
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
}

const getFallbackImage = (prompt: string): string => {
  const p = prompt.toLowerCase();
  // Unsplash fallback logic based on keywords
  if (p.includes('doberman')) return 'https://images.unsplash.com/photo-1636573880479-7a760f38b24d?q=80&w=800&auto=format&fit=crop';
  if (p.includes('dalmatian')) return 'https://images.unsplash.com/photo-1596707866763-7188be23812a?q=80&w=800&auto=format&fit=crop';
  if (p.includes('afghan')) return 'https://images.unsplash.com/photo-1616870026727-46c07172777b?q=80&w=800&auto=format&fit=crop';
  if (p.includes('akita')) return 'https://images.unsplash.com/photo-1563888392157-5c26b52c004a?q=80&w=800&auto=format&fit=crop';
  if (p.includes('borzoi') || p.includes('greyhound')) return 'https://images.unsplash.com/photo-1629832264936-e63085a30528?q=80&w=800&auto=format&fit=crop';
  if (p.includes('diffuser') || p.includes('bottle')) return 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1200&auto=format&fit=crop';
  if (p.includes('silk') || p.includes('texture')) return 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop';
  if (p.includes('ink') || p.includes('smoke')) return 'https://images.unsplash.com/photo-1504333638930-c8787321eee0?q=80&w=800&auto=format&fit=crop';
  if (p.includes('crystal') || p.includes('glass')) return 'https://images.unsplash.com/photo-1516981879613-9f5da904015f?q=80&w=800&auto=format&fit=crop';
  
  // Default dark aesthetic fallback
  return 'https://images.unsplash.com/photo-1507646227500-4d389b0012be?q=80&w=800&auto=format&fit=crop';
};

const GeneratedImage: React.FC<GeneratedImageProps> = ({ prompt, alt, className, aspectRatio = "1:1" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Note: We use the fallback image if generation fails or API key is missing
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setUseFallback(false);

    const generate = async () => {
      try {
        // Safety check for API Key presence
        if (!process.env.API_KEY) {
            console.warn("Gemini API Key is missing. Falling back to placeholder images.");
            if (mounted) {
                setUseFallback(true);
                setLoading(false);
            }
            return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Call the model
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }]
          },
          config: {
             imageConfig: {
                 aspectRatio: aspectRatio
             }
          }
        });

        if (!mounted) return;

        // Extract the image
        const imagePart = response.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);
        
        if (imagePart && imagePart.inlineData) {
            const mimeType = imagePart.inlineData.mimeType || 'image/png';
            setImageUrl(`data:${mimeType};base64,${imagePart.inlineData.data}`);
            setLoading(false);
        } else {
            console.warn("No image data found in response for prompt:", prompt);
            setUseFallback(true);
            setLoading(false);
        }

      } catch (err) {
        // Detailed error logging for debugging
        console.error("Failed to generate image. This is often due to an invalid API_KEY or quota limits.", err);
        if (mounted) {
            setUseFallback(true);
            setLoading(false);
        }
      }
    };

    generate();

    return () => {
        mounted = false;
    };
  }, [prompt, aspectRatio]);

  if (loading) {
    return (
        <div className={`${className} bg-[#111] animate-pulse flex flex-col items-center justify-center border border-white/10 relative overflow-hidden`}>
            {/* Subtle shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mb-2 relative z-10"></div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest relative z-10">Diffusing...</span>
        </div>
    );
  }

  if (useFallback) {
      return (
          <img 
            src={getFallbackImage(prompt)} 
            alt={alt} 
            className={`${className} grayscale transition-all duration-700 hover:grayscale-0`} 
          />
      );
  }

  return (
    <img 
        src={imageUrl || getFallbackImage(prompt)} 
        alt={alt} 
        className={`${className} animate-in fade-in duration-700`} 
    />
  );
};

export default GeneratedImage;