"use client";

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Benefit {
  title: string;
  desc: string;
}

interface Step {
  title: string;
  desc: string;
}

interface Props {
  valuationData: {
    tag: string;
    title: string;
    titleSerif: string;
    subhead: string;
    benefits: Benefit[];
    steps: Step[];
  };
}

export default function ValuationGrid({ valuationData }: Props) {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="global-padding" ref={ref} style={{ backgroundColor: 'var(--navy)', color: 'var(--white)', paddingTop: '10rem', paddingBottom: '10rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Cinematic Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(4,36,51,0.85)', zIndex: 1 }}></div>
        <img src="/images/owners_bg_wide.jpg" alt="Architecture" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
      </div>

      <div className="inner-page-container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Header */}
        <div className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`} style={{ marginBottom: '6rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto 6rem auto' }}>
          <p className="services-subtitle" style={{ color: 'var(--white)', marginBottom: '1.5rem', justifyContent: 'center' }}>
            <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {valuationData.tag}
          </p>
          <h2 className="explore-headline" style={{ color: 'var(--white)', marginBottom: '1.5rem', justifyContent: 'center' }}>
            {valuationData.title} <br/>
            <span className="italic-serif">{valuationData.titleSerif}</span>
          </h2>
          <p style={{ color: 'rgba(254,252,246,0.7)', fontSize: '1.2rem', lineHeight: 1.6 }}>
            {valuationData.subhead}
          </p>
        </div>

        {/* Benefits Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '8rem' }}>
          {valuationData.benefits.map((benefit, idx) => (
            <div key={idx} className={`reveal-base reveal-up delay-${(idx + 1) * 100} ${isVisible ? 'is-revealed' : ''}`}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--bronze)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--bronze)', borderRadius: '50%' }}></div>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.75rem', color: 'var(--white)' }}>
                {benefit.title}
              </h3>
              <p style={{ color: 'rgba(254,252,246,0.7)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Steps */}
        <div style={{ borderTop: '1px solid rgba(254,252,246,0.1)', paddingTop: '4rem', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          {valuationData.steps.map((step, idx) => (
            <div key={idx} className={`reveal-base reveal-up delay-${(idx + 3) * 100} ${isVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 300px' }}>
              <p className="services-subtitle" style={{ color: 'var(--bronze)', marginBottom: '1rem' }}>
                {step.title.split('.')[0]}.
              </p>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.75rem', color: 'var(--white)' }}>
                {step.title.split('.')[1]}
              </h4>
              <p style={{ color: 'rgba(254,252,246,0.7)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
