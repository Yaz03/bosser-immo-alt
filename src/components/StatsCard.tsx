import React from 'react';
import GlassSurface from './ui/GlassSurface';

export default function StatsCard() {
  return (
    <GlassSurface
      width="100%"
      height="auto"
      borderRadius={24}
      opacity={0.8}
      blur={11}
      displace={0.5}
      distortionScale={-180}
      redOffset={0}
      greenOffset={10}
      blueOffset={20}
      brightness={10}
      mixBlendMode="screen"
    >
      <div className="stats-card" style={{ background: 'transparent', backdropFilter: 'none', border: 'none', boxShadow: 'none' }}>
        <div className="stats-number">500+</div>
        <div className="stats-desc">
          Successful innovative projects<br />
          delivered across the Rhine-<br />
          Main area from 1991.
        </div>
      </div>
    </GlassSurface>
  );
}
