"use client";

import React, { useEffect } from 'react';
import Navbar from './Navbar';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  
  useEffect(() => {
    // Synchronize text fade-in with the camera flying through the logo.
    // The mask zoom accelerates rapidly. We start the text stagger at 800ms.
    setTimeout(() => {
      const items = document.querySelectorAll('[data-hero-fade]');
      items.forEach((el, i) => {
        (el as HTMLElement).style.animationDelay = `${i * 150}ms`;
        el.classList.add('b-reveal--fade', 'is-visible');
      });
    }, 800);
  }, []);

  return (
    <section className={styles.heroSection} aria-label="Hero">
      
      <Navbar />

      <div className={styles.splitContainer}>
        
        {/* LEFT COLUMN: Pure Text & Navy Background */}
        <div className={styles.leftCol}>
          <p className={`${styles.since} b-reveal--fade`} data-hero-fade>
            SINCE 1991
          </p>

          <h1 className={`${styles.headline} b-reveal--fade`} data-hero-fade>
            Your partner for<br/>
            residential real&nbsp;estate&nbsp;in<br/>
            the Rhine-Main area.
          </h1>

          <div className={styles.bottomMeta}>
            <p className={`${styles.competence} b-reveal--fade`} data-hero-fade>
              COMPETENCE, TRUST AND EXCELLENCE
            </p>
            <p className={`${styles.subtext} b-reveal--fade`} data-hero-fade>
              For over 30 years, we have been your reliable partner for all things real estate.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Crisp, bright architectural photo */}
        <div className={styles.rightCol}>
          <img 
            src="/HERO BG.png" 
            alt="Bossert Immobilien Properties" 
            className={styles.authenticBg} 
          />
        </div>

      </div>
    </section>
  );
}
