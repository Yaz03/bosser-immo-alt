"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
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

export default function PropertiesGrid() {
  const { ref: gridRef, isVisible } = useScrollReveal(0);
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState<DBProperty[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 20;

  const searchParams = useSearchParams();

  const fetchProperties = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', String(itemsPerPage));

      const location = searchParams.get('location') || '';
      const type = searchParams.get('type') || '';
      const beds = searchParams.get('beds') || '';
      const minPrice = searchParams.get('minPrice') || '';
      const maxPrice = searchParams.get('maxPrice') || '';
      const minSqm = searchParams.get('minSqm') || '';
      const maxSqm = searchParams.get('maxSqm') || '';

      if (location) params.set('location', location);
      if (type && type !== 'Any') params.set('type', type);
      if (beds && beds !== 'Any') params.set('beds', beds);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);
      if (minSqm) params.set('minSqm', minSqm);
      if (maxSqm) params.set('maxSqm', maxSqm);

      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      setProperties(data.properties || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
      setProperties([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
    fetchProperties(1);
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalPages = Math.ceil(total / itemsPerPage) || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (gridRef.current) {
      window.scrollTo({ top: (gridRef.current as HTMLElement).offsetTop - 100, behavior: 'smooth' });
    }
  };

  // Helper: get primary image for a property
  const getPrimaryImage = (prop: DBProperty) => {
    if (prop.images && prop.images.length > 0) return prop.images[0].url;
    return prop.heroImage || '/images/prop_villa_1787771383699.jpg';
  };

  return (
    <section className="properties-grid-section" ref={gridRef}>
      <div className="explore-container">

        {/* Results Header */}
        <div className={`properties-results-header reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
          <div className="results-count">
            {loading ? 'Loading...' : total === 0 ? '0 Results' :
              t.propertiesPage.resultsCount
                .replace('{start}', ((currentPage - 1) * itemsPerPage + 1).toString())
                .replace('{end}', Math.min(currentPage * itemsPerPage, total).toString())
                .replace('{total}', total.toString())}
          </div>

          <div className="results-controls">
            {totalPages > 1 && (
              <div className="top-pagination">
                <button
                  className="top-page-arrow"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <span className="top-page-indicator">{currentPage} / {totalPages}</span>
                <button
                  className="top-page-arrow"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            )}

            <div className="results-sort">
              <span className="sort-label">{t.propertiesPage.sortBy}:</span>
              <select className="sort-select">
                <option>{t.propertiesPage.sortNewest}</option>
                <option>{t.propertiesPage.sortPriceHigh}</option>
                <option>{t.propertiesPage.sortPriceLow}</option>
              </select>
            </div>

            <div className="results-view-toggles">
              <button className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className={`explore-grid properties-main-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{
                height: '360px',
                backgroundColor: 'rgba(0,0,0,0.04)',
                borderRadius: '8px',
                animation: 'pulse 1.5s ease-in-out infinite',
              }} />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', color: 'var(--dark-60)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏠</div>
            <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>No properties match your search.</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Try adjusting your filters.</p>
          </div>
        ) : (
          <div className={`explore-grid properties-main-grid ${viewMode === 'list' ? 'list-view' : ''} reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
            {properties.map((prop) => (
              <React.Fragment key={prop.id}>
                <PropertyCard
                  id={prop.id}
                  imageSrc={getPrimaryImage(prop)}
                  type={prop.type}
                  price={prop.priceDisplay}
                  location={prop.location}
                  specs={prop.specs}
                />
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="pagination-container reveal-base reveal-up delay-300 is-revealed">
            <div className="pagination-pill">
              <button className="page-arrow" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                <span>Previous</span>
              </button>
              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button key={pageNum} className={`page-number ${currentPage === pageNum ? 'active' : ''}`} onClick={() => handlePageChange(pageNum)}>
                    {pageNum}
                  </button>
                ))}
              </div>
              <button className="page-arrow" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
                <span>Next</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
