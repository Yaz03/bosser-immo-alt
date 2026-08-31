"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CtaSection from '@/components/CtaSection';
import KnowledgeFeed from '@/components/KnowledgeFeed';
import { useLanguage } from '@/context/LanguageContext';

export default function KnowledgePage() {
  const { t } = useLanguage();

  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar invertOnLoad={true} />

      {/* 1. Hero Section */}
      <section className="global-padding" style={{ paddingTop: '15rem', paddingBottom: '4rem' }}>
        <div className="inner-page-container reveal-base reveal-up is-revealed">
          <p className="services-subtitle" style={{ marginBottom: '1.5rem' }}>
            <span className="dot"></span> {t.knowledge.hero.tag}
          </p>
          <h1 className="editorial-headline" style={{ marginBottom: '2rem' }}>
            {t.knowledge.hero.title} <br />
            <span className="italic-serif">{t.knowledge.hero.titleSerif}</span>
          </h1>
          <p style={{ fontSize: '1.5rem', color: 'rgba(4,36,51,0.7)', maxWidth: '800px', lineHeight: 1.6 }}>
            {t.knowledge.hero.subhead}
          </p>
        </div>
      </section>

      {/* 2. Feed & Filters */}
      <KnowledgeFeed data={t.knowledge} />

      {/* 3. CTA */}
      <CtaSection variant="knowledge" />

      <Footer />
    </main>
  );
}
