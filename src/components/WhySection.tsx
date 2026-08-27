import React from 'react';

export default function WhySection() {
  return (
    <section className="why-section">
      <div className="why-container">
        
        {/* Left Column: Sticky Headline */}
        <div className="why-left-col">
          <div className="why-header-sticky">
            <p className="services-subtitle" style={{ marginBottom: '1rem' }}>
              <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> WHY BOSSERT
            </p>
            <h2 className="why-headline">
              The standard <br />is <span className="italic-serif">absolute.</span>
            </h2>
            <p className="why-subhead">
              We do not chase volume; we curate significance. Our private representation ensures your real estate goals are met with uncompromising discretion and unmatched architectural acumen.
            </p>
            <div className="why-editorial-phrase" style={{ marginTop: '1rem' }}>
              Why Bossert is the singular choice.
            </div>
          </div>
        </div>

        {/* Right Column: Numbers & Philosophy */}
        <div className="why-right-col">
          
          <div className="why-stat-block">
            <div className="why-stat-number">€1.2B</div>
            <div className="why-stat-text">
              Total value of curated assets currently under our exclusive private management. We do not chase volume; we curate significance.
            </div>
          </div>
          
          <div className="why-stat-block">
            <div className="why-stat-number">0%</div>
            <div className="why-stat-text">
              Off-market fail rate. Our vetting process is ruthless. If we accept the mandate to represent your property, we place it.
            </div>
          </div>
          
          <div className="why-stat-block">
            <div className="why-stat-number">14</div>
            <div className="why-stat-text">
              Global ultra-high-net-worth family offices within our direct dial network. We bypass the public market entirely when discretion demands it.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
