"use client";

import React from 'react';
import { Property } from '@/data/properties';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

interface PropertyHeaderProps {
  property: Property;
}

export default function PropertyHeader({ property }: PropertyHeaderProps) {
  const { t } = useLanguage();
  const displayType = (t as any).propertyTranslations?.types?.[property.type] || property.type;

  let displaySpecs = property.specs;
  if ((t as any).propertyTranslations?.specs) {
    displaySpecs = displaySpecs
      .replace('Beds', (t as any).propertyTranslations.specs.beds)
      .replace('Baths', (t as any).propertyTranslations.specs.baths);
  }

  return (
    <div className="property-header-container">
      <div className="property-header-main">
        <h1 className="property-title">{displayType}</h1>
        <p className="property-location">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {property.location}
        </p>
        <div className="property-specs-pills">
          {displaySpecs.split('•').map((spec, idx) => (
            <span key={idx} className="spec-pill">{spec.trim()}</span>
          ))}
        </div>
      </div>
      
      <div className="property-header-action">
        <div className="property-price">{property.price}</div>
        <Button variant="dark">
          Request Viewing
        </Button>
      </div>
    </div>
  );
}
