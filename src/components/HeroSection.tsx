"use client";

import React, { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar';
import styles from './HeroSection.module.css';

const heroCards = [
  {
    id: 1,
    title: "Acquire your\nproperty",
    description: "Your new property is within reach. We guide you through identifying, evaluating, and securing the right asset — for personal use or as an investment.",
    image: "/service-brokerage.jpg",
    link: "/services"
  },
  {
    id: 2,
    title: "Sell your property\nstrategically",
    description: "With precise market analysis and bespoke sales strategies, your property reaches qualified buyers at the right price.",
    image: "/service-valuation.jpg",
    link: "/services"
  },
  {
    id: 3,
    title: "Get your property\nvaluation",
    description: "Receive an accurate and professional property valuation from our experienced experts.",
    image: "/service-additional.jpg",
    link: "/services"
  }
];

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);
  const [activeCard, setActiveCard] = useState(2); // Front card index

  useEffect(() => {
    const bgTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    const textTimer = setTimeout(() => {
      setTextRevealed(true);
    }, 2000);

    return () => {
      clearTimeout(bgTimer);
      clearTimeout(textTimer);
    };
  }, []);

  const handlePrev = () => {
    setActiveCard((prev) => (prev === 0 ? heroCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCard((prev) => (prev === heroCards.length - 1 ? 0 : prev + 1));
  };

  // Calculate card order: active is front, others trail behind
  const getCardStyle = (index: number) => {
    const total = heroCards.length;
    let offset = (index - activeCard + total) % total; // 0 = front, 1 = middle, 2 = back

    if (offset === 0) {
      return {
        transform: 'translateX(0) scale(1)',
        opacity: 1,
        zIndex: 3,
        filter: 'brightness(1)',
      };
    } else if (offset === 1) {
      return {
        transform: 'translateX(-35px) scale(0.92)',
        opacity: 0.7,
        zIndex: 2,
        filter: 'brightness(0.7)',
      };
    } else {
      return {
        transform: 'translateX(-65px) scale(0.84)',
        opacity: 0.4,
        zIndex: 1,
        filter: 'brightness(0.5)',
      };
    }
  };

  return (
    <section className={styles.heroSection} aria-label="Hero">
      
      <Navbar />

      <img 
        src="/HERO BG.png" 
        alt="Bossert Immobilien Properties" 
        className={`${styles.authenticBg} ${isLoaded ? styles.isLoaded : ''}`} 
      />
      
      <div className={styles.imageOverlay} />

      <div className={styles.contentGrid}>
        
        {/* LEFT COLUMN — Text */}
        <div className={styles.leftCol}>
          <div className={styles.textBlock}>
            <div className={styles.accentBar}></div>
            <div className={styles.textContent}>
              <p className={`${styles.since} ${styles.revealItem} ${textRevealed ? styles.isRevealed : ''}`} style={{ transitionDelay: '0ms' }}>
                SINCE 1991
              </p>

              <h1 className={`${styles.headline} ${styles.revealItem} ${textRevealed ? styles.isRevealed : ''}`} style={{ transitionDelay: '120ms' }}>
                Your partner for<br/>
                residential real&nbsp;estate&nbsp;in<br/>
                the Rhine-Main area.
              </h1>

              <p className={`${styles.competence} ${styles.revealItem} ${textRevealed ? styles.isRevealed : ''}`} style={{ transitionDelay: '240ms' }}>
                COMPETENCE, TRUST AND EXCELLENCE
              </p>

              <p className={`${styles.subtext} ${styles.revealItem} ${textRevealed ? styles.isRevealed : ''}`} style={{ transitionDelay: '360ms' }}>
                For over 30 years, we have been your reliable partner for all things real estate.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Card Stack */}
        <div className={`${styles.rightCol} ${styles.revealItem} ${textRevealed ? styles.isRevealed : ''}`} style={{ transitionDelay: '500ms' }}>
          <div className={styles.cardStack}>
            {heroCards.map((card, index) => (
              <div
                key={card.id}
                className={styles.heroCard}
                style={{
                  ...getCardStyle(index),
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease, filter 0.6s ease',
                }}
              >
                <div className={styles.cardImageWrapper}>
                  <img src={card.image} alt={card.title} className={styles.cardImage} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.description}</p>
                  <a href={card.link} className={styles.cardLink}>
                    learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 16 16 12 12 8"></polyline>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className={styles.cardNav}>
            <button className={styles.navBtn} onClick={handlePrev} aria-label="Previous card">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button className={styles.navBtn} onClick={handleNext} aria-label="Next card">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18"></polyline>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
