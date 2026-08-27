"use client";

import React from 'react';
import Navbar from './Navbar';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function PropertiesHero() {
  const { ref: heroRef, isVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();

  return (
    <div className="properties-editorial-hero" ref={heroRef}>
      <Navbar invertOnLoad={true} />
      
      <div className="editorial-hero-content">
        <div className="editorial-hero-middle">
          <h1 className={`editorial-headline reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
            {t.propertiesPage.heroHeadline} <span className="italic-serif">{t.propertiesPage.heroHeadlineSerif}</span>
          </h1>
        </div>
        
        <div className="editorial-hero-bottom">
           <p className={`editorial-subhead reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
              {t.propertiesPage.heroSubhead}
           </p>
        </div>
      </div>
    </div>
  );
}
