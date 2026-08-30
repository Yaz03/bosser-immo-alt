"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from './PropertyCard';
import { mockProperties } from '../data/properties';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function PropertiesGrid() {
  const { ref: gridRef, isVisible } = useScrollReveal(0);
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const searchParams = useSearchParams();
  const locationParam = searchParams.get('location')?.toLowerCase() || '';
  const typeParam = searchParams.get('type') || '';
  const bedsParam = searchParams.get('beds') || '';
  const minPriceParam = parseInt(searchParams.get('minPrice') || '0', 10);
  const maxPriceParam = parseInt(searchParams.get('maxPrice') || '0', 10);
  const minSqmParam = parseInt(searchParams.get('minSqm') || '0', 10);
  const maxSqmParam = parseInt(searchParams.get('maxSqm') || '0', 10);

  // Filter properties
  const filteredProperties = mockProperties.filter(prop => {
    // 1. Location match
    if (locationParam && !prop.location.toLowerCase().includes(locationParam)) return false;

    // 2. Type match
    if (typeParam && typeParam !== 'Any') {
      if (!prop.type.toLowerCase().includes(typeParam.toLowerCase())) return false;
    }

    // 3. Bed match (parse specs "5 Beds • 6 Baths • 650 m²")
    if (bedsParam && bedsParam !== 'Any') {
      const bedsMatch = prop.specs.match(/(\d+)\s*Beds?/i);
      if (bedsMatch) {
        const beds = parseInt(bedsMatch[1], 10);
        const reqBeds = parseInt(bedsParam.replace('+', ''), 10);
        if (beds < reqBeds) return false;
      }
    }

    // 4. Price Match (parse price "€ 4,250,000")
    if (minPriceParam > 0 || maxPriceParam > 0) {
      const priceNum = parseInt(prop.price.replace(/[^\d]/g, ''), 10);
      if (minPriceParam > 0 && priceNum < minPriceParam) return false;
      if (maxPriceParam > 0 && priceNum > maxPriceParam) return false;
    }

    // 5. Sqm Match (parse specs "650 m²")
    if (minSqmParam > 0 || maxSqmParam > 0) {
      const sqmMatch = prop.specs.match(/(\d+(?:,\d+)?)\s*m²/i);
      if (sqmMatch) {
        const sqm = parseInt(sqmMatch[1].replace(',', ''), 10);
        if (minSqmParam > 0 && sqm < minSqmParam) return false;
        if (maxSqmParam > 0 && sqm > maxSqmParam) return false;
      }
    }

    return true;
  });

  // Reset to page 1 if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage) || 1;
  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (gridRef.current) {
      window.scrollTo({
        top: gridRef.current.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="properties-grid-section" ref={gridRef}>
      <div className="explore-container">
        
        {/* Results Header */}
        <div className={`properties-results-header reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
          <div className="results-count">
            {filteredProperties.length === 0 ? '0 Results' : t.propertiesPage.resultsCount
              .replace('{start}', ((currentPage - 1) * itemsPerPage + 1).toString())
              .replace('{end}', Math.min(currentPage * itemsPerPage, filteredProperties.length).toString())
              .replace('{total}', filteredProperties.length.toString())}
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
              <button 
                className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button 
                className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`explore-grid properties-main-grid ${viewMode === 'list' ? 'list-view' : ''} reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
          {currentProperties.map((prop, idx) => (
            <React.Fragment key={prop.id}>
              <PropertyCard 
                id={prop.id}
                imageSrc={prop.imageSrc}
                type={prop.type}
                price={prop.price}
                location={prop.location}
                specs={prop.specs}
              />
            </React.Fragment>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-container reveal-base reveal-up delay-300 is-revealed">
            <div className="pagination-pill">
              <button 
                className="page-arrow" 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                <span>Previous</span>
              </button>
              
              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button 
                    key={pageNum}
                    className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button 
                className="page-arrow" 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
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
