import React, { useEffect, useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface GeneratedImageProps {
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({ prompt, alt, className, aspectRatio = "1:1" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const generate = async () => {
      try {
        // Initialize the client with the API key from the environment
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
        // The response might contain text parts and inlineData parts. We need to find the inlineData.
        const imagePart = response.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);
        
        if (imagePart && imagePart.inlineData) {
            const mimeType = imagePart.inlineData.mimeType || 'image/png';
            setImageUrl(`data:${mimeType};base64,${imagePart.inlineData.data}`);
        } else {
            console.warn("No image data found in response for prompt:", prompt);
            setError(true);
        }

      } catch (err) {
        console.error("Failed to generate image:", err);
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    generate();

    return () => {
        mounted = false;
    };
  }, [prompt, aspectRatio]);

  if (loading) {
    return (
        <div className={`${className} bg-[#111] animate-pulse flex flex-col items-center justify-center border border-white/10`}>
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mb-2"></div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Generating Visual...</span>
        </div>
    );
  }

  if (error || !imageUrl) {
      return (
        <div className={`${className} bg-[#111] flex items-center justify-center border border-white/10`}>
             <span className="text-[10px] text-red-500 uppercase tracking-widest">Visual Unavailable</span>
        </div>
      );
  }

  return <img src={imageUrl} alt={alt} className={className} />;
};

export default GeneratedImage;