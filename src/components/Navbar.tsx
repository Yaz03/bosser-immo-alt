"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  /** Pass true on light-background pages (e.g. /properties) */
  inverted?: boolean;
  /** Legacy alias — same as inverted */
  invertOnLoad?: boolean;
}

export default function Navbar({ inverted = false, invertOnLoad = false }: NavbarProps) {
  const isInverted = inverted || invertOnLoad;

  const [scrolled, setScrolled]   = useState(false);
  const [hidden,   setHidden]     = useState(false);
  const [open,     setOpen]       = useState(false);
  const [user,     setUser]       = useState<string | null>(null);
  const lastY = useRef(0);

  const pathname  = usePathname();
  const { lang, setLang, t } = useLanguage();

  /* ---- auth ---- */
  useEffect(() => {
    const sync = () => setUser(localStorage.getItem('mockUser'));
    sync();
    window.addEventListener('auth-change', sync);
    return () => window.removeEventListener('auth-change', sync);
  }, []);

  /* ---- scroll ---- */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 280);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---- body lock ---- */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const cls = [
    'b-nav',
    scrolled  ? 'is-scrolled' : '',
    hidden    ? 'is-hidden'   : '',
    isInverted && !scrolled && !open ? 'is-inverted' : '',
  ].filter(Boolean).join(' ');


  const active = (href: string) =>
    pathname === href ? 'b-nav__link is-active' : 'b-nav__link';

  return (
    <>
      {/* ================================================================
          DESKTOP NAV — logo centered, links split L / R
          ================================================================ */}
      <nav className={cls} aria-label="Main navigation">

        {/* LEFT */}
        <div className="b-nav__left">
          {/* Language Switch */}
          <div className="b-nav__lang" style={{ marginRight: 'auto', marginLeft: 0 }}>
            <button
              className={`b-nav__lang-btn${lang === 'en' ? ' is-active' : ''}`}
              onClick={() => setLang('en')}
              aria-label="English"
            >EN</button>
            <span className="b-nav__lang-sep" aria-hidden="true">|</span>
            <button
              className={`b-nav__lang-btn${lang === 'de' ? ' is-active' : ''}`}
              onClick={() => setLang('de')}
              aria-label="Deutsch"
            >DE</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/properties"  className={active('/properties')}>{t.nav.properties}</Link>
            <Link href="/owners"      className={active('/owners')}>{t.nav.forOwners}</Link>
            <Link href="/services"    className={active('/services')}>{t.nav.services}</Link>
          </div>
        </div>

        {/* CENTER — logo */}
        <Link href="/" className="b-nav__logo" aria-label="Bossert Immobilien">
          <img src="/logo.png" alt="Bossert Immobilien" className="b-nav__logo-img" />
        </Link>

        {/* RIGHT */}
        <div className="b-nav__right">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/about"       className={active('/about')}>{t.nav.about}</Link>
            <Link href="/references"  className={active('/references')}>{t.nav.references}</Link>
            <Link href="/knowledge"   className={active('/knowledge')}>{t.nav.knowledge}</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 0 }}>
            <Link href="/contact" className="b-nav__cta">{t.nav.contact}</Link>

            <Link href="/login" className="b-nav__user" aria-label="Account">
              {user ? (
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem' }}>{user}</span>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <rect x="8" y="2" width="8" height="9"/>
                </svg>
              )}
            </Link>

            {/* Mobile — lang inline + hamburger */}
            <div className="b-nav__mobile-lang">
              <button
                className={`b-nav__lang-btn${lang === 'en' ? ' is-active' : ''}`}
                onClick={() => setLang('en')}
              >EN</button>
              <span className="b-nav__lang-sep">|</span>
              <button
                className={`b-nav__lang-btn${lang === 'de' ? ' is-active' : ''}`}
                onClick={() => setLang('de')}
              >DE</button>
            </div>

            <button
              className={`b-nav__hamburger${open ? ' is-open' : ''}`}
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </nav>

      {/* ================================================================
          MOBILE DRAWER
          ================================================================ */}
      <div className={`b-drawer${open ? ' is-open' : ''}`} aria-hidden={!open} data-lenis-prevent>

        <button
          className="b-drawer__close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
            <line x1="18" y1="6"  x2="6"  y2="18"/>
            <line x1="6"  y1="6"  x2="18" y2="18"/>
          </svg>
        </button>

        <nav className="b-drawer__links" aria-label="Mobile navigation">
          {[
            { href: '/properties', label: t.nav.properties },
            { href: '/owners',     label: t.nav.forOwners },
            { href: '/services',   label: t.nav.services },
            { href: '/about',      label: t.nav.about },
            { href: '/references', label: t.nav.references },
            { href: '/knowledge',  label: t.nav.knowledge },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`b-drawer__link${pathname === href ? ' is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="b-drawer__footer">
          <Link href="/contact" className="b-drawer__cta" onClick={() => setOpen(false)}>
            {t.nav.contact}
          </Link>
        </div>
      </div>
    </>
  );
}
