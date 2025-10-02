import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  priority = false 
}: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (priority) {
      // Pour les images prioritaires, charger immédiatement
      setImageSrc(src);
    } else {
      // Pour les autres, utiliser IntersectionObserver
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setImageLoaded(true);
      };
    }
  }, [src, priority]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      loading={loading}
      decoding="async"
    />
  );
};
