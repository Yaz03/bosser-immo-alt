"use client";

import React from 'react';
import { Property } from '@/data/properties';

interface PropertyLocationProps {
  locationData: Property['locationData'];
}

export default function PropertyLocation({ locationData }: PropertyLocationProps) {
  if (!locationData) return null;

  return (
    <div className="property-location-container property-section">
      <h2 className="property-section-title">Neighborhood & Location</h2>
      
      {/* Map Placeholder */}
      <div className="location-map-wrapper">
        {/* In production, integrate Google Maps iframe or API here */}
        <div className="map-placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <p>Interactive Map View</p>
          {locationData.coordinates && (
            <span className="coords-label">{locationData.coordinates[0]}, {locationData.coordinates[1]}</span>
          )}
        </div>
      </div>

    </div>
  );
}
