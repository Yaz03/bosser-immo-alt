import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <Link href={href} className={`property-card ${className}`}>
      <div className="property-image-wrapper">
        <Image src={imageSrc} alt={location} fill className="property-image" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      
      <div className="property-details-box">
        <div className="property-info-row">
          <span className="property-location">{location}</span>
          <span className="property-specs">{specs}</span>
        </div>
        <div className="property-bottom-row">
          <h3 className="property-type">{type}</h3>
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
