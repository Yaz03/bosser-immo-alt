"use client";

import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

interface DBProperty {
  id: string;
  type: string;
  priceDisplay: string;
  location: string;
  specs: string;
  heroImage: string | null;
  images: { url: string; order: number }[];
}

export default function ExploreSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [allProperties, setAllProperties] = useState<DBProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = [
    { id: 'all', label: t.explore.filters.all },
    { id: 'villas', label: t.explore.filters.villas },
    { id: 'penthouses', label: t.explore.filters.penthouses },
    { id: 'historic', label: t.explore.filters.historic },
    { id: 'apartments', label: t.explore.filters.apartments },
    { id: 'waterfront', label: t.explore.filters.waterfront },
    { id: 'offMarket', label: t.explore.filters.offMarket },
  ];

  useEffect(() => {
    fetch('/api/properties?limit=50')
      .then((r) => r.json())
      .then((data) => {
        setAllProperties(data.properties || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getPrimaryImage = (prop: DBProperty) => {
    if (prop.images && prop.images.length > 0) return prop.images[0].url;
    return prop.heroImage || '/images/prop_villa_1787771383699.jpg';
  };

  const filtered = allProperties.filter((prop) => {
    const t = prop.type.toLowerCase();
    if (activeFilter === 'all') return true;
    if (activeFilter === 'villas') return t.includes('villa');
    if (activeFilter === 'penthouses') return t.includes('penthouse');
    if (activeFilter === 'historic') return t.includes('historic');
    if (activeFilter === 'apartments') return t.includes('apartment') || t.includes('loft');
    if (activeFilter === 'waterfront') return t.includes('waterfront');
    if (activeFilter === 'offMarket') return t.includes('mansion') || t.includes('estate');
    return true;
  }).slice(0, 4);

  return (
    <section className="explore-section" ref={sectionRef}>
      <div className="explore-container">

        {/* Top Header */}
        <div className="explore-header">
          <div className={`explore-header-left reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
            <div className="explore-subtitle">
              <span className="dot"></span> {t.explore.tag}
            </div>
            <h2 className="explore-headline">
              {t.explore.headline} <br /><span className="italic-serif">{t.explore.headlineSerif}</span>
            </h2>
          </div>

          <div className={`explore-header-right reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
            <p className="explore-subhead">{t.explore.subhead}</p>
            <a href="/properties" className="explore-btn explore-btn-dark">
              {t.explore.btn}
              <div className="explore-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Category Filters */}
        <div className="explore-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-pill ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="explore-grid">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{
                height: '360px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderRadius: '8px',
                animation: 'pulse 1.5s ease-in-out infinite',
              }} />
            ))
          ) : filtered.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.4)', gridColumn: '1/-1', textAlign: 'center', padding: '3rem' }}>
              No properties in this category yet.
            </p>
          ) : (
            filtered.map((prop) => (
              <PropertyCard
                key={prop.id}
                id={prop.id}
                imageSrc={getPrimaryImage(prop)}
                type={prop.type}
                price={prop.priceDisplay}
                location={prop.location}
                specs={prop.specs}
              />
            ))
          )}
        </div>

      </div>
    </section>
  );
}
