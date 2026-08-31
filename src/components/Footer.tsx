"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { ref: footerRef, isVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setSubscribing(true);
      setTimeout(() => {
        setSubscribing(false);
        setSubscribed(true);
        form.reset();
        setTimeout(() => setSubscribed(false), 3000);
      }, 800);
    } else {
      form.reportValidity();
    }
  };

  return (
    <footer className="site-footer-wrapper" ref={footerRef}>
      <div className="site-footer">
        <div className="footer-grid">
          
          {/* Left Column: Navigation */}
          <div className={`footer-col reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
            <ul className="footer-links">
            <li><Link href="/properties">{t.nav.properties}</Link></li>
            <li><Link href="/owners">{t.nav.forOwners}</Link></li>
            <li><Link href="/services">{t.nav.services}</Link></li>
            <li><Link href="/about">{t.nav.about}</Link></li>
            <li><Link href="/references">{t.nav.references}</Link></li>
            <li><Link href="/knowledge">{t.nav.knowledge}</Link></li>
            <li><Link href="/contact">{t.nav.contact}</Link></li>
            <li style={{ marginTop: '1rem' }}><Link href="#" style={{ opacity: 0.6 }}>{t.nav.cancelContract}</Link></li>
            <li><Link href="#" style={{ opacity: 0.6 }}>{t.footer.privacy}</Link></li>
            <li><Link href="#" style={{ opacity: 0.6 }}>{t.footer.imprint}</Link></li>
          </ul>
          </div>

          {/* Middle Column: Newsletter & Contact */}
          <div className={`footer-col footer-middle-col reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
            <h4 className="footer-col-title">{t.footer.updates}</h4>
            <form className="footer-subscribe-form" onSubmit={handleSubscribe} noValidate>
              <input 
                type="email" 
                placeholder={t.footer.emailPlaceholder} 
                required 
                maxLength={100}
                className="footer-subscribe-input" 
                disabled={subscribing} 
              />
              <button type="submit" className="footer-subscribe-btn" disabled={subscribing}>
                {subscribing ? '...' : subscribed ? t.footer.done : t.footer.subscribe}
              </button>
            </form>
            {subscribed && <p style={{ color: 'var(--bronze)', fontSize: '0.8rem', marginTop: '0.5rem' }}>{t.footer.success}</p>}

            <div className="footer-contact-block">
              <a href="tel:+49691234567" className="footer-phone">+49 (0) 69 1234 567</a>
              <a href="mailto:inquiry@bossert-immo.de" className="footer-email">inquiry@bossert-immo.de</a>
            </div>
          </div>

          {/* Right Column: Address & Socials */}
          <div className={`footer-col footer-right-col reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
            <div className="footer-address">
              <p>{t.footer.address1}</p>
              <p>{t.footer.address2}</p>
              <p className="footer-hours">{t.footer.hours}</p>
            </div>
            <div className="footer-socials">
              <a href="#" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.39-4h-4.2V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            <span className="footer-logo">Bossert Immobilien</span>
            <span>© {new Date().getFullYear()} Bossert Immobilien. All rights reserved.</span>
          </div>
          <div className="footer-credits">
            Created by Bossert
          </div>
        </div>
      </div>
    </footer>
  );
}
