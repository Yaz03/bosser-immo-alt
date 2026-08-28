import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

interface PropertyCardProps {
  id?: string;
  imageSrc: string;
  type: string;
  price: string;
  location: string;
  specs: string;
  className?: string;
}

export default function PropertyCard({ id, imageSrc, type, price, location, specs, className = "" }: PropertyCardProps) {
  const href = id ? `/properties/${id}` : "#";
  const { t } = useLanguage();

  const displayType = (t as any).propertyTranslations?.types?.[type] || type;
  
  // Replace "Beds" and "Baths" safely
  let displaySpecs = specs;
  if ((t as any).propertyTranslations?.specs) {
    displaySpecs = displaySpecs
      .replace('Beds', (t as any).propertyTranslations.specs.beds)
      .replace('Baths', (t as any).propertyTranslations.specs.baths);
  }

  return (
    <Link href={href} className={`property-card ${className}`}>
      <div className="property-image-wrapper">
        <Image src={imageSrc} alt={location} fill className="property-image" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      
      <div className="property-details-box">
        <div className="property-info-row">
          <span className="property-location">{location}</span>
          <span className="property-specs">{displaySpecs}</span>
        </div>
        <div className="property-bottom-row">
          <h3 className="property-type">{displayType}</h3>
          <div className="property-action-group">
            <div className="property-price-tag">{price}</div>
            <div className="property-arrow-box">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
