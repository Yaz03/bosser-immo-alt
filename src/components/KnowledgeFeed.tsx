"use client";

import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Article {
  id: number;
  category: string;
  date: string;
  title: string;
  desc: string;
  image: string;
}

interface Props {
  data: {
    categories: string[];
    readMore: string;
    featured: {
      tag: string;
      date: string;
      title: string;
      desc: string;
      image: string;
    };
    articles: Article[];
  };
}

export default function KnowledgeFeed({ data }: Props) {
  const [activeCategory, setActiveCategory] = useState(data.categories[0]); // 'All' / 'Alle'
  const { ref, isVisible } = useScrollReveal();

  // Filter articles based on active category
  // Assuming index 0 is "All" / "Alle"
  const isAll = activeCategory === data.categories[0];
  const filteredArticles = isAll 
    ? data.articles 
    : data.articles.filter(a => a.category === activeCategory);

  return (
    <section className="global-padding" ref={ref} style={{ paddingBottom: '12rem', backgroundColor: 'var(--cream)' }}>
      <div className="inner-page-container">
        
        {/* Featured Article */}
        <div className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`} style={{ marginBottom: '6rem' }}>
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', backgroundColor: 'var(--navy)', color: 'var(--white)', minHeight: '600px', display: 'flex', alignItems: 'flex-end', padding: '4rem' }}>
            <img 
              src={data.featured.image} 
              alt={data.featured.title} 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, zIndex: 0 }} 
            />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(4,36,51,0.95) 0%, rgba(4,36,51,0) 100%)', zIndex: 1 }}></div>
            
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span className="services-subtitle" style={{ color: 'var(--bronze)', margin: 0, letterSpacing: '2px' }}>
                  <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {data.featured.tag}
                </span>
                <span style={{ color: 'rgba(254,252,246,0.5)', fontSize: '0.8rem', letterSpacing: '1px' }}>{data.featured.date}</span>
              </div>
              <h2 className="italic-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--white)' }}>
                {data.featured.title}
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'rgba(254,252,246,0.8)', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '600px' }}>
                {data.featured.desc}
              </p>
              <button className="explore-btn" style={{ padding: '0.8rem 1rem 0.8rem 2rem', border: 'none', cursor: 'pointer' }}>
                <span>{data.readMore}</span>
                <div className="explore-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }} className={`reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
          {data.categories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            return (
              <button 
                key={idx}
                onClick={() => setActiveCategory(cat)}
                style={{ 
                  padding: '0.8rem 2rem', 
                  borderRadius: '100px', 
                  border: `1px solid ${isActive ? 'var(--navy)' : 'rgba(4,36,51,0.1)'}`, 
                  backgroundColor: isActive ? 'var(--navy)' : 'transparent', 
                  color: isActive ? 'var(--white)' : 'var(--navy)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-inter)'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '4rem 3rem' }}>
          {filteredArticles.map((article, idx) => (
            <div key={article.id} className="reveal-base reveal-up is-revealed" style={{ animationDelay: `${idx * 100}ms` }}>
              
              {/* Corner Magic Image */}
              <div style={{ backgroundColor: 'var(--white)', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 10px 40px rgba(4,36,51,0.03)' }}>
                <div style={{ width: '100%', aspectRatio: '4/3', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="hover-scale" />
                </div>
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span className="services-subtitle" style={{ color: 'var(--navy)', margin: 0 }}>
                  <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {article.category}
                </span>
                <span style={{ color: 'rgba(4,36,51,0.4)', fontSize: '0.8rem', letterSpacing: '1px' }}>{article.date}</span>
              </div>

              {/* Title & Desc */}
              <h3 className="italic-serif" style={{ fontSize: '2rem', lineHeight: 1.2, color: 'var(--navy)', marginBottom: '1rem' }}>
                {article.title}
              </h3>
              <p style={{ color: 'rgba(4,36,51,0.6)', lineHeight: 1.6, marginBottom: '1.5rem', minHeight: '75px' }}>
                {article.desc}
              </p>

              {/* Read More link */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--bronze)', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>
                {data.readMore}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hover-scale:hover {
          transform: scale(1.05);
        }
      `}} />
    </section>
  );
}
