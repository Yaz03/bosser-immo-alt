import React from 'react';
import GlassSurface from './ui/GlassSurface';
import { useLanguage } from '../context/LanguageContext';

export default function StatsCard() {
  const { t } = useLanguage();

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
        <div className="stats-number">{t.hero.statsNumber}</div>
        <div className="stats-desc" style={{ whiteSpace: 'pre-line' }}>
          {t.hero.statsDesc}
        </div>
      </div>
    </GlassSurface>
  );
}
