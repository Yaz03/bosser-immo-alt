"use client";

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ProcessStep {
  name: string;
  desc: string;
}

interface Props {
  processData: {
    tag: string;
    title: string;
    titleSerif: string;
    subhead: string;
    steps: ProcessStep[];
  };
  invertBackground?: boolean;
  imagePath?: string;
}

export default function ProcessList({ processData, invertBackground = false, imagePath }: Props) {
  const { ref, isVisible } = useScrollReveal(0.2);
  
  const bgColor = invertBackground ? 'var(--navy)' : 'var(--cream)';
  const textColor = invertBackground ? 'var(--cream)' : 'var(--navy)';
  const descColor = invertBackground ? 'rgba(254,252,246,0.7)' : 'rgba(4,36,51,0.7)';

  return (
    <section className="global-padding" ref={ref} style={{ backgroundColor: bgColor, color: textColor, paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="inner-page-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '6rem' }}>
        
        {/* Left: Sticky Header */}
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ position: 'sticky', top: '10rem' }} className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
            <p className="services-subtitle" style={{ color: textColor, marginBottom: '1.5rem' }}>
              <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {processData.tag}
            </p>
            <h2 className="explore-headline" style={{ color: textColor, marginBottom: '2rem' }}>
              {processData.title} <br/>
              <span className="italic-serif">{processData.titleSerif}</span>
            </h2>
            <p style={{ color: descColor, fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '400px' }}>
              {processData.subhead}
            </p>
            
            {imagePath && (
              <div style={{ marginTop: '4rem', width: '100%', maxWidth: '350px', aspectRatio: '3/4', position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                <img src={imagePath} alt="Process visual" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
        </div>

        {/* Right: The Steps */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {processData.steps.map((step, idx) => (
            <div key={idx} className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`} style={{ transitionDelay: `${(idx + 2) * 100}ms` }}>
              <div style={{ display: 'flex', gap: '2rem', borderTop: `1px solid ${invertBackground ? 'rgba(254,252,246,0.1)' : 'rgba(4,36,51,0.1)'}`, paddingTop: '2rem' }}>
                <div className="italic-serif" style={{ fontSize: '2rem', color: 'var(--bronze)', minWidth: '40px' }}>
                  0{idx + 1}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                    {step.name}
                  </h3>
                  <p style={{ color: descColor, lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
