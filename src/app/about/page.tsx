"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CtaSection from '@/components/CtaSection';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import ApproachHeadline from '@/components/ApproachHeadline';
import HorizontalScrollPhilosophy from '@/components/HorizontalScrollPhilosophy';
import AboutStats from '@/components/AboutStats';
import Image from 'next/image';

export default function AboutPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: heritageRef, isVisible: heritageVisible } = useScrollReveal(0.2);
  const { ref: teamRef, isVisible: teamVisible } = useScrollReveal(0.1);
  const { ref: philosophyRef, isVisible: philosophyVisible } = useScrollReveal(0.1);

  const { t } = useLanguage();
  const about = (t as any).about;

  if (!about) return null;

  // Mock images for staggered philosophy section
  const philosophyImages = ['/card1.jpg', '/card2.jpg', '/card3.jpg'];
  // Mock vibrant portraits for founders
  const portraitImages = ['/images/owners_editorial.jpg', '/images/owners_cream.jpg'];

  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      {/* 1. Hero Section */}
      <div className="properties-editorial-hero global-padding" ref={heroRef} style={{ paddingBottom: '0' }}>
        <Navbar invertOnLoad={true} />
        
        <div className="inner-page-container" style={{ width: '100%', paddingBottom: '4rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h1 className={`editorial-headline reveal-base reveal-up delay-100 ${heroVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 500px', fontWeight: 500, letterSpacing: '-0.05em' }}>
              {about.hero.title} <br/>
              <span className="italic-serif" style={{ fontWeight: 400, letterSpacing: '-0.02em' }}>{about.hero.titleSerif}</span>
            </h1>
            <div className={`reveal-base reveal-up delay-200 ${heroVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 300px', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <p className="why-subhead" style={{ maxWidth: '400px' }}>
                {about.hero.description}
              </p>
            </div>
          </div>
        </div>

        {/* Cinematic Establishing Shot */}
        <div className={`inner-page-container reveal-base reveal-scale delay-300 ${heroVisible ? 'is-revealed' : ''}`} style={{ width: '100%', paddingBottom: '6rem' }}>
          <div style={{ width: '100%', height: '70vh', minHeight: '500px', position: 'relative', borderRadius: '1.5rem', overflow: 'hidden' }}>
            <Image 
              src="/images/owners_bg_wide.jpg"  
            alt="Bossert Immobilien Legacy"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          </div>
        </div>
      </div>

      {/* 2. Our Approach (Massive Typography Layout) */}
      <section className="global-padding" ref={heritageRef} style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="inner-page-container">
          
          <div className={`reveal-base reveal-up ${heritageVisible ? 'is-revealed' : ''}`} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', marginLeft: '0.5rem' }}>
              {about.approach.tag}
            </span>
          </div>

          <ApproachHeadline 
            l1={about.approach.l1}
            s1={about.approach.s1}
            l2={about.approach.l2}
            l3={about.approach.l3}
            s2={about.approach.s2}
            l4={about.approach.l4}
          />
        </div>
      </section>

      {/* 3. Our Philosophy (Horizontal Scroll Filmstrip) */}
      <HorizontalScrollPhilosophy 
        tag={about.philosophy.tag}
        title={about.philosophy.title}
        titleSerif={about.philosophy.titleSerif}
        description={about.philosophy.description}
        pillars={about.philosophy.pillars}
        images={philosophyImages}
      />
      
      {/* 3. Stats Section */}
      <AboutStats stats={about.stats} />

      {/* 4. The Leadership / Founders */}
      <section className="global-padding" ref={teamRef} style={{ paddingTop: '10rem', paddingBottom: '4rem' }}>
        <div className="inner-page-container">
        <div className={`reveal-base reveal-up ${teamVisible ? 'is-revealed' : ''}`} style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <p className="services-subtitle" style={{ justifyContent: 'center' }}>
             <span className="dot"></span> {about.team.tag}
          </p>
          <h2 className="explore-headline" style={{ marginTop: '1rem' }}>
            {about.team.title} <br /><span className="italic-serif">{about.team.titleSerif}</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem' }}>
          {about.team.members.map((member: any, idx: number) => (
            <div key={idx} className={`reveal-base reveal-up delay-${(idx + 1) * 200} ${teamVisible ? 'is-revealed' : ''}`}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem' }}>
                <Image 
                  src={portraitImages[idx % portraitImages.length]} 
                  alt={member.name} 
                  fill 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className="why-headline" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{member.name}</h3>
              <p className="italic-serif" style={{ color: 'rgba(4,36,51,0.6)', fontSize: '1.2rem', marginBottom: '1.5rem' }}>{member.title}</p>
              <p className="why-subhead" style={{ lineHeight: '1.8' }}>
                {member.quote}
              </p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 5. CTA */}
      <CtaSection variant="about" />

      <Footer />
    </main>
  );
}
