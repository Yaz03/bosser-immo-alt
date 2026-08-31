"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface LocaleArticle {
  id: string;
  category: string;
  date: string;
  title: string;
  desc: string;
  image: string;
}

interface DBArticle {
  id: string;
  titleEn: string;
  descEn: string;
  category: string;
  heroImage: string | null;
  publishedAt: string;
  featured: boolean;
  slug: string;
}

interface Props {
  data: {
    categories: string[];
    readMore: string;
    featured: {
      id?: string;
      tag: string;
      date: string;
      title: string;
      desc: string;
      image: string;
    };
    articles: LocaleArticle[];
  };
}

// Map DB article → display shape
function mapArticle(a: DBArticle): LocaleArticle {
  return {
    id: a.id,
    category: a.category,
    date: new Date(a.publishedAt || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    title: a.titleEn,
    desc: a.descEn || '',
    image: a.heroImage || '/images/prop_penthouse_1787771396787.jpg',
  };
}

export default function KnowledgeFeed({ data }: Props) {
  const [activeCategory, setActiveCategory] = useState(data.categories[0]);
  const { ref, isVisible } = useScrollReveal();
  const [allArticles, setAllArticles] = useState<LocaleArticle[]>(data.articles);
  const [featuredArticle, setFeaturedArticle] = useState(data.featured);
  const [categories, setCategories] = useState(data.categories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles?limit=50')
      .then((r) => r.json())
      .then((result: { articles: DBArticle[]; total: number }) => {
        if (result.articles && result.articles.length > 0) {
          const mapped = result.articles.map(mapArticle);

          // Featured = first article with featured=true, or first article
          const featuredDB = result.articles.find((a) => a.featured) || result.articles[0];
          if (featuredDB) {
            setFeaturedArticle({
              id: featuredDB.id,
              tag: featuredDB.category,
              date: new Date(featuredDB.publishedAt || Date.now()).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric',
              }),
              title: featuredDB.titleEn,
              desc: featuredDB.descEn || '',
              image: featuredDB.heroImage || '/images/prop_penthouse_1787771396787.jpg',
            });
          }

          // Build dynamic category list from DB data
          const dbCats = Array.from(new Set(result.articles.map((a) => a.category)));
          setCategories([data.categories[0], ...dbCats.filter((c) => c !== data.categories[0])]);
          setAllArticles(mapped);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isAll = activeCategory === data.categories[0];
  const filteredArticles = isAll
    ? allArticles
    : allArticles.filter((a) => a.category === activeCategory);

  return (
    <section className="global-padding" ref={ref} style={{ paddingBottom: '6rem', backgroundColor: 'var(--cream)' }}>
      <div className="inner-page-container">

        {/* 1. Cinematic Featured Article */}
        <div className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`} style={{ marginBottom: '8rem' }}>
          <Link href={`/knowledge/${featuredArticle.id || 'featured'}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none' }} className="featured-card">
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', backgroundColor: 'var(--navy)', color: 'var(--white)', minHeight: '650px', display: 'flex', alignItems: 'flex-end', padding: '4rem' }}>
              <div className="image-wrapper" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="scale-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                />
              </div>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(4,36,51,0.95) 0%, rgba(4,36,51,0.1) 80%)', zIndex: 1 }}></div>

              <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <span className="services-subtitle" style={{ color: 'var(--bronze)', margin: 0, letterSpacing: '2px' }}>
                    <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {featuredArticle.tag}
                  </span>
                  <span style={{ color: 'rgba(254,252,246,0.5)', fontSize: '0.8rem', letterSpacing: '1px' }}>{featuredArticle.date}</span>
                </div>
                <h2 className="italic-serif" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.05, marginBottom: '2rem', color: 'var(--white)' }}>
                  {featuredArticle.title}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}>
                  <p style={{ fontSize: '1.25rem', color: 'rgba(254,252,246,0.8)', lineHeight: 1.6, maxWidth: '650px' }}>
                    {featuredArticle.desc}
                  </p>
                  <div className="explore-btn animated-arrow-btn" style={{ padding: '0.8rem 1rem 0.8rem 2rem', border: 'none', cursor: 'pointer' }}>
                    <span>{data.readMore}</span>
                    <div className="explore-icon-wrapper arrow-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* 2. Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '6rem', justifyContent: 'center' }} className={`reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '1rem 2.5rem', borderRadius: '100px',
                  border: `1px solid ${isActive ? 'var(--navy)' : 'rgba(4,36,51,0.1)'}`,
                  backgroundColor: isActive ? 'var(--navy)' : 'transparent',
                  color: isActive ? 'var(--white)' : 'var(--navy)',
                  cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  fontSize: '0.95rem', fontFamily: 'var(--font-inter)', letterSpacing: '0.5px',
                }}
                className="hover-fill-btn"
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3. Alternating Editorial List */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ height: '300px', backgroundColor: 'rgba(4,36,51,0.04)', borderRadius: '16px', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(4,36,51,0.4)' }}>
            <p style={{ fontSize: '1.1rem' }}>No articles in this category yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {filteredArticles.map((article, idx) => {
              const isImageLeft = idx % 2 === 0;
              return (
                <div key={article.id} className="reveal-base reveal-up is-revealed" style={{ animationDelay: `${idx * 150}ms` }}>
                  <Link href={`/knowledge/${article.id}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none' }} className="editorial-row">
                    <div className="editorial-row-inner" style={{
                      display: 'flex',
                      flexDirection: isImageLeft ? 'row' : 'row-reverse',
                      gap: '5rem', alignItems: 'center',
                      padding: '5rem 0', borderTop: '1px solid rgba(4,36,51,0.1)',
                    }}>
                      <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                        <div style={{ width: '100%', aspectRatio: '4/3', position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(4,36,51,0.05)' }}>
                          <img src={article.image} alt={article.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                            className="row-image" />
                        </div>
                      </div>

                      <div style={{ flex: '1 1 55%', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '300px' }} className="row-content">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span className="services-subtitle" style={{ color: 'var(--navy)', margin: 0 }}>
                            <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {article.category}
                          </span>
                          <span style={{ color: 'rgba(4,36,51,0.4)', fontSize: '0.85rem', letterSpacing: '1px' }}>{article.date}</span>
                        </div>
                        <h3 className="italic-serif row-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.1, color: 'var(--navy)', transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
                          {article.title}
                        </h3>
                        <p style={{ color: 'rgba(4,36,51,0.6)', lineHeight: 1.6, fontSize: '1.1rem', maxWidth: '90%' }}>
                          {article.desc}
                        </p>
                        <div className="animated-arrow-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--bronze)', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '1rem' }}>
                          {data.readMore}
                          <div className="arrow-wrapper" style={{ transition: 'transform 0.3s ease' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .featured-card:hover .scale-image { transform: scale(1.05); }
        .editorial-row:hover .row-image { transform: scale(1.05); }
        .editorial-row:hover .row-title { transform: translateX(10px); }
        .animated-arrow-btn:hover .arrow-wrapper { transform: translateX(5px); }
        .hover-fill-btn:hover { background-color: var(--navy) !important; color: var(--white) !important; }
        @media (max-width: 768px) {
          .editorial-row-inner { flex-direction: column !important; gap: 2rem !important; padding: 3rem 0 !important; }
          .editorial-row:hover .row-title { transform: translateX(0); }
        }
      `}} />
    </section>
  );
}
