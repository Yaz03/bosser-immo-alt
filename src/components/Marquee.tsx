"use client";

import React from 'react';

export default function Marquee() {
  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      backgroundColor: 'var(--cream)',
      padding: '4rem 0 8rem 0',
      display: 'flex',
      alignItems: 'center',
      borderTop: '1px solid rgba(4,36,51,0.1)'
    }}>
      <div className="marquee-container" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {/* Render text twice for seamless looping */}
        <div className="marquee-content italic-serif">
          MARKET INSIGHTS <span className="dot" style={{ display: 'inline-block', margin: '0 2rem', backgroundColor: 'var(--bronze)', width: '12px', height: '12px' }}></span> 
          OFF-MARKET TRENDS <span className="dot" style={{ display: 'inline-block', margin: '0 2rem', backgroundColor: 'var(--bronze)', width: '12px', height: '12px' }}></span> 
          PREMIUM ESTATES <span className="dot" style={{ display: 'inline-block', margin: '0 2rem', backgroundColor: 'var(--bronze)', width: '12px', height: '12px' }}></span> 
          EXPERT VALUATION <span className="dot" style={{ display: 'inline-block', margin: '0 2rem', backgroundColor: 'var(--bronze)', width: '12px', height: '12px' }}></span>
        </div>
        <div className="marquee-content italic-serif" aria-hidden="true">
          MARKET INSIGHTS <span className="dot" style={{ display: 'inline-block', margin: '0 2rem', backgroundColor: 'var(--bronze)', width: '12px', height: '12px' }}></span> 
          OFF-MARKET TRENDS <span className="dot" style={{ display: 'inline-block', margin: '0 2rem', backgroundColor: 'var(--bronze)', width: '12px', height: '12px' }}></span> 
          PREMIUM ESTATES <span className="dot" style={{ display: 'inline-block', margin: '0 2rem', backgroundColor: 'var(--bronze)', width: '12px', height: '12px' }}></span> 
          EXPERT VALUATION <span className="dot" style={{ display: 'inline-block', margin: '0 2rem', backgroundColor: 'var(--bronze)', width: '12px', height: '12px' }}></span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .marquee-content {
          animation: scroll 25s linear infinite;
          font-size: clamp(4rem, 8vw, 6rem);
          color: rgba(4,36,51, 0.05); /* very subtle watermark effect */
          padding-right: 2rem;
          display: flex;
          align-items: center;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}} />
    </div>
  );
}
