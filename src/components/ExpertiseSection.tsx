"use client";

import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function ExpertiseSection() {
  const { ref, isVisible } = useScrollReveal(0.2);
  const { t } = useLanguage();

  return (
    <section className="expertise-section" ref={ref}>
      <div className="expertise-container">
        
        <h2 className={`expertise-headline reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
          {t.servicesSection.headline}
        </h2>

        <div className={`expertise-grid reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
          
          <div className="expertise-card">
            <h3 className="expertise-title">{t.servicesSection.service1Title}</h3>
            <p className="expertise-desc">{t.servicesSection.service1Desc}</p>
          </div>
          
          <div className="expertise-card">
            <h3 className="expertise-title">{t.servicesSection.service2Title}</h3>
            <p className="expertise-desc">{t.servicesSection.service2Desc}</p>
          </div>
          
          <div className="expertise-card">
            <h3 className="expertise-title">{t.servicesSection.service3Title}</h3>
            <p className="expertise-desc">{t.servicesSection.service3Desc}</p>
          </div>

        </div>
      </div>
    </section>
  );
}
