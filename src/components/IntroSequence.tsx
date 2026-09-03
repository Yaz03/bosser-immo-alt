"use client";

import React, { useEffect, useState } from 'react';
import styles from './IntroSequence.module.css';

export default function IntroSequence() {
  const [stage, setStage] = useState<'loading' | 'zooming' | 'done'>('loading');

  useEffect(() => {
    // Prevent scrolling while the immersive intro is playing
    document.body.style.overflow = 'hidden';
    
    window.scrollTo(0, 0);

    // Trigger the heavy motion curve shortly after mount
    const zoomTimer = setTimeout(() => {
      setStage('zooming');
    }, 100);

    // The Expo curve completes in 2.2s. We unmount smoothly after it finishes fading out.
    const doneTimer = setTimeout(() => {
      setStage('done');
      document.body.style.overflow = '';
    }, 2500);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (stage === 'done') return null;

  return (
    <div className={styles.introWrapper} aria-hidden="true">
      <div className={`${styles.scaleContainer} ${stage === 'zooming' ? styles.isZooming : ''}`}>
        
        {/* The central transparent window into the site, surrounded by massive Navy shadow */}
        <div className={styles.doorwayHole} />
        
        {/* The white SVG logo laid perfectly over the hole boundaries */}
        <div className={styles.logoImage} />

      </div>
    </div>
  );
}
