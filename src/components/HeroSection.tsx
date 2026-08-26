import React from 'react';
import Navbar from './Navbar';
import StatsCard from './StatsCard';

export default function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <Navbar />

        {/* Main Content */}
        <div className="main-grid">
          <div className="left-content">
            <div className="since-text">Since 1991</div>
            <div className="headline-top">A DIFFERENT</div>
            <div className="headline-middle">Perspective</div>
            <div className="headline-bottom">
              <span>On</span> Real Estate.
            </div>
          </div>
          
          <div className="right-content">
            <div className="experience-text">
              Experience, perspective,<br />
              and a personal approach<br />
              to real estate.
            </div>
            
            <StatsCard />
          </div>
        </div>

        {/* Footer Area */}
        <div className="bottom-area">
          <div className="bottom-left">
            <div className="partner-text">
              YOUR PARTNER FOR<br />
              RESIDENTIAL REAL ESTATE<br />
              IN THE RHINE-MAIN AREA.
            </div>
            <div className="scroll-indicator">
              SCROLL & DISCOVER
              <div className="scroll-icon"></div>
            </div>
          </div>
          
          <div className="bottom-right">
            <a href="#" className="explore-btn">
              EXPLORE PROPERTIES
              <div className="explore-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
