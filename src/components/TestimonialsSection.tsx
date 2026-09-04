"use client";
import React, { useState } from 'react';
import styles from './TestimonialsSection.module.css';

const testimonials = [
  {
    id: 1,
    text: "Wir wurden super beraten und durch den gesamten Prozess begleitet.",
    name: "Brenner"
  },
  {
    id: 2,
    text: "The expertise and dedication shown by the team were exceptional. They guided us seamlessly through the complex process of acquiring our new corporate headquarters.",
    name: "Johannes Becker"
  },
  {
    id: 3,
    text: "We were highly impressed by their transparent communication and tailored solutions. They truly understand the nuances of the luxury real estate market.",
    name: "Elena Rossi"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = () => {
    if (isAnimating) return;
    setSlideDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setSlideDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 300);
  };

  const handleDot = (idx: number) => {
    if (isAnimating || idx === currentIndex) return;
    setSlideDirection(idx > currentIndex ? 'right' : 'left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Bronze quote character */}
        <span className={styles.quoteChar}>&ldquo;</span>

        <h2 className={styles.headline}>What Clients Say About Us</h2>
        <div className={styles.divider}></div>

        <div className={styles.sliderWrapper}>
          <button className={styles.navArrow} onClick={handlePrev} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className={styles.sliderContent}>
            <div 
              className={`${styles.slideInner} ${isAnimating ? styles.slideOut : styles.slideIn}`}
              style={{
                transform: isAnimating 
                  ? `translateX(${slideDirection === 'right' ? '-30px' : '30px'})` 
                  : 'translateX(0)',
              }}
            >
              <p className={styles.quoteText}>{testimonials[currentIndex].text}</p>
              <p className={styles.authorName}>— {testimonials[currentIndex].name}</p>
            </div>
          </div>

          <button className={styles.navArrow} onClick={handleNext} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18"></polyline>
            </svg>
          </button>
        </div>

        {/* Dash-style pagination */}
        <div className={styles.pagination}>
          {testimonials.map((_, idx) => (
            <button 
              key={idx} 
              className={`${styles.dash} ${idx === currentIndex ? styles.activeDash : ''}`}
              onClick={() => handleDot(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
