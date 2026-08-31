"use client";

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import ContactFAQ from '@/components/ContactFAQ';

export default function ContactPage() {
  const { ref: topRef, isVisible: topVisible } = useScrollReveal(0.1);
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal(0.2);
  
  const { t } = useLanguage();
  const contact = (t as any).contact;
  const footer = (t as any).footer;

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const heardAboutRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameRef.current?.value || '',
          phone: phoneRef.current?.value || '',
          subject: subjectRef.current?.value || 'General Inquiry',
          message: messageRef.current?.value || '',
          heardAbout: heardAboutRef.current?.value || '',
          formType: 'contact_page',
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setFormError(data.error || 'Submission failed. Please try again.');
      }
    } catch {
      setFormError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!contact) return null;

  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar invertOnLoad={true} />
      
      {/* 1. Top Section (Split Grid) */}
      <section className="global-padding" ref={topRef} style={{ paddingTop: '10rem', paddingBottom: '6rem' }}>
        <div className="inner-page-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '6rem' }}>
          
          {/* Left: Hero & Info */}
          <div className={`reveal-base reveal-up ${topVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
            
            {/* Hero */}
            <div style={{ marginBottom: '4rem' }}>
              <p className="services-subtitle" style={{ marginBottom: '1.5rem' }}>
                <span className="dot"></span> {contact.hero.tag}
              </p>
              <h1 className="editorial-headline" style={{ marginBottom: '1rem' }}>
                <span style={{ letterSpacing: '-0.07em', marginRight: '0.5rem' }}>{contact.hero.title}</span>
                <span className="italic-serif">{contact.hero.titleSerif}</span>
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'rgba(4,36,51,0.7)' }}>
                {contact.hero.subhead}
              </p>
            </div>

            {/* Contact Info (Stacked like reference) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(4,36,51,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <p style={{ fontWeight: 500, color: 'var(--navy)', marginBottom: '0.25rem' }}>{contact.info.locationTitle}</p>
                  <p style={{ color: 'rgba(4,36,51,0.7)', lineHeight: 1.6 }}>{footer.address1}<br/>{footer.address2}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(4,36,51,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <p style={{ fontWeight: 500, color: 'var(--navy)', marginBottom: '0.25rem' }}>{contact.info.phoneTitle}</p>
                  <a href="tel:+49691234567" style={{ color: 'rgba(4,36,51,0.7)', textDecoration: 'none' }}>+49 (0) 69 1234 567</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(4,36,51,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <p style={{ fontWeight: 500, color: 'var(--navy)', marginBottom: '0.25rem' }}>{contact.info.emailTitle}</p>
                  <a href="mailto:inquiry@bossert-immo.de" style={{ color: 'rgba(4,36,51,0.7)', textDecoration: 'none' }}>inquiry@bossert-immo.de</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Form Card */}
          <div className={`reveal-base reveal-up delay-200 ${topVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 500px' }}>
            <div style={{ backgroundColor: 'var(--white)', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(4,36,51,0.03)' }}>
              {success ? (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                  <p className="italic-serif" style={{ fontSize: '2.5rem', color: 'var(--bronze)', marginBottom: '1rem' }}>Sent.</p>
                  <p style={{ color: 'var(--navy)', lineHeight: 1.6 }}>{contact.form.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  <div>
                    <input 
                      ref={nameRef}
                      type="text" 
                      placeholder={contact.form.namePlaceholder} 
                      required 
                      className="cta-input"
                    />
                  </div>

                  <div>
                    <input 
                      ref={phoneRef}
                      type="tel" 
                      placeholder={contact.form.phonePlaceholder} 
                      className="cta-input"
                    />
                  </div>

                  <div>
                    <select 
                      ref={subjectRef}
                      className="cta-input"
                      style={{ appearance: 'none', cursor: 'pointer' }}
                    >
                      {contact.form.options.map((opt: string, idx: number) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <textarea 
                      ref={messageRef}
                      placeholder={contact.form.messagePlaceholder} 
                      required 
                      rows={4}
                      className="cta-textarea"
                    />
                  </div>

                  {/* How did you hear about us */}
                  <div>
                    <select
                      ref={heardAboutRef}
                      className="cta-input"
                      style={{ appearance: 'none', cursor: 'pointer', color: heardAboutRef.current?.value ? 'var(--navy)' : 'rgba(4,36,51,0.45)' }}
                    >
                      <option value="">{contact.form.heardAbout || 'How did you hear about us?'}</option>
                      {(contact.form.heardAboutOptions || []).map((opt: string, idx: number) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {formError && (
                    <p style={{ color: '#DC2626', fontSize: '0.85rem', marginTop: '-0.5rem' }}>{formError}</p>
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="explore-btn explore-btn-dark cta-submit-margin"
                    style={{ opacity: submitting ? 0.7 : 1, marginTop: '0.5rem' }}
                  >
                    <span>{submitting ? contact.form.submitting : contact.form.submit}</span>
                    <div className="explore-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <input type="checkbox" id="privacy" required style={{ accentColor: 'var(--navy)' }} />
                    <label htmlFor="privacy" style={{ fontSize: '0.85rem', color: 'rgba(4,36,51,0.7)' }}>{contact.form.privacy}</label>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 2. Cinematic Anchor Image */}
      <section className="global-padding" ref={imageRef}>
        <div className={`inner-page-container reveal-base reveal-scale ${imageVisible ? 'is-revealed' : ''}`}>
          <div style={{ position: 'relative', width: '100%', height: '60vh', minHeight: '500px', borderRadius: '16px', overflow: 'hidden' }}>
            <Image 
              src="/images/prop_penthouse_1787771396787.jpg"  
              alt="Luxury Bossert Property"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* 3. FAQ Section */}
      <ContactFAQ faqData={contact.faq} />

      <Footer />
    </main>
  );
}
