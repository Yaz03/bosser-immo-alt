"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main style={{ backgroundColor: 'var(--navy)', color: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <section style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '2rem', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        
        {/* Animated Background Image */}
        <div style={{ position: 'absolute', top: '-5%', left: '-5%', right: '-5%', bottom: '-5%', zIndex: 0 }}>
          <img 
            src="/test_bg_estate.jpg" 
            alt="Background" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              opacity: 0.15,
              transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px) scale(1.05)`,
              transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
            }} 
          />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, var(--navy) 0%, rgba(4,36,51,0.6) 100%)' }}></div>
        </div>

        {/* Massive 404 Background Graphic */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px))`,
          fontSize: '40vw',
          fontFamily: 'var(--font-instrument)',
          fontWeight: 400,
          color: 'transparent',
          WebkitTextStroke: '2px rgba(255,255,255,0.12)',
          whiteSpace: 'nowrap',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
          transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
        }}>
          404
        </div>

        <div className="inner-page-container reveal-base reveal-up is-revealed" style={{ 
          position: 'relative', 
          zIndex: 2, 
          textAlign: 'center', 
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ height: '1px', width: '40px', backgroundColor: 'var(--bronze)' }}></span>
            <p className="services-subtitle" style={{ color: 'var(--bronze)', margin: 0 }}>
              404 ERROR
            </p>
            <span style={{ height: '1px', width: '40px', backgroundColor: 'var(--bronze)' }}></span>
          </div>
          
          <h1 className="editorial-headline" style={{ color: 'var(--white)', fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 1.1, margin: 0 }}>
            Lost in the <br/><span className="italic-serif">Architecture.</span>
          </h1>
          
          <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.7)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
            Even the most exquisite properties can't be found sometimes. The page you are looking for has been moved or no longer exists.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/" className="explore-btn" style={{ 
              backgroundColor: 'var(--white)', 
              color: 'var(--navy)', 
              display: 'inline-flex', 
              padding: '1.2rem 2.5rem',
              borderRadius: '100px',
              fontSize: '1rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              alignItems: 'center',
              gap: '1rem',
              textDecoration: 'none'
            }}>
              Return Home
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </Link>

            <Link href="/properties" className="explore-btn" style={{ 
              backgroundColor: 'transparent', 
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'var(--white)', 
              display: 'inline-flex', 
              padding: '1.2rem 2.5rem',
              borderRadius: '100px',
              fontSize: '1rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              alignItems: 'center',
              gap: '1rem',
              textDecoration: 'none'
            }}>
              View Properties
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
