"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar invertOnLoad={true} />
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '10rem', paddingBottom: '5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(3rem, 5vw, 5rem)', color: 'var(--navy)', marginBottom: '1rem' }}>
            Our <span className="italic-serif">Services</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(4,36,51,0.6)' }}>This page is currently under construction.</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
