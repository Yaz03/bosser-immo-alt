"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface Pillar {
  title: string;
  description: string;
}

interface Props {
  data: {
    tag: string;
    title: string;
    titleSerif: string;
    description: string;
    pillars: Pillar[];
  };
  images: string[];
}

export default function ServicesOverviewCards({ data, images }: Props) {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={containerRef}
      className="global-padding"
      style={{
        backgroundColor: 'var(--cream)',
        paddingTop: '10rem',
        paddingBottom: '10rem',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="inner-page-container">
        
        {/* Header */}
        <div style={{ marginBottom: '6rem', maxWidth: '600px' }}>
          <p className="services-subtitle">
            <span className="dot"></span> {data.tag}
          </p>
          <h2 className="explore-headline" style={{ marginTop: '1rem', fontSize: '3.5rem' }}>
            {data.title} <br />
            <span className="italic-serif">{data.titleSerif}</span>
          </h2>
          <p className="why-subhead" style={{ marginTop: '1.5rem', fontSize: '1.2rem' }}>
            {data.description}
          </p>
        </div>

        {/* Sticky Stacking Cards */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '5vh', paddingBottom: '10vh' }}>
          {data.pillars.map((pillar, idx) => {
            return (
              <div
                key={idx}
                style={{
                  position: 'sticky',
                  top: `calc(15vh + ${idx * 40}px)`,
                  height: '60vh',
                  minHeight: '450px',
                  backgroundColor: 'var(--white)',
                  borderRadius: '24px',
                  boxShadow: '0 -20px 50px rgba(4,36,51,0.08)',
                  border: '1px solid rgba(4,36,51,0.05)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'stretch',
                  zIndex: idx + 1,
                  willChange: 'transform' // Smooth scrolling optimization
                }}
              >
                {/* Text Side (Left) */}
                <div style={{ flex: '1 1 50%', padding: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2, backgroundColor: 'var(--white)' }}>
                  <div className="italic-serif" style={{ fontSize: '8rem', color: 'rgba(4,36,51,0.03)', lineHeight: 0.8, marginBottom: '1rem', marginLeft: '-0.5rem' }}>
                    0{idx + 1}
                  </div>
                  <h3 className="explore-headline" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
                    {pillar.title}
                  </h3>
                  <p className="why-subhead" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(4,36,51,0.7)', maxWidth: '90%' }}>
                    {pillar.description}
                  </p>
                </div>

                {/* Image Side (Right) */}
                <div style={{ flex: '1 1 50%', position: 'relative' }}>
                  <Image 
                    src={images[idx % images.length]} 
                    alt={pillar.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Subtle Gradient Overlay for blend effect */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 25%)' }}></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
