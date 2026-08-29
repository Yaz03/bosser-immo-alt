"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Props {
  data: {
    id: string;
    tag: string;
    title: string;
    location: string;
    description: string;
    stats: { label: string; value: string }[];
  };
}

export default function FeaturedReferenceCurtain({ data }: Props) {
  const { ref, isVisible } = useScrollReveal(0.1);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="global-padding" style={{ paddingBottom: '6rem' }}>
      <div className="inner-page-container">
        
        {/* Top Meta Info */}
        <div className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`} style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <p className="services-subtitle">
              <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {data.tag}
            </p>
            <h2 className="explore-headline" style={{ marginTop: '1rem' }}>
              {data.title}
            </h2>
          </div>
          <p className="why-subhead" style={{ maxWidth: '400px' }}>
            {data.description}
          </p>
        </div>

        {/* Elegant Image Container (Clickable) */}
        <Link href={`/references/${data.id}`} style={{ display: 'block' }}>
          <div 
            ref={containerRef}
            className={`reveal-base reveal-scale delay-200 ${isVisible ? 'is-revealed' : ''}`}
            style={{
              position: 'relative',
              width: '100%',
              height: '70vh',
              minHeight: '500px',
              overflow: 'hidden',
              borderRadius: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
              cursor: 'pointer'
            }}
          >
            {/* Internal slow zoom on load */}
            <div style={{
              position: 'absolute',
              inset: 0,
              transform: isVisible ? 'scale(1)' : 'scale(1.1)',
              transition: 'transform 2s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}>
              <Image 
                src="/test_bg_penthouse.jpg"
                alt={data.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            
            {/* Overlay Stats */}
            <div 
              className={`reveal-base reveal-up delay-500 ${isVisible ? 'is-revealed' : ''}`}
              style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: '3rem',
                background: 'linear-gradient(to top, rgba(4,36,51,0.9), transparent)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4rem'
              }}
            >
              {data.stats.map((stat, idx) => (
                <div key={idx} style={{ color: 'var(--white)' }}>
                  <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8, marginBottom: '0.5rem' }}>
                    {stat.label}
                  </p>
                  <p className="italic-serif" style={{ fontSize: '2rem', fontWeight: 400 }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
