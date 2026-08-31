"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import ConsultationModal from '@/components/modals/ConsultationModal';
import ProcessList from '@/components/ProcessList';

export default function ForOwnersPage() {
  const { t } = useLanguage();
  const data = (t as any).owners;

  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: narrativeRef, isVisible: narrativeVisible } = useScrollReveal(0.2);
  const { ref: pillarsRef, isVisible: pillarsVisible } = useScrollReveal(0.1);
  const { ref: valuationRef, isVisible: valuationVisible } = useScrollReveal(0.1);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal(0.1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRoute, setModalRoute] = useState<'top_contact' | 'consultation' | 'valuation' | 'buyer' | 'general' | 'profile'>('top_contact');

  if (!data) return null;

  const openModal = (route: typeof modalRoute) => {
    setModalRoute(route);
    setIsModalOpen(true);
  };

  const getPillarIcon = (idx: number) => {
    if (idx === 0) { // Selling
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      );
    } else if (idx === 1) { // Rent out
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      );
    } else { // Valuation
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path>
        </svg>
      );
    }
  };

  return (
    <main style={{ backgroundColor: 'var(--navy)', position: 'relative' }}>
      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialRoute={modalRoute} 
      />
      
      {/* 1. Cinematic Hero Section */}
      <div className="properties-editorial-hero global-padding" ref={heroRef} style={{ paddingBottom: '0' }}>
        <Navbar invertOnLoad={true} />
        
        <div className="inner-page-container" style={{ width: '100%', paddingBottom: '4rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h1 className={`editorial-headline reveal-base reveal-up delay-100 ${heroVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 500px', fontWeight: 500, letterSpacing: '-0.05em' }}>
              {data.hero.title} <br/>
              <span className="italic-serif" style={{ fontWeight: 400, letterSpacing: '-0.02em' }}>{data.hero.titleSerif}</span>
            </h1>
            <div className={`reveal-base reveal-up delay-200 ${heroVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 300px', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2rem' }}>
              <p className="why-subhead" style={{ maxWidth: '400px', textAlign: 'right' }}>
                {data.hero.subhead}
              </p>
              <button 
                onClick={() => openModal('consultation')}
                className="explore-btn explore-btn-dark"
                style={{ border: 'none', cursor: 'pointer', fontFamily: 'var(--font-satoshi), sans-serif', textDecoration: 'none' }}
              >
                {data.hero.cta || 'Get your Free Consultation'}
                <div className="explore-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Establishing Shot */}
        <div className={`inner-page-container reveal-base reveal-scale delay-300 ${heroVisible ? 'is-revealed' : ''}`} style={{ width: '100%', paddingBottom: '6rem' }}>
          <div style={{ width: '100%', height: '70vh', minHeight: '500px', position: 'relative', borderRadius: '1.5rem', overflow: 'hidden' }}>
            <Image 
              src="/images/services_hero.jpg"  
              alt="Premium Properties"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </div>

      {/* 2. The Narrative (Cream Background) */}
      <section className="global-padding" ref={narrativeRef} style={{ backgroundColor: 'var(--cream)', paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div className="inner-page-container">
          <div className={`reveal-base reveal-up ${narrativeVisible ? 'is-revealed' : ''}`} style={{ marginBottom: '4rem' }}>
            <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', marginLeft: '0.5rem' }}>
              {data.narrative.tag}
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-start' }}>
            <h2 className={`explore-headline reveal-base reveal-up delay-100 ${narrativeVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 400px', fontSize: '3rem', lineHeight: '1.1', color: 'var(--navy)' }}>
              {data.narrative.headline}
            </h2>
            <div style={{ flex: '1 1 400px', display: 'flex', alignItems: 'center' }}>
              <p className={`why-subhead reveal-base reveal-up delay-200 ${narrativeVisible ? 'is-revealed' : ''}`} style={{ fontSize: '1.25rem', color: 'rgba(4,36,51,0.8)' }}>
                {data.narrative.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars (Image Cards with Hover Animation) */}
      <section className="global-padding" ref={pillarsRef} style={{ backgroundColor: 'var(--navy)', paddingTop: '8rem', paddingBottom: '12rem', position: 'relative' }}>
        {/* Subtle grid pattern for texture */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(var(--cream) 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: 0 }}></div>
        
        <div className="inner-page-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {data.pillars.map((pillar: any, idx: number) => {
              const bgImages = [
                '/images/prop_villa_1787771383699.jpg', // Selling (Villa)
                '/images/prop_apartment_new.jpg', // Rent out (Apartment)
                '/images/valuation_blueprint.jpg' // Valuation (Blueprints & Analytics)
              ];
              return (
                <div 
                  key={idx} 
                  className={`reveal-base reveal-up delay-${(idx + 1) * 100} ${pillarsVisible ? 'is-revealed' : ''}`}
                  style={{ height: '100%', minHeight: '450px' }}
                >
                  <div style={{
                      position: 'relative',
                      borderRadius: '1.5rem',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      height: '100%',
                      color: 'var(--cream)',
                      cursor: 'pointer',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '1rem'
                    }}
                    onMouseEnter={(e) => {
                      const img = e.currentTarget.querySelector('.pillar-bg-img') as HTMLElement;
                      if(img) img.style.transform = 'scale(1.05)';
                      const overlay = e.currentTarget.querySelector('.pillar-overlay') as HTMLElement;
                      if(overlay) overlay.style.background = 'linear-gradient(to top, rgba(4,36,51,0.95) 0%, rgba(4,36,51,0.4) 60%, transparent 100%)';
                    }}
                    onMouseLeave={(e) => {
                      const img = e.currentTarget.querySelector('.pillar-bg-img') as HTMLElement;
                      if(img) img.style.transform = 'scale(1)';
                      const overlay = e.currentTarget.querySelector('.pillar-overlay') as HTMLElement;
                      if(overlay) overlay.style.background = 'linear-gradient(to top, rgba(4,36,51,0.9) 0%, rgba(4,36,51,0.2) 60%, transparent 100%)';
                    }}
                  >
                    {/* Background Image Wrapper with Corner Magic */}
                    <div style={{ position: 'absolute', inset: '1rem', borderRadius: '1rem', overflow: 'hidden', zIndex: 0 }}>
                      <div className="pillar-bg-img" style={{ position: 'absolute', inset: 0, transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        <Image 
                          src={bgImages[idx] || '/images/services_hero.jpg'}
                          alt={pillar.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      
                      {/* Dark Gradient Overlay */}
                      <div className="pillar-overlay" style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, rgba(4,36,51,0.9) 0%, rgba(4,36,51,0.2) 60%, transparent 100%)', transition: 'background 0.4s ease' }}></div>
                    </div>

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 2, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', pointerEvents: 'none' }}>
                      <div style={{ 
                        width: '64px', 
                        height: '64px', 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        backdropFilter: 'blur(10px)',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'var(--white)',
                        marginBottom: '0.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}>
                        {getPillarIcon(idx)}
                      </div>
                      <div>
                        <h3 className="why-headline" style={{ fontSize: '2.2rem', margin: '0 0 1rem 0', color: 'var(--white)' }}>{pillar.title}</h3>
                        <p className="why-subhead" style={{ fontSize: '1.1rem', margin: 0, opacity: 0.9, lineHeight: 1.6, color: 'var(--cream)' }}>{pillar.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 & 5. Process Integration (Selling and Renting) using ProcessList */}
      <ProcessList processData={data.selling} invertBackground={false} />
      <ProcessList processData={data.renting} invertBackground={true} />

      {/* 6. Valuation & Benefits (Premium Bento Grid) */}
      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 280px;
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .bento-card {
          border-radius: 1.5rem;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 2.5rem;
          box-shadow: 0 10px 40px rgba(4,36,51,0.03);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          border: 1px solid rgba(4,36,51,0.05);
          background: white;
        }
        .bento-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(4,36,51,0.08);
        }
        
        /* Card 0: Large square (left) */
        .bento-0 { 
          grid-column: span 2; 
          grid-row: span 2; 
          justify-content: flex-end; 
          color: white; 
          border: none;
          background-color: var(--navy);
          padding: 1rem;
        }
        
        /* Card 1: Top right */
        .bento-1 { 
          grid-column: span 1; 
          grid-row: span 1; 
          justify-content: space-between;
        }
        
        /* Card 2: Bottom right */
        .bento-2 { 
          grid-column: span 1; 
          grid-row: span 1; 
          justify-content: space-between;
        }
        
        /* Card 3: Wide banner */
        .bento-3 { 
          grid-column: span 3; 
          grid-row: span 1; 
          flex-direction: row; 
          align-items: center; 
          justify-content: flex-end;
          padding: 1rem;
          border: none;
          background-color: var(--navy);
        }
        .bento-3-content {
          position: relative; z-index: 2; color: white; max-width: 450px; padding: 1.5rem; text-align: right;
        }
        
        .bento-content { position: relative; z-index: 2; }
        
        .bento-icon {
          width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;
          background: rgba(181, 143, 98, 0.1); color: var(--bronze);
        }
        .bento-0 .bento-icon { background: rgba(255,255,255,0.1); color: white; backdrop-filter: blur(5px); }
        
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
          }
          .bento-0 { grid-column: span 1; grid-row: auto; min-height: 450px; }
          .bento-1, .bento-2 { grid-column: span 1; grid-row: auto; min-height: 250px; }
          .bento-3 { 
            grid-column: span 1; grid-row: auto; flex-direction: column; align-items: flex-start; justify-content: flex-end; min-height: 350px;
          }
          .bento-3 .bento-overlay {
            background: linear-gradient(to top, rgba(4,36,51,0.9) 0%, transparent 100%);
          }
          .bento-3-content {
            text-align: left; padding: 1.5rem; max-width: 100%;
          }
        }
      `}</style>
      <section className="global-padding" ref={valuationRef} style={{ backgroundColor: 'var(--cream)', paddingTop: '10rem', paddingBottom: '4rem', position: 'relative' }}>
        <div className="inner-page-container">
          
          <div className={`reveal-base reveal-up ${valuationVisible ? 'is-revealed' : ''}`} style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <p className="services-subtitle" style={{ justifyContent: 'center', color: 'var(--bronze)' }}>
               <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {data.valuation.tag}
            </p>
            <h2 className="explore-headline" style={{ marginTop: '1rem', marginBottom: '2rem', fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: 'var(--navy)' }}>
              {data.valuation.title} <br />
              <span className="italic-serif">{data.valuation.titleSerif}</span>
            </h2>
            <p className="why-subhead" style={{ maxWidth: '800px', margin: '0 auto', color: 'rgba(4,36,51,0.8)', fontSize: '1.2rem' }}>
              {data.valuation.subhead}
            </p>
          </div>

          <div className="bento-grid">
            {/* Card 0: Precise Valuation */}
            <div className={`bento-card bento-0 reveal-base reveal-scale delay-100 ${valuationVisible ? 'is-revealed' : ''}`}>
              <div style={{ position: 'absolute', inset: '1rem', borderRadius: '1rem', overflow: 'hidden', zIndex: 0 }}>
                <Image src="/images/prop_villa_1787771383699.jpg" alt={data.valuation.benefits[0].title} fill style={{ objectFit: 'cover' }} />
                <div className="bento-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,36,51,0.95) 0%, rgba(4,36,51,0.2) 60%, transparent 100%)', zIndex: 1 }}></div>
              </div>
              <div className="bento-content" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                <div className="bento-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <h4 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{data.valuation.benefits[0].title}</h4>
                <p style={{ opacity: 0.8, fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '80%' }}>{data.valuation.benefits[0].desc}</p>
              </div>
            </div>

            {/* Card 1: Value Optimization */}
            <div className={`bento-card bento-1 reveal-base reveal-scale delay-200 ${valuationVisible ? 'is-revealed' : ''}`}>
              <div className="bento-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <div className="bento-content">
                <h4 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{data.valuation.benefits[1].title}</h4>
                <p style={{ opacity: 0.7, color: 'var(--navy)', fontSize: '1.05rem', lineHeight: 1.5, margin: 0 }}>{data.valuation.benefits[1].desc}</p>
              </div>
            </div>

            {/* Card 2: Market Analysis */}
            <div className={`bento-card bento-2 reveal-base reveal-scale delay-300 ${valuationVisible ? 'is-revealed' : ''}`}>
              <div className="bento-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
              </div>
              <div className="bento-content">
                <h4 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{data.valuation.benefits[2].title}</h4>
                <p style={{ opacity: 0.7, color: 'var(--navy)', fontSize: '1.05rem', lineHeight: 1.5, margin: 0 }}>{data.valuation.benefits[2].desc}</p>
              </div>
            </div>

            {/* Card 3: Strategic Pricing */}
            <div className={`bento-card bento-3 reveal-base reveal-scale delay-400 ${valuationVisible ? 'is-revealed' : ''}`}>
              <div style={{ position: 'absolute', inset: '1rem', borderRadius: '1rem', overflow: 'hidden', zIndex: 0 }}>
                <Image src="/images/valuation_blueprint.jpg" alt={data.valuation.benefits[3].title} fill style={{ objectFit: 'cover' }} />
                <div className="bento-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(4,36,51,0.1) 0%, rgba(4,36,51,0.9) 80%)', zIndex: 1 }}></div>
              </div>
              <div className="bento-3-content" style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <h4 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{data.valuation.benefits[3].title}</h4>
                <p style={{ opacity: 0.8, fontSize: '1.15rem', lineHeight: 1.6 }}>{data.valuation.benefits[3].desc}</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6b. Valuation Steps Grid */}
      <section className="global-padding" style={{ backgroundColor: 'var(--cream)', paddingBottom: '8rem' }}>
        <div className="inner-page-container">
          {/* Valuation Steps Intro */}
          <div className={`reveal-base reveal-up delay-200 ${valuationVisible ? 'is-revealed' : ''}`} style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '4rem' }}>
            <h3 className="explore-headline" style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '1rem' }}>
              Our Valuation Process
            </h3>
            <p className="why-subhead" style={{ maxWidth: '600px', margin: '0 auto', color: 'rgba(4,36,51,0.7)', fontSize: '1.2rem' }}>
              A structured approach to ensure you receive the most accurate and reliable market value for your property.
            </p>
          </div>

          {/* Three Steps Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem' }}>
            {data.valuation.steps.map((step: any, idx: number) => (
              <div 
                key={idx} 
                className={`reveal-base reveal-up ${valuationVisible ? 'is-revealed' : ''}`}
                style={{ textAlign: 'center', color: 'var(--navy)', cursor: 'default', transitionDelay: `${(idx + 1) * 150}ms` }}
                onMouseEnter={(e) => {
                  const circle = e.currentTarget.querySelector('.step-circle') as HTMLElement;
                  if(circle) {
                    circle.style.backgroundColor = 'var(--bronze)';
                    circle.style.color = 'white';
                    circle.style.transform = 'scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  const circle = e.currentTarget.querySelector('.step-circle') as HTMLElement;
                  if(circle) {
                    circle.style.backgroundColor = 'transparent';
                    circle.style.color = 'var(--bronze)';
                    circle.style.transform = 'scale(1)';
                  }
                }}
              >
                <div className="step-circle" style={{ width: '70px', height: '70px', borderRadius: '50%', border: '2px solid var(--bronze)', color: 'var(--bronze)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontFamily: 'var(--font-instrument), serif', margin: '0 auto 2rem auto', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  0{idx + 1}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 600 }}>{step.title}</h3>
                <p style={{ opacity: 0.7, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Enhanced Inline Lead Capture Strip (Glassmorphic Banner) */}
      <section className="global-padding" style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundColor: 'var(--navy)' }}>
           {/* Dark background for contrast with subtle radial glow */}
           <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '100%', height: '200%', background: 'radial-gradient(circle, rgba(181, 143, 98, 0.15) 0%, transparent 60%)' }}></div>
        </div>
        
        <div className="inner-page-container" style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
          <div
             className="owners-lead-glass"
             style={{
               width: '100%',
               height: 'auto',
               borderRadius: '24px',
               backgroundColor: 'rgba(255, 255, 255, 0.05)',
               backdropFilter: 'blur(18px)',
               WebkitBackdropFilter: 'blur(18px)',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
             }}
          >
            <div style={{ padding: '6rem 3rem', textAlign: 'center', color: 'var(--white)' }}>
              <h3 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 500, marginBottom: '3rem', fontFamily: 'var(--font-satoshi), sans-serif', letterSpacing: '-0.03em' }}>
                The best decisions for your Property begin with the right advice
              </h3>
              <form style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '800px', margin: '0 auto' }} onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}>
                <input type="text" placeholder="Name" required style={{ padding: '1.25rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--white)', flex: '1 1 200px', fontSize: '1rem', fontFamily: 'var(--font-satoshi), sans-serif' }} />
                <input type="email" placeholder="E-Mail" required style={{ padding: '1.25rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--white)', flex: '1 1 200px', fontSize: '1rem', fontFamily: 'var(--font-satoshi), sans-serif' }} />
                <button type="submit" style={{ padding: '1.25rem 3rem', backgroundColor: 'var(--bronze)', color: 'var(--white)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 500, fontFamily: 'var(--font-satoshi), sans-serif', transition: 'background-color 0.2s, transform 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(181, 143, 98, 0.9)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bronze)'}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Banner */}
      <section className="global-padding" ref={ctaRef} style={{ backgroundColor: 'var(--cream)', color: 'var(--navy)', paddingTop: '10rem', paddingBottom: '10rem', textAlign: 'center' }}>
        <div className={`inner-page-container reveal-base reveal-up ${ctaVisible ? 'is-revealed' : ''}`} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="explore-headline" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>
            Are you looking to sell, let, or gain clarity on your property's value?
          </h2>
          <p className="why-subhead" style={{ marginBottom: '4rem', fontSize: '1.3rem', opacity: 0.8, color: 'rgba(4,36,51,0.8)' }}>
            We advise you personally and without obligation.
          </p>
          <button 
                onClick={() => openModal('top_contact')}
                className="explore-btn explore-btn-dark"
                style={{
                  padding: '1.5rem 4rem',
                  backgroundColor: 'var(--navy)',
                  color: 'var(--white)',
                  border: 'none',
                  cursor: 'pointer',
                  margin: '0 auto',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                  boxShadow: '0 20px 40px rgba(4,36,51,0.15)',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(4,36,51,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(4,36,51,0.15)';
                }}
              >
                Request Consultation
                <div className="explore-icon-wrapper" style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="var(--white)">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
