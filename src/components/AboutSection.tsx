"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './AboutSection.module.css';

const services = [
  {
    id: 1,
    title: "Brokerage and Advisory",
    description: "We provide expert support for property sales, rentals, and all real estate matters — delivered with professionalism, foresight, and a personalized approach.",
    image: "/service-brokerage.jpg"
  },
  {
    id: 2,
    title: "Valuation and Reports",
    description: "Accurate, data-driven valuations and detailed property reports to ensure you make the most informed real estate decisions.",
    image: "/service-valuation.jpg"
  },
  {
    id: 3,
    title: "Additional Service",
    description: "Tailored architectural planning, project management, and specialized consulting to elevate your real estate portfolio.",
    image: "/service-additional.jpg"
  }
];

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

  // --- Refined Animation Timeline (over 800vh) ---
  // 0.0 to 0.08: Initial pause.
  // 0.08 to 0.22: Background image fades in smoothly.
  // 0.22 to 0.32: Text rises 80px from below and fades in.
  // 0.32 to 0.48: Text holds perfectly still — long dwell for reading.
  // 0.48 to 0.56: Text fades out and rises 80px upward.
  // 0.50 to 0.78: Image zooms in slowly (overlaps with text exit for cinematic feel).
  // 0.80 to 0.92: Services fade in over the zoomed background.
  
  let bgOpacity = 0;
  let bgScale = 1;

  // 1. Background fade in (0.08 → 0.22)
  if (scrollProgress > 0.08 && scrollProgress <= 0.22) {
    const normalized = (scrollProgress - 0.08) / 0.14;
    bgOpacity = normalized * 0.9;
  } else if (scrollProgress > 0.22) {
    bgOpacity = 0.9;
  }

  // 2. Text fade in and fade out — SHORT 80px travel, LONG hold
  let textOpacity = 0;
  let textTranslate = 80; // Short, crisp entrance
  
  if (scrollProgress > 0.22 && scrollProgress <= 0.32) {
    // Fade IN and rise to center (0.22 → 0.32)
    const normalized = (scrollProgress - 0.22) / 0.10;
    textOpacity = normalized;
    textTranslate = 80 * (1 - normalized); // 80px → 0px
  } else if (scrollProgress > 0.32 && scrollProgress <= 0.48) {
    // HOLD — long dwell time for reading (0.32 → 0.48)
    textOpacity = 1;
    textTranslate = 0;
  } else if (scrollProgress > 0.48 && scrollProgress <= 0.56) {
    // Fade OUT and rise upward (0.48 → 0.56)
    const normalized = (scrollProgress - 0.48) / 0.08;
    textOpacity = 1 - normalized;
    textTranslate = -(normalized * 80); // 0px → -80px
  } else if (scrollProgress > 0.56) {
    textOpacity = 0;
    textTranslate = -80;
  }

  // 3. Smooth, prolonged zoom (starts at 0.50, overlaps with text exit)
  if (scrollProgress > 0.50) {
    const normalized = Math.min((scrollProgress - 0.50) / 0.28, 1);
    const easeInOutQuad = normalized < 0.5 ? 2 * normalized * normalized : 1 - Math.pow(-2 * normalized + 2, 2) / 2;
    bgScale = 1 + (easeInOutQuad * 10);
  }

  // 4. Services Pop-in (0.80 → 0.92)
  let servicesOpacity = 0;
  let servicesTranslate = 40;
  if (scrollProgress > 0.80) {
    const normalized = Math.min((scrollProgress - 0.80) / 0.12, 1); // Wider range for smoother pop
    servicesOpacity = normalized;
    servicesTranslate = 40 * (1 - normalized);
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

        {/* SERVICES CONTENT (Pops in at the end over the zoomed background) */}
        <div 
          className={styles.servicesContainer}
          style={{ 
            opacity: servicesOpacity, 
            transform: `translateY(${servicesTranslate}px)`,
            pointerEvents: servicesOpacity > 0.5 ? 'auto' : 'none'
          }}
        >
          <div className={styles.servicesHeaderBand}>
            <h2 className={styles.servicesHeaderText}>Your Key to Trusted Real Estate Expertise</h2>
          </div>

          <div className={styles.servicesGrid}>
            {services.map(service => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceBgWrapper}>
                  <img src={service.image} alt={service.title} className={styles.serviceBgImage} />
                  <div className={styles.serviceOverlay}></div>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <div className={styles.serviceDetailsWrapper}>
                    <div className={styles.serviceLine}></div>
                    <p className={styles.serviceDescription}>{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
