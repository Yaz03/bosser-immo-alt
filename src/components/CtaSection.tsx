'use client';

import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function CtaSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.2);
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity()) {
      setStatus('submitting');
      // Simulate API call
      setTimeout(() => {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      }, 1000);
    } else {
      form.reportValidity();
    }
  };

  return (
    <section className="cta-section" ref={sectionRef}>
      {/* Left Column: Portrait Image */}
      <div className={`cta-image-col reveal-base reveal-scale ${isVisible ? 'is-revealed' : ''}`}></div>

      {/* Right Column: Form Block */}
      <div className="cta-form-col">
        <div className={`cta-form-container reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
          <h2 className="cta-headline">
            {t.cta.headline}<br/>
            <span className="italic-serif">{t.cta.headlineSerif}</span>
          </h2>
          <p className="cta-subhead">
            {t.cta.subhead}
          </p>
          
          <form className="cta-form" onSubmit={handleSubmit} noValidate>
            <div className="cta-form-row">
              <div className="cta-input-group">
                <input 
                  type="text" 
                  id="name" 
                  placeholder={t.cta.namePlaceholder} 
                  className="cta-input" 
                  required 
                  minLength={2} 
                  maxLength={50}
                  pattern="^[A-Za-zÀ-ÖØ-öø-ÿ\s\-\']+$"
                  title="Please enter a valid name (letters only)."
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[0-9]/g, '');
                  }}
                />
              </div>
              <div className="cta-input-group">
                <input 
                  type="email" 
                  id="email" 
                  placeholder={t.cta.emailPlaceholder} 
                  className="cta-input" 
                  required 
                  maxLength={100} 
                />
              </div>
            </div>
            
            <div className="cta-input-group">
              <textarea 
                id="message" 
                placeholder={t.cta.msgPlaceholder} 
                className="cta-textarea" 
                required 
                minLength={10}
                maxLength={1000}
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="explore-btn explore-btn-dark cta-submit-margin"
              disabled={status === 'submitting'}
              style={{ opacity: status === 'submitting' ? 0.7 : 1 }}
            >
              {status === 'idle' && t.cta.btnIdle}
              {status === 'submitting' && t.cta.btnSending}
              {status === 'success' && t.cta.btnSent}
              {status === 'idle' && (
                <div className="explore-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              )}
            </button>
            {status === 'success' && (
              <p style={{ color: 'var(--bronze)', marginTop: '1rem', fontSize: '0.85rem' }}>
                {t.cta.success}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
