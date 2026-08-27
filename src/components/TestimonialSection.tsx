"use client";

import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "An entirely different caliber of service. The discretion and strategic approach they brought to the sale of our property was unmatched.",
    author: "M.K.",
    location: "Villa in Taunus",
    image: "/test_bg_villa.jpg"
  },
  {
    quote: "Bossert understands that true luxury is silence. Everything was handled privately, efficiently, and with total precision.",
    author: "L.S.",
    location: "Penthouse, Frankfurt",
    image: "/test_bg_penthouse.jpg"
  },
  {
    quote: "Their network is invisible but immensely powerful. They connected us with the exact buyer we needed before the property was ever listed.",
    author: "Dr. A.H.",
    location: "Historic Estate",
    image: "/test_bg_estate.jpg"
  }
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 7000); // Auto-advance every 7 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonial-section">
      <div className="test-header-row">
        <div className="test-header-left">
          <h2 className="test-headline">
            A legacy of
            <span className="italic-serif">exceptional results.</span>
          </h2>
        </div>
        <div className="test-header-right">
          <p>Experience real estate at the highest level. Hear directly from those who have entrusted us with their most valuable assets, where discretion and precision are paramount.</p>
        </div>
      </div>

      <div className="test-card-container">
        {/* Background Images */}
        {testimonials.map((test, index) => (
          <div 
            key={index} 
            className={`test-bg-image ${index === activeIndex ? 'active' : ''}`} 
            style={{ backgroundImage: `url(${test.image})` }}
          />
        ))}

        {/* Bottom Left Slide Indicator */}
        <div className="test-indicator">
          <span className="test-index">0{activeIndex + 1} / 0{testimonials.length}</span>
          <div className="test-progress-bar">
            <div 
              className="test-progress-fill" 
              style={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Inner Overlay Box */}
        <div className="test-inner-box">
          
          <div className="test-box-content" key={activeIndex}>
            <div className="test-author-row">
              <div className="test-avatar">
                {testimonials[activeIndex].author.substring(0, 2)}
              </div>
              <div className="test-author-info">
                <strong>{testimonials[activeIndex].author}</strong>
                <span>Private Client</span>
              </div>
            </div>
            
            <div className="test-property-purchased">
              <strong>Property:</strong> {testimonials[activeIndex].location}
            </div>
            
            <div className="test-quote">
              "{testimonials[activeIndex].quote}"
            </div>
          </div>
          
          <div className="test-box-footer">
            <div className="test-stars">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span className="star-rating">5.0</span>
            </div>
            
            <div className="test-nav-arrows">
              <button onClick={prevSlide} className="test-arrow-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button onClick={nextSlide} className="test-arrow-btn next-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
