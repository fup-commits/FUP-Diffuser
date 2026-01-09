import React from 'react';

interface GeneratedImageProps {
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
  src?: string;
}

// Fallback System (Unsplash) - Used if no local src is provided
const getFallbackImage = (prompt: string): string => {
  const p = prompt.toLowerCase();
  const params = "?auto=format&fit=crop&w=1200&q=80";
  let id = "photo-1615634260167-c8cdede054de"; // Default abstract smoke

  // Breeds
  if (p.includes('doberman')) id = "photo-1636573880479-7a760f38b24d";
  else if (p.includes('dalmatian')) id = "photo-1608096299210-db7e38487075";
  else if (p.includes('afghan') || p.includes('borzoi') || p.includes('greyhound')) id = "photo-1552053831-71594a27632d";
  else if (p.includes('akita') || p.includes('shiba') || p.includes('inu')) id = "photo-1563888392157-5c26b52c004a";
  else if (p.includes('retriever') || p.includes('golden')) id = "photo-1633722715463-d30f4f325e24";
  else if (p.includes('poodle')) id = "photo-1604917637840-7c2293414595"; // Standard Poodle
  else if (p.includes('maltese') || p.includes('bichon') || p.includes('frise')) id = "photo-1591852504443-34e8574169c9";
  
  // Textures/Products
  else if (p.includes('silk')) id = "photo-1616401784845-180882ba9ba8";
  else if (p.includes('crystal') || p.includes('glass')) id = "photo-1610419842608-5421516e8140";
  else if (p.includes('ink')) id = "photo-1550684848-fac1c5b4e853";
  else if (p.includes('bottle') || p.includes('diffuser')) id = "photo-1602143407151-0111d25687da";

  return `https://images.unsplash.com/${id}${params}`;
};

const GeneratedImage: React.FC<GeneratedImageProps> = ({ prompt, alt, className, aspectRatio = "1:1", src }) => {
  // Use local source if available, otherwise fallback to Unsplash
  const finalSrc = src || getFallbackImage(prompt);

  return (
    <img 
        src={finalSrc} 
        alt={alt} 
        className={`${className} bg-[#050505]`} 
    />
  );
};

export default GeneratedImage;