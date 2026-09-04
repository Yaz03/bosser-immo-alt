"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import styles from './HeroSection.module.css';
import { prefersReducedMotion } from '@/utils/animations';

gsap.registerPlugin(ScrollTrigger);

const heroCards = [
  {
    id: 1,
    title: "Acquire your property",
    description: "Your new property is within reach. We guide you through identifying, evaluating, and securing the right asset — for personal use or as an investment.",
    image: "/service-brokerage.jpg",
    link: "/services"
  },
  {
    id: 2,
    title: "Sell your property strategically",
    description: "With precise market analysis and bespoke sales strategies, your property reaches qualified buyers at the right price.",
    image: "/service-valuation.jpg",
    link: "/services"
  },
  {
    id: 3,
    title: "Get your property valuation",
    description: "Receive an accurate and professional property valuation from our experienced experts.",
    image: "/service-additional.jpg",
    link: "/services"
  }
];

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [sliding, setSliding] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const accentBarRef = useRef<HTMLDivElement>(null);
  const sinceRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const bottomMetaRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // BG zoom
  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(t);
  }, []);

  // Initialize slides: show only first, hide rest
  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, x: 0, position: i === 0 ? 'relative' : 'absolute' });
    });
  }, []);

  // Hero GSAP entrance
  useEffect(() => {
    const runAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const reduced = prefersReducedMotion();
      const targets = {
        bar: accentBarRef.current,
        since: sinceRef.current,
        lines: [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean),
        meta: bottomMetaRef.current,
        right: rightColRef.current,
      };

      if (reduced) {
        gsap.set([targets.bar, targets.since, ...targets.lines, targets.meta, targets.right], {
          opacity: 1, y: 0, x: 0, scaleY: 1,
        });
        return;
      }

      gsap.set(targets.bar, { scaleY: 0, transformOrigin: 'top center', opacity: 1 });
      gsap.set(targets.since, { opacity: 0, y: 20 });
      gsap.set(targets.lines, { opacity: 0, y: 30 });
      gsap.set(targets.meta, { opacity: 0, y: 20 });
      gsap.set(targets.right, { opacity: 0, x: 60 });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(targets.bar, { scaleY: 1, duration: 0.8, ease: 'power3.out' })
        .to(targets.since, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.5')
        .to(targets.lines, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, '-=0.3')
        .to(targets.meta, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
        .to(targets.right, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.55');
    };

    const timer = setTimeout(runAnimation, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll parallax
  useEffect(() => {
    if (!bgRef.current || !sectionRef.current || prefersReducedMotion()) return;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (bgRef.current) gsap.set(bgRef.current, { y: self.progress * 80 });
      },
    });
    return () => st.kill();
  }, []);

  const goTo = useCallback((nextIndex: number, dir: 'left' | 'right') => {
    if (sliding || nextIndex === activeCard) return;

    const current = slideRefs.current[activeCard];
    const next = slideRefs.current[nextIndex];
    if (!current || !next) return;

    setSliding(true);

    const enterFrom = dir === 'right' ? 80 : -80;
    const exitTo = dir === 'right' ? -80 : 80;

    // Prep next slide: place it absolutely, shifted off to the side, invisible
    gsap.set(next, {
      position: 'absolute',
      top: 0, left: 0, right: 0,
      x: enterFrom,
      opacity: 0,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        // Promote next to relative (takes up space), reset current
        gsap.set(next, { position: 'relative', x: 0, opacity: 1 });
        gsap.set(current, { position: 'absolute', opacity: 0, x: 0 });
        setActiveCard(nextIndex);
        setSliding(false);
      }
    });

    tl.to(current, { x: exitTo, opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 0)
      .to(next, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.05);
  }, [sliding, activeCard]);

  const handlePrev = () => goTo(activeCard === 0 ? heroCards.length - 1 : activeCard - 1, 'left');
  const handleNext = () => goTo(activeCard === heroCards.length - 1 ? 0 : activeCard + 1, 'right');

  return (
    <section className={styles.heroSection} aria-label="Hero" ref={sectionRef}>
      <Navbar />

      <img
        ref={bgRef}
        src="/HERO BG.png"
        alt="Bossert Immobilien Properties"
        className={`${styles.authenticBg} ${isLoaded ? styles.isLoaded : ''}`}
        fetchPriority="high"
      />

      <div className={styles.imageOverlay} />

      <div className={styles.contentGrid}>

        {/* LEFT */}
        <div className={styles.leftCol}>
          <div className={styles.textBlock}>
            <div className={styles.accentBar} ref={accentBarRef} />
            <div className={styles.textContent}>
              <p className={styles.since} ref={sinceRef}>SINCE 1991</p>
              <h1 className={styles.headline}>
                <span data-hero-line ref={line1Ref}>Your partner for</span>
                <span data-hero-line ref={line2Ref}>residential real&nbsp;estate&nbsp;in</span>
                <span data-hero-line ref={line3Ref}>the Rhine-Main area.</span>
              </h1>
              <div className={styles.bottomMeta} ref={bottomMetaRef}>
                <p className={styles.competence}>COMPETENCE, TRUST AND EXCELLENCE</p>
                <p className={styles.subtext}>
                  For over 30 years, we have been your reliable partner for all things real estate.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Carousel */}
        <div className={styles.rightCol} ref={rightColRef}>

          <div className={styles.carouselOuter}>
            {/* Slide track */}
            <div className={styles.carouselTrack}>
              {heroCards.map((card, i) => (
                <div
                  key={card.id}
                  className={styles.slide}
                  ref={el => { slideRefs.current[i] = el; }}
                >
                  <div className={styles.slideImg}>
                    <img src={card.image} alt={card.title} className={styles.slidePhoto} />
                  </div>
                  <div className={styles.slideBody}>
                    <h3 className={styles.slideTitle}>{card.title}</h3>
                    <p className={styles.slideDesc}>{card.description}</p>
                    <a href={card.link} className={styles.slideLink}>
                      Discover more
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows — sit on the sides of the card */}
            <button className={`${styles.arrow} ${styles.arrowL}`} onClick={handlePrev} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button className={`${styles.arrow} ${styles.arrowR}`} onClick={handleNext} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18"/>
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className={styles.dots}>
            {heroCards.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeCard ? styles.dotOn : ''}`}
                onClick={() => goTo(i, i > activeCard ? 'right' : 'left')}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
