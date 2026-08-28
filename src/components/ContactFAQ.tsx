"use client";

import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FAQ {
  q: string;
  a: string;
}

interface Props {
  faqData: {
    tag: string;
    title: string;
    titleSerif: string;
    subhead: string;
    cardTitle: string;
    cardSub: string;
    questions: FAQ[];
  };
}

export default function ContactFAQ({ faqData }: Props) {
  const { ref, isVisible } = useScrollReveal(0.2);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="global-padding" ref={ref} style={{ paddingTop: '8rem', paddingBottom: '10rem' }}>
      <div className="inner-page-container">
        
        {/* Header */}
        <div className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`} style={{ marginBottom: '4rem' }}>
          <p className="services-subtitle" style={{ marginBottom: '1.5rem' }}>
            <span className="dot"></span> {faqData.tag}
          </p>
          <h2 className="explore-headline" style={{ marginBottom: '1rem' }}>
            {faqData.title} <br />
            <span className="italic-serif">{faqData.titleSerif}</span>
          </h2>
          <p style={{ color: 'rgba(4,36,51,0.6)', fontSize: '1.2rem' }}>{faqData.subhead}</p>
        </div>

        {/* Layout Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          
          {/* Left Side: Card */}
          <div className={`reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 350px' }}>
            <div style={{ 
              backgroundColor: 'var(--navy)', 
              borderRadius: '8px', 
              padding: '3rem 2rem', 
              color: 'var(--white)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              minHeight: '350px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(254,252,246,0.1) 0%, transparent 100%)' }}></div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 400 }}>{faqData.cardTitle}</h3>
                <p style={{ color: 'rgba(254,252,246,0.7)', fontSize: '0.9rem' }}>{faqData.cardSub}</p>
              </div>
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className={`reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`} style={{ flex: '2 1 500px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {faqData.questions.map((faq, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    backgroundColor: 'var(--white)', 
                    borderRadius: '8px', 
                    overflow: 'hidden',
                    border: '1px solid rgba(4,36,51,0.05)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <button 
                    onClick={() => toggleAccordion(idx)}
                    style={{ 
                      width: '100%', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '1.5rem', 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 500, color: 'var(--navy)', fontSize: '1.1rem' }}>
                      {faq.q}
                    </span>
                    <span style={{ 
                      fontSize: '1.5rem', 
                      color: 'var(--navy)', 
                      transform: openIndex === idx ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}>
                      +
                    </span>
                  </button>
                  <div style={{ 
                    maxHeight: openIndex === idx ? '500px' : '0', 
                    opacity: openIndex === idx ? 1 : 0,
                    overflow: 'hidden', 
                    transition: 'all 0.4s ease-in-out',
                    padding: openIndex === idx ? '0 1.5rem 1.5rem 1.5rem' : '0 1.5rem'
                  }}>
                    <p style={{ color: 'rgba(4,36,51,0.7)', lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
