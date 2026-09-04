"use client";
import React from 'react';
import styles from './ConsultationSection.module.css';

export default function ConsultationSection() {
  return (
    <section className={styles.section}>
      
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
