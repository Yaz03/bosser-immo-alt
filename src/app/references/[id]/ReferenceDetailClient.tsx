"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ReferenceDetailClient({ id }: { id: string }) {
  const { t } = useLanguage();
  const referencesPageData = (t as any).referencesPageData;
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (referencesPageData) {
      if (id === 'featured') {
        setData(referencesPageData.featured);
      } else {
        const item = referencesPageData.gallery.items.find((i: any) => String(i.id) === String(id));
        setData(item || null);
      }
    }
  }, [id, referencesPageData]);

  if (!referencesPageData) return null;
  
  if (data === null) {
    return (
      <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar invertOnLoad={true} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 className="editorial-headline" style={{ color: 'var(--navy)' }}>Reference Not Found</h1>
        </div>
        <Footer />
      </main>
    );
  }

  // Use featured property image logic vs gallery image logic
  const heroImage = data.id === 'featured' ? '/test_bg_penthouse.jpg' : data.image;

  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <Navbar invertOnLoad={true} />

      {/* Hero Section */}
      <section ref={heroRef} style={{ position: 'relative', width: '100%', height: '80vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, transform: heroVisible ? 'scale(1)' : 'scale(1.1)', transition: 'transform 2s ease-out' }}>
          <Image src={heroImage} alt={data.title} fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,36,51,0.9) 0%, rgba(4,36,51,0.1) 60%)' }} />
        
        <div className="global-padding" style={{ position: 'absolute', bottom: '4rem', left: 0, right: 0, color: 'var(--white)' }}>
          <div className="inner-page-container">
            <p className={`services-subtitle reveal-base reveal-up delay-100 ${heroVisible ? 'is-revealed' : ''}`} style={{ color: 'var(--white)', opacity: 0.8 }}>
               <span className="dot" style={{ backgroundColor: 'var(--white)' }}></span> {data.location}
            </p>
            <h1 className={`editorial-headline reveal-base reveal-up delay-200 ${heroVisible ? 'is-revealed' : ''}`} style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
              {data.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="global-padding" style={{ padding: '8rem 0' }}>
        <div className="inner-page-container reference-detail-grid">
          {/* Left Column: Description */}
          <div className="reveal-base reveal-up delay-300 is-revealed">
            <h3 className="italic-serif" style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--navy)' }}>
              Overview
            </h3>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'rgba(4,36,51,0.8)' }}>
              {data.fullDescription}
            </p>
          </div>

          {/* Right Column: Stats & Features */}
          <div className="reveal-base reveal-up delay-400 is-revealed">
            {data.stats && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(4,36,51,0.1)' }}>
                {data.stats.map((stat: any, idx: number) => (
                  <div key={idx}>
                    <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6, marginBottom: '0.5rem' }}>
                      {stat.label}
                    </p>
                    <p className="italic-serif" style={{ fontSize: '1.75rem', fontWeight: 400, color: 'var(--navy)' }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
            
            <h3 className="italic-serif" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--navy)' }}>
              Key Features
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {data.features?.map((feature: string, idx: number) => (
                <li key={idx} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(4,36,51,0.1)', color: 'rgba(4,36,51,0.8)' }}>
                  <span style={{ display: 'inline-block', width: '2rem', color: 'var(--bronze)' }}>—</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {data.galleryImages && data.galleryImages.length > 0 && (
        <section className="global-padding" style={{ paddingBottom: '10rem' }}>
          <div className="inner-page-container">
            <div className="reference-gallery-grid">
              {data.galleryImages.map((img: string, idx: number) => (
                <div key={idx} className="reveal-base reveal-scale is-revealed" style={{ position: 'relative', height: idx === 0 ? '600px' : '400px', borderRadius: '1rem', overflow: 'hidden' }}>
                  <Image src={img} alt={`${data.title} Gallery ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      <style>{`
        .reference-detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }
        .reference-gallery-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 900px) {
          .reference-detail-grid {
            grid-template-columns: 1fr 1fr;
            gap: 6rem;
          }
          .reference-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          /* Make the first image span full width for an editorial look */
          .reference-gallery-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </main>
  );
}
