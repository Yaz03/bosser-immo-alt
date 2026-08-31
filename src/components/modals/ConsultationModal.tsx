"use client";

import React, { useState, useEffect } from 'react';
import styles from './ConsultationModal.module.css';
import { useLanguage } from '../../context/LanguageContext';

type ModalRoute = 'top_contact' | 'consultation' | 'valuation' | 'buyer' | 'general' | 'profile' | 'house_form' | 'apartment_form' | 'commercial_form' | 'success';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoute?: 'top_contact' | 'consultation' | 'valuation' | 'buyer' | 'general' | 'profile';
}

export default function ConsultationModal({ isOpen, onClose, initialRoute = 'top_contact' }: ConsultationModalProps) {
  const [route, setRoute] = useState<ModalRoute>(initialRoute);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();
  const m = (t as any).owners?.modals || {}; // Ensure we have the translations

  // Reset route when opened
  useEffect(() => {
    if (isOpen) {
      setRoute(initialRoute);
      setIsSubmitting(false);
    }
  }, [isOpen, initialRoute]);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => setRoute(initialRoute), 300); // Reset after animation
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission
    setTimeout(() => {
      console.log("Form submitted successfully");
      setIsSubmitting(false);
      setRoute('success');
    }, 1500);
  };

  // Common Contact Info fields
  const ContactInfoFields = () => (
    <>
      <div className={styles.twoColumns}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{m.freeConsultation?.firstName || 'First Name'}</label>
          <input type="text" className={styles.formInput} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{m.freeConsultation?.lastName || 'Last Name'}</label>
          <input type="text" className={styles.formInput} required />
        </div>
      </div>
      <div className={styles.twoColumns}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{m.freeConsultation?.email || 'Email'}</label>
          <input type="email" className={styles.formInput} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{m.freeConsultation?.phone || 'Phone'}</label>
          <input type="tel" className={styles.formInput} required />
        </div>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" className={styles.checkboxInput} required />
          <span className={styles.consentText}>{m.freeConsultation?.consent || 'I consent to the processing of my data.'}</span>
        </label>
      </div>
    </>
  );

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* TOP CONTACT SELECTOR (Popup 5) */}
        {route === 'top_contact' && (
          <>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{m.generalInquiry?.title || 'How can we assist you?'}</h2>
              <p className={styles.modalSubhead}>{m.buyerSearch?.intro || 'Select your request.'}</p>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.selectorGrid}>
                <button className={styles.selectorButton} onClick={() => setRoute('consultation')}>
                  Sell or rent <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <button className={styles.selectorButton} onClick={() => setRoute('buyer')}>
                  Buy or rent <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <button className={styles.selectorButton} onClick={() => setRoute('valuation')}>
                  Request a valuation <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <button className={styles.selectorButton} onClick={() => setRoute('general')}>
                  Other Inquiry <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>
          </>
        )}

        {/* CONSULTATION SELECTOR (Popup 1) */}
        {route === 'consultation' && (
          <>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{m.freeConsultation?.title || 'Get your Free Consultation'}</h2>
              <p className={styles.modalSubhead}>{m.freeConsultation?.selectIntro || 'To provide you with the best possible advice, we just need a few key details.'}</p>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.selectorGrid}>
                <button className={styles.selectorButton} onClick={() => setRoute('house_form')}>
                  {m.freeConsultation?.house || 'Single-Family or Multi-Family Home'} <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <button className={styles.selectorButton} onClick={() => setRoute('apartment_form')}>
                  {m.freeConsultation?.apartment || 'Apartment'} <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <button className={styles.selectorButton} onClick={() => setRoute('commercial_form')}>
                  {m.freeConsultation?.commercial || 'Commercial'} <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>
          </>
        )}

        {/* VALUATION SELECTOR (Popup 3) */}
        {route === 'valuation' && (
          <>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{m.valuation?.title || 'Which type of property would you like valued?'}</h2>
              <p className={styles.modalSubhead}>{m.valuation?.intro || 'Please select the property type.'}</p>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.selectorGrid}>
                <button className={styles.selectorButton} onClick={() => setRoute('house_form')}>
                  {m.freeConsultation?.house || 'Single-Family or Multi-Family Home'} <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <button className={styles.selectorButton} onClick={() => setRoute('apartment_form')}>
                  {m.freeConsultation?.apartment || 'Apartment'} <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <button className={styles.selectorButton} onClick={() => setRoute('commercial_form')}>
                  {m.freeConsultation?.commercial || 'Commercial'} <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>
          </>
        )}

        {/* HOUSE FORM (Popup 1A / Valuation) */}
        {route === 'house_form' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{m.freeConsultation?.houseFormTitle || 'Share a few details about your property'}</h2>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{m.freeConsultation?.houseType || 'House Type'}</label>
                  <select className={styles.formSelect} required>
                    <option value="">Bitte auswählen</option>
                    <option value="End-Unit Townhouse">End-Unit Townhouse</option>
                    <option value="Mid-terrace House">Mid-terrace House</option>
                    <option value="Semi-Detached">Semi-Detached House</option>
                    <option value="Detached">Detached</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{m.freeConsultation?.yearBuilt || 'Year Built'}</label>
                  <input type="number" className={styles.formInput} />
                </div>
              </div>
              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{m.freeConsultation?.livingArea || 'Living Area'}</label>
                  <input type="number" className={styles.formInput} placeholder="m²" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{m.freeConsultation?.plotArea || 'Plot Area'}</label>
                  <input type="number" className={styles.formInput} placeholder="m²" />
                </div>
              </div>
              
              <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                <label className={styles.formLabel}>{m.freeConsultation?.features || 'Features'}</label>
                <div className={styles.checkboxGrid}>
                  <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Elevator</label>
                  <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Balcony</label>
                  <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Garage</label>
                  <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Garden</label>
                  <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Fitted Kitchen</label>
                  <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Terrace</label>
                  <label className={styles.checkboxLabel}><input type="checkbox" className={styles.checkboxInput} /> Pool</label>
                </div>
              </div>

              <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
                <label className={styles.formLabel}>{m.freeConsultation?.plans || 'Plans'}</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <label className={styles.radioLabel}><input type="radio" name="plan" className={styles.radioInput} /> {m.freeConsultation?.sell || 'Sell'}</label>
                  <label className={styles.radioLabel}><input type="radio" name="plan" className={styles.radioInput} /> {m.freeConsultation?.rentOut || 'Rent out'}</label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{m.freeConsultation?.location || 'Location'}</label>
                <input type="text" className={styles.formInput} required />
              </div>

              <div style={{ borderTop: '1px solid rgba(4,36,51,0.1)', marginTop: '2rem', paddingTop: '2rem' }}>
                <ContactInfoFields />
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? '...' : m.freeConsultation?.submit || 'Submit ⟶'}
              </button>
            </div>
          </form>
        )}

        {/* APARTMENT FORM (Popup 1B) */}
        {route === 'apartment_form' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{m.freeConsultation?.apartmentFormTitle || 'Tell us briefly about your property'}</h2>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{m.freeConsultation?.apartmentType || 'Apartment Type'}</label>
                  <select className={styles.formSelect} required>
                    <option value="">Bitte auswählen</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Attic">Attic Apartment</option>
                    <option value="Ground">Ground Floor Apartment</option>
                    <option value="Maisonette">Maisonette</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{m.freeConsultation?.livingArea || 'Living Area'}</label>
                  <input type="number" className={styles.formInput} placeholder="m²" />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{m.freeConsultation?.location || 'Location'}</label>
                <input type="text" className={styles.formInput} required />
              </div>

              <div style={{ borderTop: '1px solid rgba(4,36,51,0.1)', marginTop: '2rem', paddingTop: '2rem' }}>
                <ContactInfoFields />
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? '...' : m.freeConsultation?.submit || 'Submit ⟶'}
              </button>
            </div>
          </form>
        )}

        {/* COMMERCIAL FORM (Popup 1C) */}
        {route === 'commercial_form' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{m.freeConsultation?.commercialFormTitle || 'Share a few details about your property'}</h2>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{m.freeConsultation?.commercialType || 'Type of Commercial Property'}</label>
                <select className={styles.formSelect} required>
                  <option value="">Bitte auswählen</option>
                  <option value="Office">Office / Practice Spaces</option>
                  <option value="Retail">Retail Space</option>
                  <option value="Warehouse">Warehouse / Logistics</option>
                  <option value="Hospitality">Hospitality Property</option>
                </select>
              </div>
              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{m.freeConsultation?.totalArea || 'Total Area (m²)'}</label>
                  <input type="number" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{m.freeConsultation?.rentalStatus || 'Is it rented?'}</label>
                  <select className={styles.formSelect}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{m.freeConsultation?.location || 'Location'}</label>
                <input type="text" className={styles.formInput} required />
              </div>

              <div style={{ borderTop: '1px solid rgba(4,36,51,0.1)', marginTop: '2rem', paddingTop: '2rem' }}>
                <ContactInfoFields />
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? '...' : m.freeConsultation?.submit || 'Submit ⟶'}
              </button>
            </div>
          </form>
        )}

        {/* BUYER SEARCH (Popup 2 Sub-form) */}
        {route === 'buyer' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{m.buyerSearch?.formTitle || 'Tell us briefly what you\'re looking for'}</h2>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{m.buyerSearch?.inquiryType || 'Your inquiry'}</label>
                  <select className={styles.formSelect} required>
                    <option value="Buy">{m.buyerSearch?.buy || 'Buy Property'}</option>
                    <option value="Rent">{m.buyerSearch?.rent || 'Rent Property'}</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{m.buyerSearch?.propertyType || 'Property Type'}</label>
                  <select className={styles.formSelect} required>
                    <option value="Homes">{m.buyerSearch?.homesForSale || 'Homes for Sale'}</option>
                    <option value="Apartment">{m.buyerSearch?.apartments || 'Apartment'}</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{m.buyerSearch?.searchArea || 'Search Area'}</label>
                <input type="text" className={styles.formInput} required />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{m.buyerSearch?.message || 'Your Message'}</label>
                <textarea className={styles.formTextarea}></textarea>
              </div>

              <div style={{ borderTop: '1px solid rgba(4,36,51,0.1)', marginTop: '2rem', paddingTop: '2rem' }}>
                <ContactInfoFields />
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? '...' : m.freeConsultation?.submit || 'Submit ⟶'}
              </button>
            </div>
          </form>
        )}

        {/* GENERAL INQUIRY (Popup 4) */}
        {route === 'general' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{m.generalInquiry?.title || 'How can we assist you?'}</h2>
              <p className={styles.modalSubhead}>{m.generalInquiry?.intro || 'Briefly tell us about your inquiry.'}</p>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{m.generalInquiry?.reason || 'Reason for inquiry'}</label>
                <select className={styles.formSelect}>
                  <option value="Consultation">Consultation</option>
                  <option value="Documents">Documents / Exposé</option>
                  <option value="Appointment">Appointment / Viewing</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{m.generalInquiry?.whatAbout || 'What is your inquiry about?'}</label>
                <textarea className={styles.formTextarea} required></textarea>
              </div>

              <div style={{ borderTop: '1px solid rgba(4,36,51,0.1)', marginTop: '2rem', paddingTop: '2rem' }}>
                <ContactInfoFields />
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? '...' : m.freeConsultation?.submit || 'Submit ⟶'}
              </button>
            </div>
          </form>
        )}

        {/* EXCLUSIVE SEARCH PROFILE (Popup 6) */}
        {route === 'profile' && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{m.searchProfile?.title || 'Create your exclusive search profile'}</h2>
              <p className={styles.modalSubhead}>{m.searchProfile?.subhead || 'Individual. Discreet. Personal.'}</p>
            </div>
            <div className={styles.modalBody}>
              {/* HONEYPOT FIELD */}
              <input type="text" name="website" className={styles.visuallyHidden} tabIndex={-1} autoComplete="off" />

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{m.searchProfile?.salutation || 'Salutation'}</label>
                <select className={styles.formSelect} required>
                  <option value="Mr">{m.searchProfile?.mr || 'Mr.'}</option>
                  <option value="Ms">{m.searchProfile?.ms || 'Ms.'}</option>
                  <option value="Company">{m.searchProfile?.company || 'Company'}</option>
                </select>
              </div>
              
              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{m.searchProfile?.city || 'City'}</label>
                  <input type="text" className={styles.formInput} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{m.searchProfile?.price || 'Price'}</label>
                  <input type="text" className={styles.formInput} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{m.searchProfile?.specialRequirements || 'Special Requirements'}</label>
                <textarea className={styles.formTextarea}></textarea>
              </div>

              <div style={{ borderTop: '1px solid rgba(4,36,51,0.1)', marginTop: '2rem', paddingTop: '2rem' }}>
                <ContactInfoFields />
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? '...' : m.searchProfile?.submit || 'Create Search Profile'}
              </button>
            </div>
          </form>
        )}

        {/* SUCCESS STATE */}
        {route === 'success' && (
          <div className={styles.modalBody} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
            <div className={styles.successState}>
              <div className={styles.successIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2 className={styles.modalTitle}>Vielen Dank! / Thank you!</h2>
              <p className={styles.modalSubhead}>We have received your inquiry and will contact you shortly.</p>
              <button className={styles.submitButton} onClick={handleClose} style={{ marginTop: '2rem' }}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
