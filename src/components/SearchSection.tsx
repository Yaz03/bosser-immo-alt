"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function SearchSection({ hideHeader = false, isDarkBg = false, hideResultsCount = false }: { hideHeader?: boolean, isDarkBg?: boolean, hideResultsCount?: boolean }) {
  const { t } = useLanguage();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [transactionType, setTransactionType] = useState('purchase');
  
  const [propertyType, setPropertyType] = useState('Any');
  const [bedrooms, setBedrooms] = useState('Any');
  const [yearBuilt, setYearBuilt] = useState('Any');
  const [advBathrooms, setAdvBathrooms] = useState('Any');
  const [energyRating, setEnergyRating] = useState('Any');
  const [availability, setAvailability] = useState('Any');
  
  // New States for inputs
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minSqm, setMinSqm] = useState('');
  const [maxSqm, setMaxSqm] = useState('');
  const [features, setFeatures] = useState<string[]>([]);

  const router = useRouter();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Use the new reusable hook
  const { ref: searchBarRef, isVisible } = useScrollReveal(0.2);

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

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSelect = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setActiveDropdown(null);
  };

  const handleReset = () => {
    setPropertyType('Any');
    setBedrooms('Any');
    setYearBuilt('Any');
    setAdvBathrooms('Any');
    setEnergyRating('Any');
    setAvailability('Any');
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    setMinSqm('');
    setMaxSqm('');
    setFeatures([]);
  };

  const handleFeatureToggle = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (transactionType !== 'purchase') params.set('transaction', transactionType);
    if (location) params.set('location', location);
    if (propertyType !== 'Any') params.set('type', propertyType);
    if (bedrooms !== 'Any') params.set('beds', bedrooms);
    if (yearBuilt !== 'Any') params.set('year', yearBuilt);
    
    if (isAdvancedOpen) {
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);
      if (minSqm) params.set('minSqm', minSqm);
      if (maxSqm) params.set('maxSqm', maxSqm);
      if (advBathrooms !== 'Any') params.set('baths', advBathrooms);
      if (energyRating !== 'Any') params.set('energy', energyRating);
      if (availability !== 'Any') params.set('availability', availability);
      if (features.length > 0) params.set('features', features.join(','));
    }

    router.push('/properties?' + params.toString());
  };

  return (
    <section className={`search-section ${isDarkBg ? 'search-section-dark' : ''}`}>
      <div className={`search-container reveal-base reveal-scale ${isVisible ? 'is-revealed' : ''}`} ref={(el) => {
        searchBarRef.current = el;
        if (el) containerRef.current = el;
      }}>
        
        {!hideHeader && (
          <div className="search-header">
            <h2>{t.search.headline}</h2>
            <p>{t.search.subhead}</p>
          </div>
        )}

        {/* Transaction Type Tabs */}
        <div className="search-tabs-container">
          <button 
            className={`search-tab ${transactionType === 'purchase' ? 'active' : ''}`} 
            onClick={() => setTransactionType('purchase')}
          >
            {t.search.purchase}
          </button>
          <button 
            className={`search-tab ${transactionType === 'rent' ? 'active' : ''}`} 
            onClick={() => setTransactionType('rent')}
          >
            {t.search.rent}
          </button>
          <button 
            className={`search-tab ${transactionType === 'investment' ? 'active' : ''}`} 
            onClick={() => setTransactionType('investment')}
          >
            {t.search.investment}
          </button>
        </div>

        {/* Main Search Bar */}
        <div className="search-bar">
          <div className="search-filter">
            <div className="filter-label">{t.search.location}</div>
            <div className="filter-input-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <input type="text" placeholder={t.search.placeholder} className="search-input" value={location} onChange={e => setLocation(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
            </div>
          </div>
          <div className="search-divider"></div>
          
          <div className="search-filter clickable" onClick={() => toggleDropdown('propertyType')}>
            <div className="filter-label">{t.search.type}</div>
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
            <div className="filter-label">{t.search.bedrooms}</div>
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
            <div className="filter-label">{t.search.yearBuilt}</div>
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
          
          <button className={`search-btn ${isAdvancedOpen ? 'hidden-btn' : ''}`} onClick={handleSearch}>
            {t.search.searchBtn}
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
            <label htmlFor="advancedSearch">{t.search.advancedBtn}</label>
          </div>
        </div>

        {/* Expandable Advanced Area */}
        <div className={`advanced-filters-wrapper ${isAdvancedOpen ? 'open' : ''}`}>
          <div className="advanced-filters-content">
            
            {/* Top Grid: Ranges and Dropdowns */}
            <div className="adv-grid-top">
              <div className="adv-filter-box">
                <div className="adv-label">{t.search.price}</div>
                <div className="adv-input-group">
                  <input type="number" min="0" placeholder={t.search.filters.minPrice} value={minPrice} onChange={e => setMinPrice(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                  <span>{t.search.to}</span>
                  <input type="number" min="0" placeholder={t.search.filters.maxPrice} value={maxPrice} onChange={e => setMaxPrice(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                </div>
              </div>
              <div className="adv-filter-box">
                <div className="adv-label">{t.search.size}</div>
                <div className="adv-input-group">
                  <input type="number" min="0" placeholder={t.search.filters.minSqm} value={minSqm} onChange={e => setMinSqm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                  <span>{t.search.to}</span>
                  <input type="number" min="0" placeholder={t.search.filters.maxSqm} value={maxSqm} onChange={e => setMaxSqm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                </div>
              </div>
              <div className="adv-filter-box">
                <div className="adv-label">{t.search.landArea}</div>
                <div className="adv-input-group">
                  <input type="number" min="0" placeholder={t.search.filters.minSqm} />
                  <span>{t.search.to}</span>
                  <input type="number" min="0" placeholder={t.search.filters.maxSqm} />
                </div>
              </div>
              <div className="adv-filter-box clickable" onClick={() => toggleDropdown('advBathrooms')}>
                <div className="adv-label">{t.search.bathrooms}</div>
                <div className="adv-dropdown">
                  <span>{advBathrooms === 'Any' ? t.search.any : advBathrooms}</span> 
                  <svg className={`search-chevron ${activeDropdown === 'advBathrooms' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                {activeDropdown === 'advBathrooms' && (
                  <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    {['Any', '1+', '2+', '3+', '4+'].map(val => (
                      <div key={val} className="dropdown-item" onClick={() => handleSelect(setAdvBathrooms, val)}>
                        {val === 'Any' ? t.search.any : val}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="adv-filter-box clickable" onClick={() => toggleDropdown('energyRating')}>
                <div className="adv-label">{t.search.energyRating}</div>
                <div className="adv-dropdown">
                  <span>{energyRating === 'Any' ? t.search.any : energyRating}</span> 
                  <svg className={`search-chevron ${activeDropdown === 'energyRating' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                {activeDropdown === 'energyRating' && (
                  <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    {['Any', 'A+', 'A', 'B', 'C', 'D', 'E'].map(val => (
                      <div key={val} className="dropdown-item" onClick={() => handleSelect(setEnergyRating, val)}>
                        {val === 'Any' ? t.search.any : val}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Grid: Features and Availability */}
            <div className="adv-grid-bottom">
              <div className="adv-features">
                <div className="adv-label">{t.search.features}</div>
                <div className="adv-checkboxes">
                  <label><input type="checkbox" checked={features.includes('balcony')} onChange={() => handleFeatureToggle('balcony')}/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="14" width="18" height="8" rx="2" ry="2"></rect><path d="M3 14h18M5 14v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"></path></svg> {t.search.filters.balcony}</label>
                  <label><input type="checkbox" checked={features.includes('garden')} onChange={() => handleFeatureToggle('garden')}/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 14 6h7v7a7 7 0 0 1-10 7z"></path></svg> {t.search.filters.garden}</label>
                  <label><input type="checkbox" checked={features.includes('garage')} onChange={() => handleFeatureToggle('garage')}/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM5 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"></path></svg> {t.search.filters.garage}</label>
                  <label><input type="checkbox" checked={features.includes('terrace')} onChange={() => handleFeatureToggle('terrace')}/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 22h20M12 2v20M6 10c0-4 3-8 6-8s6 4 6 8"></path></svg> {t.search.filters.terrace}</label>
                  <label><input type="checkbox" checked={features.includes('elevator')} onChange={() => handleFeatureToggle('elevator')}/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><polyline points="12 6 12 18"></polyline><polyline points="9 9 12 6 15 9"></polyline><polyline points="9 15 12 18 15 15"></polyline></svg> {t.search.filters.elevator}</label>
                  <label><input type="checkbox" checked={features.includes('fireplace')} onChange={() => handleFeatureToggle('fireplace')}/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg> {t.search.filters.fireplace}</label>
                </div>
              </div>

              <div className="adv-filter-box clickable" style={{ maxWidth: '250px' }} onClick={() => toggleDropdown('availability')}>
                <div className="adv-label">{t.search.availability}</div>
                <div className="adv-dropdown">
                  <span>{availability === 'Any' ? t.search.any : availability}</span> 
                  <svg className={`search-chevron ${activeDropdown === 'availability' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                {activeDropdown === 'availability' && (
                  <div className="custom-dropdown-menu align-right" onClick={(e) => e.stopPropagation()}>
                    {['Any', 'Available immediately', 'By agreement', 'Rented', 'Reserved'].map(val => (
                      <div key={val} className="dropdown-item" onClick={() => handleSelect(setAvailability, val)}>
                        {val === 'Any' ? t.search.any : val}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer row */}
            <div className="adv-footer">
              <button className="adv-reset" onClick={handleReset}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> 
                {t.search.reset}
              </button>
              {!hideResultsCount && <div className="adv-results">{t.search.found}</div>}
              <button className="adv-submit" onClick={handleSearch}>{t.search.show} &rarr;</button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
