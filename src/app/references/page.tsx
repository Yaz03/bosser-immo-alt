"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedReferenceCurtain from '@/components/FeaturedReferenceCurtain';
import ReferencesMasonryGallery from '@/components/ReferencesMasonryGallery';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export default function ReferencesPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();
  const referencesPageData = (t as any).referencesPageData;

  if (!referencesPageData) return null;

  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      {/* 1. Hero Text */}
      <div className="properties-editorial-hero global-padding" ref={heroRef} style={{ paddingBottom: '2rem' }}>
        <Navbar invertOnLoad={true} />
        
        <div className="inner-page-container" style={{ width: '100%', paddingBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h1 className={`editorial-headline reveal-base reveal-up delay-100 ${heroVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 500px', fontWeight: 500, letterSpacing: '-0.05em' }}>
              {referencesPageData.hero.title} <br/>
              <span className="italic-serif" style={{ fontWeight: 400, letterSpacing: '-0.02em' }}>{referencesPageData.hero.titleSerif}</span>
            </h1>
            <div className={`reveal-base reveal-up delay-200 ${heroVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 300px', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2rem' }}>
              <p className="why-subhead" style={{ maxWidth: '400px', textAlign: 'right' }}>
                {referencesPageData.hero.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Featured Cinematic Reveal */}
      <FeaturedReferenceCurtain data={referencesPageData.featured} />

      {/* 3. 3D Tilt Masonry Gallery */}
      <ReferencesMasonryGallery data={referencesPageData.gallery} />

      <Footer />
    </main>
  );
}
