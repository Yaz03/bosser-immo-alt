"use client";

import React from 'react';
import AccordionCard from './AccordionCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function ServicesSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();

  const cards = [
    {
      number: "01",
      category: t.services.cards[0].category,
      title: t.services.cards[0].title,
      subtitle: t.services.cards[0].subtitle,
      description: t.services.cards[0].description,
      linkText: t.services.cards[0].linkText,
      bgImage: "/card1.jpg"
    },
    {
      number: "02",
      category: t.services.cards[1].category,
      title: t.services.cards[1].title,
      subtitle: t.services.cards[1].subtitle,
      description: t.services.cards[1].description,
      linkText: t.services.cards[1].linkText,
      bgImage: "/card2.jpg"
    },
    {
      number: "03",
      category: t.services.cards[2].category,
      title: t.services.cards[2].title,
      subtitle: t.services.cards[2].subtitle,
      description: t.services.cards[2].description,
      linkText: t.services.cards[2].linkText,
      bgImage: "/card3.jpg"
    },
    {
      number: "04",
      category: t.services.cards[3].category,
      title: t.services.cards[3].title,
      subtitle: t.services.cards[3].subtitle,
      description: t.services.cards[3].description,
      linkText: t.services.cards[3].linkText,
      bgImage: "/card4.jpg"
    }
  ];

  return (
    <section className="services-section" ref={sectionRef}>
      <div className={`services-left reveal-base reveal-scale ${isVisible ? 'is-revealed' : ''}`}>
        <div className="services-subtitle">
          <span className="dot"></span> {t.services.tag}
        </div>
        <div className="services-headline">
          <div className="headline-top-s">{t.services.headline}</div>
          <div className="headline-mid-s">{t.services.headlineMid}</div>
          <div className="headline-bot-s"><span>{t.services.headlineSerif}</span> {t.services.headlineBot}</div>
        </div>
        <div className="services-desc">
          {t.services.subhead}
        </div>
        <div className="services-footer">
          {t.services.footer}
        </div>
      </div>

      <div className="services-right accordion-container">
        {cards.map((card, idx) => (
          <AccordionCard key={idx} {...card} />
        ))}
      </div>
    </section>
  );
}
