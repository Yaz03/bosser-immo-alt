"use client";

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Stat {
  number: string;
  label: string;
}

interface Props {
  stats: Stat[];
}

export default function AboutStats({ stats }: Props) {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section 
      className="global-padding" 
      ref={ref} 
      style={{ 
        backgroundColor: 'var(--navy)', 
        paddingTop: '8rem', 
        paddingBottom: '8rem',
        color: 'var(--white)'
      }}
    >
      <div className="inner-page-container">
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '4rem', 
            alignItems: 'center' 
          }}
        >
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}
              style={{ 
                transitionDelay: `${idx * 150}ms`,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                borderLeft: '1px solid rgba(254, 252, 246, 0.1)',
                paddingLeft: '2rem'
              }}
            >
              <div 
                className="italic-serif" 
                style={{ 
                  fontSize: '5rem', 
                  lineHeight: 1, 
                  color: 'var(--cream)' 
                }}
              >
                {stat.number}
              </div>
              <div 
                className="services-subtitle" 
                style={{ 
                  color: 'var(--bronze)', 
                  margin: 0 
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
