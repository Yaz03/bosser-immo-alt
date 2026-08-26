import React from 'react';
import PropertyCard from './PropertyCard';

export default function ExploreSection() {
  return (
    <section className="explore-section">
      <div className="explore-container">
        
        {/* Top Header */}
        <div className="explore-header">
          <div className="explore-header-left">
            <div className="explore-subtitle">
              <span className="dot"></span> FEATURED LISTINGS
            </div>
            <h2 className="explore-headline">
              Selected <br /><span className="italic-serif">properties.</span>
            </h2>
          </div>
          
          <div className="explore-header-right">
            <p className="explore-subhead">
              Discover a curated collection of exceptional homes tailored to your lifestyle. Every property is hand-selected for its architectural merit and premium location.
            </p>
            <a href="#" className="explore-btn explore-btn-dark">
              VIEW ALL PROPERTIES
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
          <button className="filter-pill active">All Properties</button>
          <button className="filter-pill">Villas</button>
          <button className="filter-pill">Penthouses</button>
          <button className="filter-pill">Historic Estates</button>
          <button className="filter-pill">Apartments</button>
          <button className="filter-pill">Waterfront</button>
          <button className="filter-pill">Off-Market</button>
        </div>
        
        {/* Bottom Functional Grid */}
        <div className="explore-grid">
          <PropertyCard 
            imageSrc="/images/prop_villa_1787771383699.jpg"
            type="Luxury Villa"
            price="€ 4,250,000"
            location="Los Angeles, CA"
            specs="5 Beds • 6 Baths • 650 m²"
          />
          <PropertyCard 
            imageSrc="/images/prop_estate_1787771411381.jpg"
            type="Historic Estate"
            price="€ 8,900,000"
            location="Cotswolds, UK"
            specs="8 Beds • 10 Baths • 1,200 m²"
          />
          <PropertyCard 
            imageSrc="/images/prop_penthouse_1787771396787.jpg"
            type="Penthouse"
            price="€ 3,100,000"
            location="London, UK"
            specs="3 Beds • 3 Baths • 280 m²"
          />
          <PropertyCard 
            imageSrc="/images/prop_apartment_new.jpg"
            type="Modern Apartment"
            price="€ 1,850,000"
            location="Malibu, CA"
            specs="2 Beds • 2 Baths • 160 m²"
          />
        </div>
        
      </div>
    </section>
  );
}
