"use client";

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function NewsletterParallax() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section 
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '70vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* CSS-based Parallax Background */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/test_bg_villa.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 0
        }}
      />

      {/* Dark Overlay for Readability */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(4,36,51,0.6)',
          zIndex: 1
        }}
      />

      {/* Content Container (Glassmorphism) */}
      <div 
        className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}
        style={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'rgba(4,36,51,0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px',
          padding: '5rem 4rem',
          maxWidth: '800px',
          width: '90%',
          textAlign: 'center',
          color: 'var(--white)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
        }}
      >
        <span className="services-subtitle" style={{ color: 'var(--bronze)', justifyContent: 'center', marginBottom: '1.5rem', letterSpacing: '2px' }}>
          <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> 
          STAY INFORMED
        </span>
        
        <h2 className="italic-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          Market Intelligence.
        </h2>
        
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem auto' }}>
          Subscribe to receive expert real estate knowledge, exclusive off-market trends, and our latest property updates directly to your inbox.
        </p>
        
        <form 
          onSubmit={(e) => e.preventDefault()} 
          style={{
            display: 'flex',
            maxWidth: '500px',
            margin: '0 auto',
            position: 'relative'
          }}
        >
          <input 
            type="email" 
            placeholder="Your email address" 
            required
            style={{
              width: '100%',
              padding: '1.2rem 1.5rem',
              paddingRight: '4rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '100px',
              color: 'var(--white)',
              fontSize: '1rem',
              outline: 'none',
              fontFamily: 'var(--font-inter)'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--bronze)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
          />
          <button 
            type="submit"
            style={{
              position: 'absolute',
              right: '8px',
              top: '8px',
              bottom: '8px',
              width: '44px',
              backgroundColor: 'var(--white)',
              color: 'var(--navy)',
              border: 'none',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, background-color 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bronze)';
              e.currentTarget.style.color = 'var(--white)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--white)';
              e.currentTarget.style.color = 'var(--navy)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
