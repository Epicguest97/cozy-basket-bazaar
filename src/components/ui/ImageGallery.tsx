
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt, className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
        <img
          src={images[selectedIndex]}
          alt={`${alt} - image ${selectedIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover animate-fade-in"
          style={{ animationDuration: '300ms' }}
        />
        
        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow-md transition-transform duration-200 hover:scale-105 focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow-md transition-transform duration-200 hover:scale-105 focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                'relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-200',
                selectedIndex === index ? 'ring-2 ring-black dark:ring-white' : 'opacity-70 hover:opacity-100'
              )}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
