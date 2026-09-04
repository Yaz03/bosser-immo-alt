"use client";
import React from 'react';
import styles from './SearchProfileBanner.module.css';

export default function SearchProfileBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.bannerContainer}>
        <div className={styles.bgWrapper}>
          <img 
            src="/search-profile-bg.jpg" 
            alt="Dark luxurious interior" 
            className={styles.bgImage} 
          />
          <div className={styles.overlay}></div>
        </div>
        
        <div className={styles.content}>
          <button className={styles.ctaButton}>
            Create your search profile
          </button>
        </div>
      </div>
    </section>
  );
}
