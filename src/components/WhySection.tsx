"use client";

import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function WhySection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.3);
  const { t } = useLanguage();

  return (
    <section className="why-section" ref={sectionRef}>
      <div className="why-container">
        
        {/* Left Column: Sticky Headline */}
        <div className="why-left-col">
          <div className="why-header-sticky">
            <p className={`services-subtitle reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`} style={{ marginBottom: '1rem' }}>
              <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {t.why.tag}
            </p>
            <h2 className={`why-headline reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
              {t.why.headline} <br /><span className="italic-serif">{t.why.headlineSerif}</span>
            </h2>
            <p className={`why-subhead reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
              {t.why.desc1}
            </p>
            <div className={`why-editorial-phrase reveal-base reveal-up delay-300 ${isVisible ? 'is-revealed' : ''}`} style={{ marginTop: '1rem' }}>
              {t.why.desc2}
            </div>
          </div>
        </div>

        {/* Right Column: Numbers & Philosophy */}
        <div className="why-right-col">
          
          <div className="why-stat-block">
            <div className={`why-stat-number reveal-base reveal-scale delay-100 ${isVisible ? 'is-revealed' : ''}`}>€1.2B</div>
            <div className={`why-stat-text reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
              {t.why.stat1}
            </div>
          </div>
          
          <div className="why-stat-block">
            <div className={`why-stat-number reveal-base reveal-scale delay-200 ${isVisible ? 'is-revealed' : ''}`}>0%</div>
            <div className={`why-stat-text reveal-base reveal-up delay-300 ${isVisible ? 'is-revealed' : ''}`}>
              {t.why.stat2}
            </div>
          </div>
          
          <div className="why-stat-block">
            <div className={`why-stat-number reveal-base reveal-scale delay-300 ${isVisible ? 'is-revealed' : ''}`}>14</div>
            <div className={`why-stat-text reveal-base reveal-up delay-400 ${isVisible ? 'is-revealed' : ''}`}>
              {t.why.stat3}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
