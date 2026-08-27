'use client';

import React, { useEffect, useRef } from 'react';

export default function CtaSection() {
  return (
    <section className="cta-section">
      {/* Left Column: Portrait Image */}
      <div className="cta-image-col"></div>

      {/* Right Column: Form Block */}
      <div className="cta-form-col">
        <div className="cta-form-container">
          <h2 className="cta-headline">
            Connect<br/>
            <span className="italic-serif">with Bossert.</span>
          </h2>
          <p className="cta-subhead">
            Whether you are exploring a property, have a project in mind, or wish to discuss an off-market opportunity, we offer absolute discretion.
          </p>
          
          <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
            <div className="cta-form-row">
              <div className="cta-input-group">
                <input type="text" id="name" placeholder="Your Name" className="cta-input" />
              </div>
              <div className="cta-input-group">
                <input type="email" id="email" placeholder="Your Email" className="cta-input" />
              </div>
            </div>
            
            <div className="cta-input-group">
              <textarea id="message" placeholder="How can we assist you?" className="cta-textarea"></textarea>
            </div>
            
            <button type="submit" className="explore-btn explore-btn-dark cta-submit-margin">
              SUBMIT INQUIRY
              <div className="explore-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
