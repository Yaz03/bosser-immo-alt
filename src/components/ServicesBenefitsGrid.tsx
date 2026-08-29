"use client";

import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Benefit {
  title: string;
  desc: string;
}

interface Props {
  data: {
    tag: string;
    title: string;
    titleSerif: string;
    subhead: string;
    list: Benefit[];
  };
}

// Map of subtle icons for the benefits
const icons = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, // Shield
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>, // Info
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, // Value/Money
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, // Time
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>, // Transparent/Eye
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> // Box/Add-ons
];

export default function ServicesBenefitsGrid({ data }: Props) {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll('.benefit-card-spotlight');
    for (const card of Array.from(cards)) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <section className="global-padding" ref={ref} style={{ backgroundColor: 'var(--navy)', color: 'var(--white)', paddingTop: '10rem', paddingBottom: '10rem', position: 'relative', overflow: 'hidden' }}>
      
      <style>{`
        @keyframes floatIcon {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        .benefit-card-spotlight {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          padding: 3rem 2rem;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        /* Glowing border mask trick */
        .benefit-card-spotlight::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y),
            rgba(200, 160, 110, 0.5),
            transparent 40%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }
        /* Inner glowing background */
        .benefit-card-spotlight::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(200, 160, 110, 0.08),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 0;
        }
        /* When hovering the grid container, illuminate all cards slightly based on proximity */
        .benefit-grid-container:hover .benefit-card-spotlight::before,
        .benefit-grid-container:hover .benefit-card-spotlight::after {
          opacity: 1;
        }
        .benefit-card-spotlight:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          background: rgba(255, 255, 255, 0.03);
        }
        .benefit-icon-container {
          animation: floatIcon 4s ease-in-out infinite;
        }
        /* Stagger icon animation delays slightly so they don't move in exact unison */
        .benefit-card-spotlight:nth-child(even) .benefit-icon-container {
          animation-delay: 1s;
        }
        .benefit-card-spotlight:nth-child(3n) .benefit-icon-container {
          animation-delay: 2s;
        }
        .benefit-card-spotlight:hover .benefit-icon-container {
          transform: scale(1.1) rotate(5deg);
          background: rgba(200, 160, 110, 0.2) !important;
          animation: none; /* Pause float on hover */
        }
      `}</style>

      {/* Abstract Glowing Background */}
      <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(200, 160, 110, 0.08) 0%, rgba(4,36,51,0) 70%)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(200, 160, 110, 0.05) 0%, rgba(4,36,51,0) 70%)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0 }}></div>

      <div className="inner-page-container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Header */}
        <div className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`} style={{ marginBottom: '6rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto 6rem auto' }}>
          <p className="services-subtitle" style={{ color: 'var(--white)', marginBottom: '1.5rem', justifyContent: 'center' }}>
            <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {data.tag}
          </p>
          <h2 className="explore-headline" style={{ color: 'var(--white)', marginBottom: '1.5rem', justifyContent: 'center' }}>
            {data.title} <br/>
            <span className="italic-serif">{data.titleSerif}</span>
          </h2>
          <p style={{ color: 'rgba(254,252,246,0.7)', fontSize: '1.2rem', lineHeight: 1.6 }}>
            {data.subhead}
          </p>
        </div>

        {/* Dynamic Spotlight Glassmorphism Grid */}
        <div 
          className="benefit-grid-container"
          onMouseMove={handleMouseMove}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}
        >
          {data.list.map((benefit, idx) => (
            <div 
              key={idx} 
              className={`benefit-card-spotlight reveal-base reveal-up delay-${(idx + 1) * 100} ${isVisible ? 'is-revealed' : ''}`}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              
              {/* Content Container (elevated above pseudo elements) */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Icon Container */}
                <div 
                  className="benefit-icon-container"
                  style={{ 
                    width: '56px', 
                    height: '56px', 
                    borderRadius: '12px', 
                    background: 'rgba(200, 160, 110, 0.1)',
                    border: '1px solid rgba(200, 160, 110, 0.2)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '2rem',
                    color: 'var(--bronze)',
                    transition: 'all 0.5s ease',
                  }}
                >
                  {icons[idx % icons.length]}
                </div>
                
                <h3 style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: 500, 
                  marginBottom: '1rem', 
                  color: 'var(--white)',
                  transition: 'color 0.3s ease'
                }}>
                  {benefit.title}
                </h3>
                
                <p style={{ 
                  color: 'rgba(254,252,246,0.6)', 
                  lineHeight: 1.7, 
                  fontSize: '1rem',
                  transition: 'color 0.3s ease',
                }}>
                  {benefit.desc}
                </p>
                
                {/* Decorative Accent Line */}
                <div style={{
                  position: 'absolute',
                  bottom: '-3rem', // pushed down to bottom edge of padding
                  left: '-2rem',
                  height: '3px',
                  width: hoveredCard === idx ? 'calc(100% + 4rem)' : '0%',
                  background: 'linear-gradient(90deg, transparent, var(--bronze), transparent)',
                  transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: 0.8
                }}></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
