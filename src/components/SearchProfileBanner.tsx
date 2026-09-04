"use client";
import React, { useRef } from 'react';
import styles from './SearchProfileBanner.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';
import { fadeSlideUp, prefersReducedMotion } from '@/utils/animations';

gsap.registerPlugin(ScrollTrigger);

export default function SearchProfileBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useGSAP(sectionRef, () => {
    // CTA button entry
    fadeSlideUp(`.${styles.ctaButton}`, {
      y: 15, duration: 0.6, ease: 'power2.out',
      start: 'top 90%', once: true,
    });

    // Subtle parallax on bg image
    if (bgRef.current && !prefersReducedMotion()) {
      ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (bgRef.current) {
            gsap.set(bgRef.current, { y: (self.progress - 0.5) * 50 });
          }
        },
      });
    }
  });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.bannerContainer}>
        <div className={styles.bgWrapper}>
          <img
            ref={bgRef}
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
