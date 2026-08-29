"use client";

import React from 'react';
import { Property } from '@/data/properties';

interface PropertyPOIsProps {
  locationData: Property['locationData'];
}

export default function PropertyPOIs({ locationData }: PropertyPOIsProps) {
  if (!locationData) return null;

  const hasSchools = locationData.schools && locationData.schools.length > 0;
  const hasTransport = locationData.transport && locationData.transport.length > 0;

  if (!hasSchools && !hasTransport) return null;

  return (
    <div className="property-sidebar-widget location-pois-widget" style={{ padding: '2rem', background: 'var(--white)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)', marginBottom: '2rem' }}>
      <div className="location-pois-list">
        {hasSchools && (
          <div className="poi-column" style={{ marginBottom: hasTransport ? '2rem' : '0' }}>
            <h4 className="poi-title" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--navy)', borderBottom: '1px solid rgba(4, 36, 51, 0.1)', paddingBottom: '0.5rem' }}>Nearby Schools</h4>
            <ul className="poi-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {locationData.schools!.map((school, idx) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px dashed rgba(4, 36, 51, 0.1)', fontFamily: 'var(--font-inter)', fontSize: '0.95rem' }}>
                  <span className="poi-name" style={{ color: 'var(--navy)' }}>{school.name}</span>
                  <span className="poi-dist" style={{ color: 'rgba(4, 36, 51, 0.6)' }}>{school.distance}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasTransport && (
          <div className="poi-column">
            <h4 className="poi-title" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--navy)', borderBottom: '1px solid rgba(4, 36, 51, 0.1)', paddingBottom: '0.5rem' }}>Public Transport</h4>
            <ul className="poi-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {locationData.transport!.map((transit, idx) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px dashed rgba(4, 36, 51, 0.1)', fontFamily: 'var(--font-inter)', fontSize: '0.95rem' }}>
                  <span className="poi-name" style={{ color: 'var(--navy)' }}>{transit.name} ({transit.type})</span>
                  <span className="poi-dist" style={{ color: 'rgba(4, 36, 51, 0.6)' }}>{transit.distance}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
