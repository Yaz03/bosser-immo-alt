"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface Pillar {
  title: string;
  description: string;
}

interface Props {
  tag: string;
  title: string;
  titleSerif: string;
  description: string;
  pillars: Pillar[];
  images: string[];
}

export default function HorizontalScrollPhilosophy({ tag, title, titleSerif, description, pillars, images }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerInnerRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const updateMeasurements = () => {
      if (headerInnerRef.current && trackRef.current) {
        const rect = headerInnerRef.current.getBoundingClientRect();
        
        // Dynamically align the track's start and end padding to match the exact 
        // position of the inner-page-container (which caps at 1600px).
        trackRef.current.style.paddingLeft = `${rect.left}px`;
        trackRef.current.style.paddingRight = `${window.innerWidth - rect.right}px`;
        
        // Calculate the maximum distance the track can be translated
        // Because paddingRight dynamically matches the container's right margin,
        // stopping exactly at (scrollWidth - window.innerWidth) ensures the last card 
        // aligns perfectly with the red line (the right margin of the container).
        setMaxScroll(trackRef.current.scrollWidth - window.innerWidth);
      }
    };
    
    // Initial measurement after a tiny timeout to ensure styles are applied
    setTimeout(updateMeasurements, 50);
    
    // Recalculate on resize
    window.addEventListener('resize', updateMeasurements);
    return () => window.removeEventListener('resize', updateMeasurements);
  }, [pillars]); // re-run if data changes

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // The total scrollable distance of the container
      const scrollableDistance = rect.height - window.innerHeight;
      
      // How far the top of the container has scrolled past the top of the viewport
      const scrolledInto = -rect.top;
      
      let p = scrolledInto / scrollableDistance;
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef} 
      style={{ 
        height: '400vh', 
        position: 'relative', 
        backgroundColor: 'var(--cream)' 
      }}
    >
      <div 
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'column', 
          paddingTop: '6rem',
          paddingBottom: '4rem'
        }}
      >
        
        {/* Header - Stays fixed */}
        <div className="global-padding" style={{ flexShrink: 0, marginBottom: '4rem' }}>
          <div ref={headerInnerRef} className="inner-page-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '3rem' }}>
            <div>
              <p className="services-subtitle">
                 <span className="dot"></span> {tag}
              </p>
              <h2 className="explore-headline" style={{ marginTop: '1rem' }}>
                {title} <br /> <span className="italic-serif">{titleSerif}</span>
              </h2>
            </div>
            <div style={{ flex: '0 1 auto', width: '100%', maxWidth: '420px', paddingBottom: '1rem', textAlign: 'left' }}>
              <p className="why-subhead" style={{ lineHeight: 1.6 }}>{description}</p>
            </div>
          </div>
        </div>

        {/* Horizontal Track Wrapper - Centers the track vertically in remaining space */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          {/* The Sliding Track */}
          <div 
            ref={trackRef}
            style={{ 
              display: 'flex', 
              gap: '2rem', 
              width: 'max-content',
              transform: `translate3d(-${progress * maxScroll}px, 0, 0)`,
              willChange: 'transform' // GPU acceleration for smooth scrub
            }}
          >
            {pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                style={{ 
                  width: '85vw', 
                  maxWidth: '900px', 
                  height: '50vh', 
                  maxHeight: '450px',
                  minHeight: '350px',
                  display: 'flex', 
                  backgroundColor: 'var(--white)',
                  border: '1px solid rgba(4,36,51,0.05)',
                  borderRadius: '12px',
                  overflow: 'hidden' 
                }}
              >
                {/* Left: Image (45%) */}
                <div style={{ position: 'relative', flex: '0 0 45%', padding: '1rem' }}>
                  <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '6px', overflow: 'hidden' }}>
                    <Image 
                      src={images[idx % images.length]} 
                      alt={pillar.title} 
                      fill 
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
                
                {/* Right: Text Content (55%) */}
                <div style={{ flex: '0 0 55%', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="italic-serif" style={{ fontFamily: 'var(--font-instrument), serif', fontSize: '5.5rem', color: 'rgba(4,36,51,0.1)', fontStyle: 'italic', lineHeight: 1, marginBottom: '2rem' }}>
                    0{idx + 1}
                  </div>
                  <h3 className="explore-headline" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 500, letterSpacing: '-0.05em' }}>
                    {pillar.title}
                  </h3>
                  <p className="why-subhead" style={{ lineHeight: '1.8', fontSize: '1.05rem', color: 'rgba(4,36,51,0.7)' }}>
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
