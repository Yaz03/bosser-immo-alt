"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './AboutSection.module.css';



export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll listener for sticky timeline animation
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = sectionRef.current.offsetHeight;
      
      const scrollableDistance = sectionHeight - windowHeight;
      
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const progress = Math.abs(rect.top) / scrollableDistance;
        setScrollProgress(progress);
      } else if (rect.top > 0) {
        setScrollProgress(0); // Before pin
      } else if (rect.bottom < windowHeight) {
        setScrollProgress(1); // After pin
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // --- Refined Animation Timeline (over 300vh) ---
  // 0.0 to 0.10: Initial pause.
  // 0.10 to 0.30: Background image fades in smoothly.
  // 0.30 to 0.40: Text rises 80px from below and fades in.
  // 0.40 to 0.80: Text holds perfectly still — long dwell for reading.
  // 0.80 to 0.95: Text fades out and rises 80px upward.
  // 0.80 to 1.00: Image zooms in slowly.
  
  let bgOpacity = 0;
  let bgScale = 1;

  // 1. Background fade in
  if (scrollProgress > 0.10 && scrollProgress <= 0.30) {
    const normalized = (scrollProgress - 0.10) / 0.20;
    bgOpacity = normalized * 0.9;
  } else if (scrollProgress > 0.30) {
    bgOpacity = 0.9;
  }

  // 2. Text fade in and fade out
  let textOpacity = 0;
  let textTranslate = 80;
  
  if (scrollProgress > 0.30 && scrollProgress <= 0.40) {
    // Fade IN
    const normalized = (scrollProgress - 0.30) / 0.10;
    textOpacity = normalized;
    textTranslate = 80 * (1 - normalized);
  } else if (scrollProgress > 0.40 && scrollProgress <= 0.80) {
    // HOLD
    textOpacity = 1;
    textTranslate = 0;
  } else if (scrollProgress > 0.80 && scrollProgress <= 0.95) {
    // Fade OUT
    const normalized = (scrollProgress - 0.80) / 0.15;
    textOpacity = 1 - normalized;
    textTranslate = -(normalized * 80);
  } else if (scrollProgress > 0.95) {
    textOpacity = 0;
    textTranslate = -80;
  }

  // 3. Smooth zoom at the very end
  if (scrollProgress > 0.80) {
    const normalized = Math.min((scrollProgress - 0.80) / 0.20, 1);
    const easeInOutQuad = normalized < 0.5 ? 2 * normalized * normalized : 1 - Math.pow(-2 * normalized + 2, 2) / 2;
    bgScale = 1 + (easeInOutQuad * 10);
  }

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.stickyWrapper}>
        <div className={styles.bgWrapper}>
          <img 
            src="/aboutbg.png" 
            alt="Building sketch background" 
            className={styles.bgImage} 
            style={{ 
              opacity: bgOpacity,
              transform: `scale(${bgScale})`,
              transformOrigin: '50% 65%'
            }}
          />
        </div>

        {/* ABOUT TEXT (Tied strictly to scrollProgress) */}
        <div 
          className={styles.content}
          style={{ opacity: textOpacity, transform: `translateY(${textTranslate}px)`, pointerEvents: textOpacity === 0 ? 'none' : 'auto' }}
        >
          <p className={styles.eyebrow}>Expertise & Trust</p>
          <h2 className={styles.headline}>
            Comprehensive Property Solutions<br />
            from initial consultation to successful closing
          </h2>
          <p className={styles.subtext}>
            Whether you're buying, selling, or seeking a valuation,<br/>
            we support you with tailored strategies, personalized guidance,<br/>
            and in-depth market expertise.
          </p>
          <button className={styles.ctaButton}>
            Request a free consultation
          </button>
        </div>
      </div>
    </section>
  );
}
