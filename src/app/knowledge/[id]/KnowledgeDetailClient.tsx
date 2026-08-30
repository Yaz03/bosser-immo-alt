"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function KnowledgeDetailClient({ id }: { id: string }) {
  const { t, lang } = useLanguage();
  const knowledgeData = (t as any).knowledge;
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (knowledgeData) {
      if (id === 'featured') {
        setData(knowledgeData.featured);
      } else {
        const item = knowledgeData.articles.find((i: any) => String(i.id) === String(id));
        setData(item || null);
      }
    }
  }, [id, knowledgeData]);

  if (!knowledgeData) return null;
  
  if (data === null) {
    return (
      <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar invertOnLoad={true} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 className="editorial-headline" style={{ color: 'var(--navy)' }}>Article Not Found</h1>
        </div>
        <Footer />
      </main>
    );
  }

  // Simple Markdown-like Parser
  const renderContent = (text: string) => {
    if (!text) return null;
    const blocks = text.split('\n\n');
    return blocks.map((block, idx) => {
      const cleanBlock = block.trim();
      if (cleanBlock.startsWith('### ')) {
        return (
          <h3 key={idx} className="italic-serif" style={{ fontSize: '2rem', color: 'var(--navy)', marginTop: '3rem', marginBottom: '1.5rem' }}>
            {cleanBlock.replace('### ', '')}
          </h3>
        );
      }
      if (cleanBlock.startsWith('> ')) {
        return (
          <blockquote key={idx} style={{ borderLeft: '4px solid var(--bronze)', paddingLeft: '2rem', margin: '3rem 0', fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--navy)', lineHeight: 1.6 }}>
            {cleanBlock.replace('> ', '')}
          </blockquote>
        );
      }
      return (
        <p key={idx} style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'rgba(4,36,51,0.8)', marginBottom: '1.5rem' }}>
          {cleanBlock}
        </p>
      );
    });
  };

  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <Navbar invertOnLoad={true} />

      {/* Hero Section */}
      <section ref={heroRef} style={{ position: 'relative', width: '100%', height: '70vh', minHeight: '500px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', paddingBottom: '4rem' }}>
        <div style={{ position: 'absolute', inset: 0, transform: heroVisible ? 'scale(1)' : 'scale(1.05)', transition: 'transform 2s ease-out' }}>
          <Image src={data.image} alt={data.title} fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,36,51,0.9) 0%, rgba(4,36,51,0.2) 80%)' }} />
        
        <div className="global-padding" style={{ position: 'relative', width: '100%', zIndex: 10 }}>
          <div className="inner-page-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className={`reveal-base reveal-up delay-100 ${heroVisible ? 'is-revealed' : ''}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span className="services-subtitle" style={{ color: 'var(--bronze)', margin: 0 }}>
                <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {data.category || data.tag}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', letterSpacing: '1px' }}>{data.date}</span>
            </div>
            <h1 className={`editorial-headline reveal-base reveal-up delay-200 ${heroVisible ? 'is-revealed' : ''}`} style={{ color: 'var(--white)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}>
              {data.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <article className="global-padding" style={{ padding: '6rem 0 10rem 0' }}>
        <div className="inner-page-container">
          
          <div className="reveal-base reveal-up delay-300 is-revealed" style={{ maxWidth: '720px', margin: '0 auto' }}>
            {/* Intro Description */}
            <p style={{ fontSize: '1.5rem', lineHeight: 1.6, color: 'var(--navy)', fontWeight: 500, marginBottom: '3rem' }}>
              {data.desc}
            </p>
            
            <div style={{ height: '1px', backgroundColor: 'rgba(4,36,51,0.1)', marginBottom: '3rem' }} />

            {/* Main Content Body */}
            <div>
              {renderContent(data.content)}
            </div>

            {/* Back Button */}
            <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(4,36,51,0.1)', textAlign: 'center' }}>
              <Link href="/knowledge">
                <button className="explore-btn" style={{ padding: '1rem 2.5rem', backgroundColor: 'var(--navy)', color: 'var(--white)', border: 'none', borderRadius: '100px', cursor: 'pointer', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" style={{ transform: 'rotate(180deg)' }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <span>{lang === 'en' ? 'Back to Knowledge' : 'Zurück zum Wissen'}</span>
                </button>
              </Link>
            </div>

          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
