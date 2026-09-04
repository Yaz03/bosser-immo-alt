"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from './ServicesSection.module.css';

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Trigger earlier to pop right after zoom
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`${styles.section} ${isVisible ? styles.visible : ''}`} ref={sectionRef}>
      <div className={styles.headerBand}>
        <h2 className={styles.headerText}>Your Key to Trusted Real Estate Expertise</h2>
      </div>

      <div className={styles.grid}>
        {services.map(service => (
          <div key={service.id} className={styles.card}>
            <div className={styles.bgWrapper}>
              <img src={service.image} alt={service.title} className={styles.bgImage} />
              <div className={styles.overlay}></div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{service.title}</h3>
              <div className={styles.detailsWrapper}>
                <p className={styles.description}>{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
