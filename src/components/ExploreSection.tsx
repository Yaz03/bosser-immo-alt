"use client";

import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { mockProperties } from '../data/properties';

export default function ExploreSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: t.explore.filters.all },
    { id: 'villas', label: t.explore.filters.villas },
    { id: 'penthouses', label: t.explore.filters.penthouses },
    { id: 'historic', label: t.explore.filters.historic },
    { id: 'apartments', label: t.explore.filters.apartments },
    { id: 'waterfront', label: t.explore.filters.waterfront },
    { id: 'offMarket', label: t.explore.filters.offMarket },
  ];

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
            <p className="explore-subhead">
              {t.explore.subhead}
            </p>
            <a href="#" className="explore-btn explore-btn-dark">
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
        
        {/* Bottom Functional Grid */}
        <div className="explore-grid">
          {mockProperties.slice(0, 4).map((prop, idx) => (
            <PropertyCard 
              key={prop.id}
              id={prop.id}
              imageSrc={prop.imageSrc}
              type={prop.type}
              price={prop.price}
              location={prop.location}
              specs={prop.specs}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
