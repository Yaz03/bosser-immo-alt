"use client";

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CtaSection from '@/components/CtaSection';
import ProcessList from '@/components/ProcessList';
import ValuationGrid from '@/components/ValuationGrid';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function OwnersPage() {
  const { t } = useLanguage();
  const { ref: narrativeRef, isVisible: narrativeVisible } = useScrollReveal();
  const { ref: pillarsRef } = useScrollReveal(0.2);

  // Staggered reveal for pillars
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const elements = document.querySelectorAll('.pillar-reveal');
    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar invertOnLoad={true} />
      
      {/* 1. Hero Section */}
      <section className="global-padding" style={{ paddingTop: '15rem', paddingBottom: '8rem' }}>
        <div className="inner-page-container reveal-base reveal-up is-revealed" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 500px' }}>
            <p className="services-subtitle" style={{ marginBottom: '1.5rem' }}>
              <span className="dot"></span> {t.owners.hero.tag}
            </p>
            <h1 className="editorial-headline" style={{ marginBottom: '2rem' }}>
              {t.owners.hero.title} <br/>
              <span className="italic-serif">{t.owners.hero.titleSerif}</span>
            </h1>
            <p style={{ fontSize: '1.5rem', color: 'rgba(4,36,51,0.7)', maxWidth: '600px', lineHeight: 1.6 }}>
              {t.owners.hero.subhead}
            </p>
          </div>
          
          <div style={{ flex: '1 1 400px' }}>
            {/* Corner Magic Image */}
            <div style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 20px 60px rgba(4,36,51,0.08)', transform: 'rotate(2deg)' }}>
              <div style={{ width: '100%', aspectRatio: '3/4', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                <img src="/images/owners_editorial.jpg" alt="Editorial property view" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Narrative (The Problem) */}
      <section className="global-padding" ref={narrativeRef} style={{ paddingTop: '8rem', paddingBottom: '12rem' }}>
        <div className={`inner-page-container reveal-base reveal-up ${narrativeVisible ? 'is-revealed' : ''}`} style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          
          {/* Left Accent */}
          <div style={{ flex: '1 1 200px', borderTop: '2px solid var(--bronze)', paddingTop: '1.5rem', maxWidth: '300px' }}>
            <p className="services-subtitle" style={{ color: 'var(--bronze)' }}>
              {t.owners.narrative.tag}
            </p>
          </div>
          
          {/* Main Text */}
          <div style={{ flex: '1 1 600px' }}>
            <h2 className="why-subhead" style={{ fontSize: '3rem', lineHeight: 1.3, fontWeight: 300, color: 'var(--navy)', letterSpacing: '-0.02em', marginBottom: '2rem' }}>
              {t.owners.narrative.headline}
            </h2>
            <p style={{ fontSize: '1.4rem', color: 'rgba(4,36,51,0.7)', lineHeight: 1.6, maxWidth: '700px' }}>
              {t.owners.narrative.body}
            </p>
          </div>
          
        </div>
      </section>

      {/* 3. The Pillars */}
      <section className="global-padding" ref={pillarsRef} style={{ paddingBottom: '12rem' }}>
        <div className="inner-page-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          {t.owners.pillars.map((pillar: {title: string, desc: string}, idx: number) => (
            <div key={idx} className="pillar-reveal reveal-base reveal-up" style={{ flex: '1 1 300px', transitionDelay: `${idx * 150}ms` }}>
              <div className="pillar-card">
                <h3 style={{ fontSize: '1.75rem', fontWeight: 500, marginBottom: '1.5rem', color: 'var(--navy)' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '1.1rem', color: 'rgba(4,36,51,0.7)', lineHeight: 1.6 }}>
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. The Selling Process */}
      <ProcessList processData={t.owners.selling} imagePath="/images/owners_cream.jpg" />

      {/* 5. The Renting Process (Inverted) */}
      <ProcessList processData={t.owners.renting} invertBackground={true} imagePath="/images/prop_apartment_new.jpg" />

      {/* 6. The Valuation Grid */}
      <ValuationGrid valuationData={t.owners.valuation} />

      {/* 7. The CTA */}
      <CtaSection />

      <Footer />
    </main>
  );
}
