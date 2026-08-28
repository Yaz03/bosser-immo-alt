"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface PropertyGalleryProps {
  images?: string[];
  fallbackImage: string;
}

export default function PropertyGallery({ images, fallbackImage }: PropertyGalleryProps) {
  const displayImages = images && images.length > 0 ? images : [fallbackImage];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // We limit the mosaic to max 5 images
  const mosaicImages = displayImages.slice(0, 5);
  const dataCount = Math.min(displayImages.length, 5);

  const openLightbox = (index: number = 0) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % displayImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + displayImages.length) % displayImages.length);
    }
  };

  return (
    <div className="property-gallery-container">
      <div className="gallery-mosaic" data-count={dataCount}>
        <div className="gallery-main" onClick={() => openLightbox(0)}>
          <Image 
            src={mosaicImages[0]} 
            alt="Property Main" 
            fill 
            className="gallery-image"
            style={{ objectFit: 'cover' }}
          />
        </div>
        {mosaicImages.slice(1).map((img, idx) => (
          <div key={idx} className={`gallery-mosaic-item item-${idx + 1}`} onClick={() => openLightbox(idx + 1)}>
            <Image 
              src={img} 
              alt={`Property view ${idx + 2}`} 
              fill 
              className="gallery-image"
              style={{ objectFit: 'cover' }}
            />
            {idx === 3 && displayImages.length > 5 && (
              <div className="gallery-more-overlay">
                <span>+ {displayImages.length - 5} Photos</span>
              </div>
            )}
          </div>
        ))}
        
        {displayImages.length > 0 && (
          <button className="show-all-photos-btn" onClick={() => openLightbox(0)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{marginRight: '6px'}}>
              <circle cx="9" cy="9" r="2"></circle>
              <circle cx="15" cy="9" r="2"></circle>
              <circle cx="9" cy="15" r="2"></circle>
              <circle cx="15" cy="15" r="2"></circle>
            </svg>
            Show all photos
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="gallery-lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <button className="lightbox-nav prev" onClick={prevImage}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={displayImages[lightboxIndex]} 
              alt={`Property image ${lightboxIndex + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              className="lightbox-image"
            />
            <div className="lightbox-counter">
              {lightboxIndex + 1} / {displayImages.length}
            </div>
          </div>
          
          <button className="lightbox-nav next" onClick={nextImage}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
