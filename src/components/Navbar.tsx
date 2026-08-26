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
        <a href="#" className="contact-btn">CONTACT</a>
      </div>
    </nav>
  );
}
