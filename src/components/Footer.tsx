"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
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
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Left Column: Navigation */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.list}>
              <li><Link href="/properties" className={styles.link}>Properties</Link></li>
              <li><Link href="/owners" className={styles.link}>For Owners</Link></li>
              <li><Link href="/services" className={styles.link}>Services</Link></li>
              <li><Link href="/about" className={styles.link}>About Us</Link></li>
              <li><Link href="/references" className={styles.link}>References</Link></li>
              <li><Link href="/knowledge" className={styles.link}>Knowledge</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact</Link></li>
            </ul>
          </div>

          {/* Middle Column: Newsletter & Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Stay Updated</h4>
            <form className={styles.subscribeForm} onSubmit={handleSubscribe} noValidate>
              <input 
                type="email" 
                placeholder="Your email address" 
                required 
                maxLength={100}
                className={styles.subscribeInput} 
                disabled={subscribing} 
              />
              <button type="submit" className={styles.subscribeBtn} disabled={subscribing}>
                {subscribing ? '...' : subscribed ? 'Done' : 'Subscribe'}
              </button>
            </form>
            {subscribed && <p className={styles.successMsg}>Thank you for subscribing!</p>}

            <div className={styles.contactBlock}>
              <a href="tel:+49691234567" className={styles.phoneLink}>+49 (0) 69 1234 567</a>
              <a href="mailto:inquiry@bossert-immo.de" className={styles.emailLink}>inquiry@bossert-immo.de</a>
            </div>
          </div>

          {/* Right Column: Address & Socials */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Office</h4>
            <div className={styles.addressBlock}>
              <p className={styles.addressText}>Musterstraße 123</p>
              <p className={styles.addressText}>10115 Berlin, Germany</p>
              <p className={styles.hoursText}>Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram" className={styles.socialIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className={styles.socialIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className={styles.socialIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.39-4h-4.2V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className={styles.bottomBar}>
          <div className={styles.copyrightBlock}>
            <span className={styles.footerLogo}>Bossert Immobilien</span>
            <span className={styles.copyrightText}>&copy; {new Date().getFullYear()} Bossert Immobilien. All rights reserved.</span>
          </div>
          <div className={styles.legalLinks}>
            <Link href="#" className={styles.legalLink}>Impressum</Link>
            <Link href="#" className={styles.legalLink}>Datenschutz</Link>
            <Link href="#" className={styles.legalLink}>Cancel Contract</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
