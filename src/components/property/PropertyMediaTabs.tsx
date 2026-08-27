"use client";

import React, { useState } from 'react';
import { Property } from '@/data/properties';

interface PropertyMediaTabsProps {
  property: Property;
}

export default function PropertyMediaTabs({ property }: PropertyMediaTabsProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'tour' | 'floorplans' | 'documents'>('video');

  const hasMedia = property.videoUrl || property.virtualTourUrl || (property.floorPlans && property.floorPlans.length > 0) || (property.documents && property.documents.length > 0);

  if (!hasMedia) return null;

  return (
    <div className="property-media-tabs-container property-section">
      <div className="media-tabs-header">
        {property.videoUrl && (
          <button 
            className={`media-tab-btn ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            Property Video
          </button>
        )}
        {property.virtualTourUrl && (
          <button 
            className={`media-tab-btn ${activeTab === 'tour' ? 'active' : ''}`}
            onClick={() => setActiveTab('tour')}
          >
            3D Virtual Tour
          </button>
        )}
        {property.floorPlans && property.floorPlans.length > 0 && (
          <button 
            className={`media-tab-btn ${activeTab === 'floorplans' ? 'active' : ''}`}
            onClick={() => setActiveTab('floorplans')}
          >
            Floor Plans
          </button>
        )}
        {property.documents && property.documents.length > 0 && (
          <button 
            className={`media-tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </button>
        )}
      </div>

      <div className="media-tab-content">
        {activeTab === 'video' && property.videoUrl && (
          <div className="media-video-wrapper">
            <iframe 
              src={property.videoUrl} 
              title="Property Video"
              allowFullScreen
              className="media-iframe"
            ></iframe>
          </div>
        )}

        {activeTab === 'tour' && property.virtualTourUrl && (
          <div className="media-tour-wrapper">
            <iframe 
              src={property.virtualTourUrl} 
              title="Virtual Tour"
              allowFullScreen
              className="media-iframe"
            ></iframe>
          </div>
        )}

        {activeTab === 'floorplans' && property.floorPlans && (
          <div className="media-floorplans-grid">
            {property.floorPlans.map((plan, idx) => (
              <div key={idx} className="floorplan-card">
                <img src={plan} alt={`Floor Plan ${idx + 1}`} className="floorplan-image" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'documents' && property.documents && (
          <div className="media-documents-list">
            {property.documents.map((doc, idx) => (
              <a key={idx} href={doc.url} className="document-download-card" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span>{doc.title}</span>
                <span className="download-icon">↓</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
