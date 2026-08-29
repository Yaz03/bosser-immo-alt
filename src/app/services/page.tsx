"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CtaSection from '@/components/CtaSection';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import ServicesOverviewCards from '@/components/ServicesOverviewCards';
import ApproachHeadline from '@/components/ApproachHeadline';
import ServicesBenefitsGrid from '@/components/ServicesBenefitsGrid';
import TestimonialSection from '@/components/TestimonialSection';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: introRef, isVisible: introVisible } = useScrollReveal(0.2);
  const { t } = useLanguage();
  const servicesPageData = (t as any).servicesPageData;

  if (!servicesPageData) return null;

  // Mock images for staggered philosophy section
  const serviceImages = ['/card1.jpg', '/card2.jpg', '/card3.jpg'];

  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      {/* 1. Hero Section */}
      <div className="properties-editorial-hero global-padding" ref={heroRef} style={{ paddingBottom: '0' }}>
        <Navbar invertOnLoad={true} />
        
        <div className="inner-page-container" style={{ width: '100%', paddingBottom: '4rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h1 className={`editorial-headline reveal-base reveal-up delay-100 ${heroVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 500px', fontWeight: 500, letterSpacing: '-0.05em' }}>
              {servicesPageData.hero.title} <br/>
              <span className="italic-serif" style={{ fontWeight: 400, letterSpacing: '-0.02em' }}>{servicesPageData.hero.titleSerif}</span>
            </h1>
            <div className={`reveal-base reveal-up delay-200 ${heroVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 300px', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2rem' }}>
              <p className="why-subhead" style={{ maxWidth: '400px', textAlign: 'right' }}>
                {servicesPageData.hero.description}
              </p>
              <Link href="/contact" className="explore-btn explore-btn-dark">
                {servicesPageData.hero.cta}
                <div className="explore-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Cinematic Establishing Shot */}
        <div className={`inner-page-container reveal-base reveal-scale delay-300 ${heroVisible ? 'is-revealed' : ''}`} style={{ width: '100%', paddingBottom: '6rem' }}>
          <div style={{ width: '100%', height: '70vh', minHeight: '500px', position: 'relative', borderRadius: '1.5rem', overflow: 'hidden' }}>
            <Image 
              src="/images/services_hero.jpg"  
              alt="Premium Services"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </div>

      {/* 2. Intro / Problem Framing */}
      <section className="global-padding" ref={introRef} style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="inner-page-container">
          <div className={`reveal-base reveal-up ${introVisible ? 'is-revealed' : ''}`} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', marginLeft: '0.5rem' }}>
              {servicesPageData.intro.tag}
            </span>
          </div>

          <ApproachHeadline 
            l1={servicesPageData.intro.l1}
            s1={servicesPageData.intro.s1}
            l2={servicesPageData.intro.l2}
            l3={servicesPageData.intro.l3}
            s2={servicesPageData.intro.s2}
            l4={servicesPageData.intro.l4}
          />
          
          <div className={`reveal-base reveal-up delay-200 ${introVisible ? 'is-revealed' : ''}`} style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', marginTop: '4rem' }}>
            <div style={{ flex: '1 1 300px' }}>
              <p className="why-subhead" style={{ fontSize: '1.25rem' }}>{servicesPageData.intro.textLeft}</p>
            </div>
            <div style={{ flex: '1 1 300px' }}>
              <p className="why-subhead" style={{ fontSize: '1.25rem' }}>{servicesPageData.intro.textRight}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Benefits Grid (6 Cards) */}
      <ServicesBenefitsGrid data={servicesPageData.benefits} />

      {/* 3 & 5. Section Intro + Services Overview (3 blocks) */}
      <ServicesOverviewCards 
        data={servicesPageData.overview}
        images={serviceImages}
      />

      {/* 6. Testimonials */}
      <TestimonialSection />
      
      {/* 7. Contact Form Section */}
      <CtaSection variant="services" />

      <Footer />
    </main>
  );
}
