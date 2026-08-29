"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface GalleryItem {
  id: number | string;
  title: string;
  location: string;
  type: string;
  image: string;
  size: 'large' | 'square' | 'tall';
}

interface Props {
  data: {
    tag: string;
    title: string;
    titleSerif: string;
    items: GalleryItem[];
  };
}

// Elegant Hover Card Component
function ElegantCard({ item, index }: { item: GalleryItem, index: number }) {
  const { ref, isVisible } = useScrollReveal(0.1);

  // Determine height based on 'size'
  const heightClass = item.size === 'tall' ? '600px' : item.size === 'large' ? '500px' : '400px';

  return (
    <div 
      ref={ref}
      className={`reveal-base reveal-up delay-${(index % 3 + 1) * 100} ${isVisible ? 'is-revealed' : ''}`}
      style={{ marginBottom: '3rem' }}
    >
      <Link href={`/references/${item.id}`} style={{ display: 'block' }}>
        <div
          className="reference-card-elegant"
          style={{
            position: 'relative',
            width: '100%',
            height: heightClass,
            borderRadius: '1rem',
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(4,36,51,0.05)'
          }}
        >
          <Image 
            src={item.image} 
            alt={item.title}
            fill
            className="reference-image"
            style={{ objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
          
          {/* Subtle Gradient Overlay */}
          <div 
            className="reference-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(4,36,51,0.85) 0%, rgba(4,36,51,0) 60%)',
              transition: 'background 0.5s ease'
            }}
          ></div>

          {/* Content */}
          <div 
            className="reference-content"
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '2rem',
              right: '2rem',
              color: 'var(--white)',
              transform: 'translateY(10px)',
              transition: 'transform 0.5s ease',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.9, marginBottom: '0.5rem' }}>
              {item.type} • {item.location}
            </p>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 500 }}>
              {item.title}
            </h3>
          </div>
        </div>
      </Link>
      <style>{`
        .reference-card-elegant:hover .reference-image {
          transform: scale(1.08);
        }
        .reference-card-elegant:hover .reference-overlay {
          background: linear-gradient(to top, rgba(4,36,51,0.95) 0%, rgba(4,36,51,0.2) 60%);
        }
        .reference-card-elegant:hover .reference-content {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default function ReferencesMasonryGallery({ data }: Props) {
  // Split items into 2 columns for a masonry look
  const col1 = data.items.filter((_, i) => i % 2 === 0);
  const col2 = data.items.filter((_, i) => i % 2 !== 0);

  return (
    <section className="global-padding" style={{ paddingTop: '8rem', paddingBottom: '10rem', backgroundColor: 'var(--cream)' }}>
      <div className="inner-page-container">
        
        {/* Header */}
        <div style={{ marginBottom: '6rem', maxWidth: '700px' }}>
          <p className="services-subtitle">
            <span className="dot"></span> {data.tag}
          </p>
          <h2 className="explore-headline" style={{ marginTop: '1rem', fontSize: '3.5rem' }}>
            {data.title} <span className="italic-serif">{data.titleSerif}</span>
          </h2>
        </div>

        {/* Masonry Grid (2 columns on desktop) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          
          {/* Column 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0rem' }}>
            {col1.map((item, idx) => (
              <ElegantCard key={item.id} item={item} index={idx * 2} />
            ))}
          </div>

          {/* Column 2 (Offset slightly on desktop for true masonry feel) */}
          <div className="masonry-col-2" style={{ display: 'flex', flexDirection: 'column', gap: '0rem' }}>
            {col2.map((item, idx) => (
              <ElegantCard key={item.id} item={item} index={idx * 2 + 1} />
            ))}
          </div>

        </div>
      </div>
      <style>{`
        @media (min-width: 768px) {
          .masonry-col-2 {
            margin-top: 6rem; /* Stagger the second column */
          }
        }
      `}</style>
    </section>
  );
}
