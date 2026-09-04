"use client";
import React, { useRef } from 'react';
import styles from './ConsultationSection.module.css';
import { useGSAP } from '@/hooks/useGSAP';
import { slideIn, scaleXReveal, scaleYReveal } from '@/utils/animations';

export default function ConsultationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Split reveal — once: true
  useGSAP(sectionRef, () => {
    scaleXReveal(`.${styles.topLine}`, {
      duration: 0.8, ease: 'power2.out',
      start: 'top 80%', once: true,
    });
    scaleYReveal(`.${styles.verticalLine}`, {
      duration: 0.9, delay: 0.15, ease: 'power2.out',
      start: 'top 80%', once: true,
    });
    slideIn(`.${styles.leftCol}`, 'left', {
      duration: 0.9, ease: 'power2.out',
      start: 'top 80%', once: true,
    });
    slideIn(`.${styles.rightCol}`, 'right', {
      duration: 0.9, delay: 0.15, ease: 'power2.out',
      start: 'top 80%', once: true,
    });
  });

  return (
    <section className={styles.section} ref={sectionRef}>

      {/* Decorative Lines */}
      <div className={styles.topLine}></div>
      <div className={styles.verticalLine}></div>

      <div className={styles.container}>

        {/* Left Content */}
        <div className={styles.leftCol}>
          <div className={styles.contentBox}>
            <div className={styles.logoText}>
              Bossert<br />
              Immobilien
            </div>

            <h2 className={styles.headline}>
              Is this the right time to act<br />
              for your property?
            </h2>

            <p className={styles.subtext}>
              We deliver clear market insights and reliable support<br />
              at every step.
            </p>

            <button className={styles.ctaButton}>
              Request Your Consultation
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className={styles.rightCol}>
          <div className={styles.imageWrapper}>
            <img
              src="/consultation-bg.jpg"
              alt="Modern property interior"
              className={styles.image}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
