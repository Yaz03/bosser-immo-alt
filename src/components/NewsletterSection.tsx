"use client";

import React from 'react';

export default function NewsletterSection() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        
        <h2 className="news-headline">
          Market<br />
          <span className="italic-serif">Intelligence.</span>
        </h2>
        
        <p className="news-subhead">
          Subscribe to receive expert real estate knowledge, exclusive market insights, and our latest property updates directly to your inbox.
        </p>
        
        <form className="news-form" onSubmit={(e) => e.preventDefault()}>
          <div className="news-input-wrapper">
            <input 
              type="email" 
              className="news-input" 
              placeholder="Your email address" 
              required
            />
            <button type="submit" className="news-submit-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}
