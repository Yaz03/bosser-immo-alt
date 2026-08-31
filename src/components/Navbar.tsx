"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ invertOnLoad = false }: { invertOnLoad?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [userInitial, setUserInitial] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const mockUser = localStorage.getItem('mockUser');
      if (mockUser) {
        setUserInitial(mockUser);
      } else {
        setUserInitial(null);
      }
    };
    checkAuth();
    window.addEventListener('auth-change', checkAuth);
    return () => window.removeEventListener('auth-change', checkAuth);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If we've scrolled past the top
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  const invertClass = invertOnLoad && !isScrolled && !menuOpen ? 'navbar-invert' : '';

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'fixed' : ''} ${isHidden ? 'hidden' : ''} ${invertClass}`}>
        <Link href="/" className="logo">
          <img src="/logo.png" alt="Bossert Immobilien Logo" className="logo-img" />
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links desktop-nav">
          <Link href="/properties" className={`nav-item ${pathname === '/properties' ? 'active' : ''}`}>{t.nav.properties}</Link>
          <Link href="/owners" className={`nav-item ${pathname === '/owners' ? 'active' : ''}`}>{t.nav.forOwners}</Link>
          <Link href="/services" className={`nav-item ${pathname === '/services' ? 'active' : ''}`}>{t.nav.services}</Link>
          <Link href="/about" className={`nav-item ${pathname === '/about' ? 'active' : ''}`}>{t.nav.about}</Link>
          <Link href="/references" className={`nav-item ${pathname === '/references' ? 'active' : ''}`}>{t.nav.references}</Link>
          <Link href="/knowledge" className={`nav-item ${pathname === '/knowledge' ? 'active' : ''}`}>{t.nav.knowledge}</Link>
          
          <div className="lang-toggle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </span>
            <span className="lang-sep">|</span>
            <span 
              className={`lang-btn ${lang === 'de' ? 'active' : ''}`}
              onClick={() => setLang('de')}
            >
              DE
            </span>
          </div>

          <Link href="/contact" className="contact-btn">{t.nav.contact}</Link>
          <Link href="/login" className="login-icon-btn" aria-label="Login">
            {userInitial ? (
              <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-instrument), serif', fontWeight: 400 }}>{userInitial}</span>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
          </Link>
        </div>

        {/* Mobile Right Side: Lang Toggle + Hamburger */}
        <div className="mobile-nav-right">
          <div className="lang-toggle mobile-lang-inline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mobile-lang-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
              onClick={() => setLang('en')}
            >EN</span>
            <span className="lang-divider">|</span>
            <span 
              className={`lang-btn ${lang === 'de' ? 'active' : ''}`} 
              onClick={() => setLang('de')}
            >DE</span>
          </div>

          <button
            className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`} data-lenis-prevent>

        {/* Close button inside drawer */}
        <button
          className="mobile-drawer-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="mobile-nav-links">
          <Link href="/properties" className={`mobile-nav-item ${pathname === '/properties' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{t.nav.properties}</Link>
          <Link href="/owners" className={`mobile-nav-item ${pathname === '/owners' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{t.nav.forOwners}</Link>
          <Link href="/services" className={`mobile-nav-item ${pathname === '/services' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{t.nav.services}</Link>
          <Link href="/about" className={`mobile-nav-item ${pathname === '/about' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{t.nav.about}</Link>
          <Link href="/references" className={`mobile-nav-item ${pathname === '/references' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{t.nav.references}</Link>
          <Link href="/knowledge" className={`mobile-nav-item ${pathname === '/knowledge' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{t.nav.knowledge}</Link>
        </div>
        <div className="mobile-nav-footer">
          <Link href="/contact" className="mobile-contact-btn" onClick={() => setMenuOpen(false)}>{t.nav.contact}</Link>
          <Link href="/login" className="login-icon-btn" aria-label="Login" onClick={() => setMenuOpen(false)} style={{ margin: '0 auto', marginTop: '1rem', border: '1px solid var(--bronze)', color: 'var(--bronze)' }}>
            {userInitial ? (
              <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-instrument), serif', fontWeight: 400 }}>{userInitial}</span>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
