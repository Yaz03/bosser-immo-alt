"use client";

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ProcessStep {
  name: string;
  desc: string;
}

// Inner component for each step so it reveals individually on scroll
function ProcessStepItem({ step, idx, invertBackground, totalSteps }: { step: ProcessStep, idx: number, invertBackground: boolean, totalSteps: number }) {
  const { ref, isVisible } = useScrollReveal(0.4); // Trigger when 40% into view
  const descColor = invertBackground ? 'rgba(254,252,246,0.7)' : 'rgba(4,36,51,0.7)';
  const borderColor = invertBackground ? 'rgba(254,252,246,0.15)' : 'rgba(4,36,51,0.15)';
  
  return (
    <div ref={ref} style={{ position: 'relative', paddingLeft: '4rem', paddingBottom: idx === totalSteps - 1 ? '0' : '5rem' }}>
      
      {/* Timeline Line */}
      {idx !== totalSteps - 1 && (
        <div style={{
          position: 'absolute',
          left: '11px',
          top: '3rem',
          bottom: '-1rem',
          width: '2px',
          backgroundColor: borderColor,
          zIndex: 0
        }}>
          {/* Animated fill line */}
          <div style={{
            width: '100%',
            height: isVisible ? '100%' : '0%',
            backgroundColor: 'var(--bronze)',
            transition: 'height 1s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '0.2s'
          }} />
        </div>
      )}

      {/* Timeline Node */}
      <div 
        style={{
          position: 'absolute',
          left: '0',
          top: '0.4rem',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: isVisible ? 'var(--bronze)' : (invertBackground ? 'var(--navy)' : 'var(--cream)'),
          border: `2px solid ${isVisible ? 'var(--bronze)' : borderColor}`,
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 1,
          boxShadow: isVisible ? '0 0 20px rgba(181, 143, 98, 0.4)' : 'none',
          transform: isVisible ? 'scale(1.2)' : 'scale(1)'
        }}
      />

      {/* Content */}
      <div className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`} style={{ transitionDelay: '0.1s' }}>
        <div className="italic-serif" style={{ fontSize: '2.5rem', color: 'var(--bronze)', marginBottom: '0.5rem', lineHeight: 1, opacity: 0.6 }}>
          0{idx + 1}
        </div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          {step.name}
        </h3>
        <p style={{ color: descColor, lineHeight: 1.7, fontSize: '1.15rem', margin: 0 }}>
          {step.desc}
        </p>
      </div>
      
    </div>
  );
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

export default function ProcessList({ processData, invertBackground = false }: Props) {
  const { ref, isVisible } = useScrollReveal(0.1);
  
  const bgColor = invertBackground ? 'var(--navy)' : 'var(--cream)';
  const textColor = invertBackground ? 'var(--cream)' : 'var(--navy)';
  const descColor = invertBackground ? 'rgba(254,252,246,0.7)' : 'rgba(4,36,51,0.7)';

  return (
    <section className="global-padding" ref={ref} style={{ backgroundColor: bgColor, color: textColor, paddingTop: '10rem', paddingBottom: '10rem' }}>
      <div className="inner-page-container">
        
        <style>{`
          .timeline-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          @media (min-width: 1024px) {
            .timeline-layout {
              grid-template-columns: 1fr 1.2fr;
              gap: 8rem;
              align-items: start;
            }
          }
        `}</style>
        
        <div className="timeline-layout">
          {/* Left: Sticky Header */}
          <div style={{ position: 'sticky', top: '10rem' }}>
            <div className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
              <p className="services-subtitle" style={{ color: textColor, marginBottom: '1.5rem' }}>
                <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {processData.tag}
              </p>
              <h2 className="explore-headline" style={{ color: textColor, marginBottom: '2rem', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
                {processData.title} <br/>
                <span className="italic-serif">{processData.titleSerif}</span>
              </h2>
              <p style={{ color: descColor, fontSize: '1.25rem', lineHeight: 1.6, maxWidth: '500px' }}>
                {processData.subhead}
              </p>
            </div>
          </div>

          {/* Right: The Timeline Steps */}
          <div style={{ position: 'relative', marginTop: '2rem' }}>
            {processData.steps.map((step, idx) => (
              <ProcessStepItem key={idx} step={step} idx={idx} invertBackground={invertBackground} totalSteps={processData.steps.length} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
