"use client";

import Image from 'next/image';
import { useState } from 'react';

interface RemoteImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

export function RemoteImage({ 
  src, 
  alt, 
  className = "", 
  fallbackText,
  fill = false,
  sizes,
  width,
  height
}: RemoteImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gray-700 ${className}`}>
        <span className="text-gray-400">{fallbackText || alt}</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        unoptimized
        onError={() => {
          console.log(`❌ Error cargando imagen: ${src}`);
          setHasError(true);
          setIsLoading(false);
        }}
        onLoad={() => {
          console.log(`✅ Imagen cargada exitosamente: ${src}`);
          setIsLoading(false);
        }}
      />
    </div>
  );
} 