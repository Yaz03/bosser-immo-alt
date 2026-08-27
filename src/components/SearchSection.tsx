"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function SearchSection() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [propertyType, setPropertyType] = useState('Any type');
  const [bedrooms, setBedrooms] = useState('Any');
  const [yearBuilt, setYearBuilt] = useState('Any year');
  const [isVisible, setIsVisible] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Close dropdowns if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (!target.closest('.search-filter')) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (searchBarRef.current) {
      observer.observe(searchBarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSelect = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setActiveDropdown(null);
  };

  return (
    <section className="search-section">
      <div className={`search-container ${isVisible ? 'animate-pop' : ''}`} ref={searchBarRef}>
        
        <div className="search-header">
          <h2>Find your ideal property.</h2>
          <p>Search premium listings across the Rhein-Main region.</p>
        </div>

        {/* Main Search Bar */}
        <div className="search-bar">
          <div className="search-filter">
            <div className="filter-label">LOCATION</div>
            <div className="filter-input-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <input type="text" placeholder="Where are you looking?" className="search-input" />
            </div>
          </div>
          <div className="search-divider"></div>
          
          <div className="search-filter clickable" onClick={() => toggleDropdown('propertyType')}>
            <div className="filter-label">PROPERTY TYPE</div>
            <div className="filter-input-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <span className="search-value">{propertyType}</span>
              <svg className={`search-chevron ${activeDropdown === 'propertyType' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            {activeDropdown === 'propertyType' && (
              <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                <div className="dropdown-item" onClick={() => handleSelect(setPropertyType, 'Any')}>Any</div>
                <div className="dropdown-header">House</div>
                <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Bungalow')}>Bungalow</div>
                <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Semi-detached house')}>Semi-detached house</div>
                <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Single-family house')}>Single-family house</div>
                <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'End-of-terrace house')}>End-of-terrace house</div>
                <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Terraced house')}>Terraced house</div>
                <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Two-family house')}>Two-family house</div>
                <div className="dropdown-header">Apartment</div>
                <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Penthouse apartment')}>Penthouse apartment</div>
                <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Apartment')}>Apartment</div>
                <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Maisonette apartment')}>Maisonette apartment</div>
              </div>
            )}
          </div>
          
          <div className="search-divider"></div>
          
          <div className="search-filter clickable" onClick={() => toggleDropdown('bedrooms')}>
            <div className="filter-label">BEDROOMS</div>
            <div className="filter-input-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>
              <span className="search-value">{bedrooms}</span>
              <svg className={`search-chevron ${activeDropdown === 'bedrooms' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            {activeDropdown === 'bedrooms' && (
              <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                {['Any', '1+', '2+', '3+', '4+', '5+', '6+', '7+', '8+'].map(val => (
                  <div key={val} className="dropdown-item" onClick={() => handleSelect(setBedrooms, val)}>{val}</div>
                ))}
              </div>
            )}
          </div>
          
          <div className="search-divider"></div>
          
          <div className="search-filter clickable" onClick={() => toggleDropdown('yearBuilt')}>
            <div className="filter-label">YEAR BUILT</div>
            <div className="filter-input-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span className="search-value">{yearBuilt}</span>
              <svg className={`search-chevron ${activeDropdown === 'yearBuilt' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            {activeDropdown === 'yearBuilt' && (
              <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                {['Any year', 'Before 1900', '1900 – 1949', '1950 – 1979', '1980 – 1999', '2000 – 2009', '2010 – 2019', '2020 – 2024', '2025 or newer'].map(val => (
                  <div key={val} className="dropdown-item" onClick={() => handleSelect(setYearBuilt, val)}>{val}</div>
                ))}
              </div>
            )}
          </div>
          
          <button className={`search-btn ${isAdvancedOpen ? 'hidden-btn' : ''}`}>
            Search
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </div>
        
        {/* Advanced Search Header */}
        <div className="advanced-search-header">
          <div className="advanced-search">
            <input 
              type="checkbox" 
              id="advancedSearch" 
              className="custom-checkbox"
              checked={isAdvancedOpen}
              onChange={(e) => setIsAdvancedOpen(e.target.checked)}
            />
            <label htmlFor="advancedSearch">Advanced search</label>
          </div>
        </div>

        {/* Expandable Advanced Area */}
        <div className={`advanced-filters-wrapper ${isAdvancedOpen ? 'open' : ''}`}>
          <div className="advanced-filters-content">
            
            {/* Top Grid: Ranges and Dropdowns */}
            <div className="adv-grid-top">
              <div className="adv-filter-box">
                <div className="adv-label">PRICE</div>
                <div className="adv-input-group">
                  <input type="text" placeholder="Min price" />
                  <span>to</span>
                  <input type="text" placeholder="Max price" />
                </div>
              </div>
              <div className="adv-filter-box">
                <div className="adv-label">LIVING AREA</div>
                <div className="adv-input-group">
                  <input type="text" placeholder="Min m²" />
                  <span>to</span>
                  <input type="text" placeholder="Max m²" />
                </div>
              </div>
              <div className="adv-filter-box">
                <div className="adv-label">LAND AREA</div>
                <div className="adv-input-group">
                  <input type="text" placeholder="Min m²" />
                  <span>to</span>
                  <input type="text" placeholder="Max m²" />
                </div>
              </div>
              <div className="adv-filter-box">
                <div className="adv-label">BATHROOMS</div>
                <div className="adv-dropdown">
                  <span>Any</span> 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
              <div className="adv-filter-box">
                <div className="adv-label">ENERGY RATING</div>
                <div className="adv-dropdown">
                  <span>Any</span> 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>

            {/* Bottom Grid: Features and Availability */}
            <div className="adv-grid-bottom">
              <div className="adv-features">
                <div className="adv-label">FEATURES</div>
                <div className="adv-checkboxes">
                  <label><input type="checkbox"/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="14" width="18" height="8" rx="2" ry="2"></rect><path d="M3 14h18M5 14v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"></path></svg> Balcony</label>
                  <label><input type="checkbox"/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 14 6h7v7a7 7 0 0 1-10 7z"></path></svg> Garden</label>
                  <label><input type="checkbox"/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM5 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"></path></svg> Garage / Parking</label>
                  <label><input type="checkbox"/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 22h20M12 2v20M6 10c0-4 3-8 6-8s6 4 6 8"></path></svg> Terrace</label>
                  <label><input type="checkbox"/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><polyline points="12 6 12 18"></polyline><polyline points="9 9 12 6 15 9"></polyline><polyline points="9 15 12 18 15 15"></polyline></svg> Elevator</label>
                  <label><input type="checkbox"/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg> Fireplace</label>
                </div>
              </div>

              <div className="adv-filter-box" style={{ maxWidth: '250px' }}>
                <div className="adv-label">AVAILABILITY</div>
                <div className="adv-dropdown">
                  <span>Any</span> 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>

            {/* Footer row */}
            <div className="adv-footer">
              <button className="adv-reset">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> 
                Reset filters
              </button>
              <div className="adv-results">128 properties found</div>
              <button className="adv-submit">Show properties &rarr;</button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
