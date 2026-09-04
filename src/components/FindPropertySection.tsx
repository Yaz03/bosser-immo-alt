"use client";
import React, { useRef } from 'react';
import styles from './FindPropertySection.module.css';
import { useGSAP } from '@/hooks/useGSAP';
import { fadeSlideUp, scaleXReveal, batchReveal } from '@/utils/animations';

export default function FindPropertySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(sectionRef, () => {
    // Headline fade-slide
    fadeSlideUp(`.${styles.headline}`, {
      y: 35, duration: 0.7, ease: 'power2.out',
      start: 'top 85%', once: true,
    });

    // Bronze underline span — scaleX reveal (pseudo-elements can't be GSAP'd)
    scaleXReveal(`.${styles.headlineUnderline}`, {
      duration: 0.6, delay: 0.25, ease: 'power2.out',
      start: 'top 85%', once: true,
    });

    // Search container
    fadeSlideUp(`.${styles.searchContainer}`, {
      y: 30, duration: 0.6, delay: 0.15, ease: 'power2.out',
      start: 'top 85%', once: true,
    });

    // Feature cards — ScrollTrigger.batch for performance
    batchReveal(`.${styles.card}`, {
      stagger: 0.12, y: 40, duration: 0.7,
      once: true, start: 'top 88%',
    });
  });

  return (
    <section className={styles.section} ref={sectionRef}>

      {/* Top half: Image background with search bar */}
      <div className={styles.searchArea}>
        <div className={styles.bgWrapper}>
          <img src="/property-search-bg.jpg" alt="Luxury property interior" className={styles.bgImage} />
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.searchContent}>
          <h2 className={styles.headline}>
            Find Your Next Property
          </h2>
          {/* Real DOM element for the bronze underline — pseudo can't be GSAP targeted */}
          <span className={styles.headlineUnderline}></span>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Title or Property ID"
              className={styles.inputField}
            />

            <select className={styles.selectField} defaultValue="all">
              <option value="all">All Property Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
            </select>

            <select className={styles.selectField} defaultValue="buy">
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>

            <button className={styles.searchBtn}>Search</button>
          </div>
        </div>
      </div>

      {/* Bottom half: Navy background with feature cards */}
      <div className={styles.featuresArea}>
        <div className={styles.grid}>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={styles.icon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9a3 3 0 013-3m0 0a3 3 0 013 3m-3-3v12m-6 3h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Comprehensive<br/>Expertise</h3>
            <p className={styles.cardDesc}>
              30 years of real estate experience — delivering expert guidance and professional execution in both German and English.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={styles.icon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Tailored<br/>Solutions</h3>
            <p className={styles.cardDesc}>
              Personalized strategies precisely aligned with your property and your individual goals.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={styles.icon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Transparent<br/>Communication</h3>
            <p className={styles.cardDesc}>
              Clear processes, honest advice, and full transparency at every stage.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
