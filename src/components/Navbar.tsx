import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Bossert Immobilien Logo" className="logo-img" />
      </div>
      
      <div className="nav-links">
        <a href="#" className="nav-item">PROPERTIES</a>
        <a href="#" className="nav-item">FOR OWNERS</a>
        <a href="#" className="nav-item">SERVICES</a>
        <a href="#" className="nav-item">ABOUT</a>
        <a href="#" className="nav-item">REFERENCES</a>
        <a href="#" className="nav-item">KNOWLEDGE</a>
        
        <div className="lang-toggle">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span className="lang-btn active">EN</span>
          <span className="lang-divider">|</span>
          <span className="lang-btn">DE</span>
        </div>

        <a href="#" className="contact-btn">CONTACT</a>
      </div>
    </nav>
  );
}
