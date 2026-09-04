"use client";

import React, { useRef } from 'react';
import styles from './ServicesSection.module.css';
import { useGSAP } from '@/hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(sectionRef, () => {
    // Reveal header
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, y: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true
        }
      }
    );

    // Stagger reveal cards
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        }
      }
    );
  });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        
        <h2 className={styles.headline} ref={headerRef}>
          Your Key to Trusted Real Estate Expertise
        </h2>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <div 
              key={service.id} 
              className={styles.card}
              ref={el => { cardsRef.current[i] = el; }}
            >
              <div className={styles.imageWrapper}>
                <img src={service.image} alt={service.title} className={styles.image} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{service.title}</h3>
                <div className={styles.separator} />
                <p className={styles.description}>{service.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
