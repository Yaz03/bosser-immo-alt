"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  tag?: string;
  l1: string;
  s1: string;
  l2: string;
  l3: string;
  s2: string;
  l4: string;
  bgImage?: string;
}

export default function ApproachHeadline({ tag, l1, s1, l2, l3, s2, l4, bgImage }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    let currentProgress = 0;

    const tick = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollableDistance = rect.height - windowHeight;
        
        let targetProgress = 0;
        
        if (rect.top <= 0) {
          if (rect.top >= -scrollableDistance) {
            targetProgress = -rect.top / scrollableDistance;
          } else {
            targetProgress = 1;
          }
        }

        currentProgress += (targetProgress - currentProgress) * 0.1;
        
        if (Math.abs(targetProgress - currentProgress) < 0.001) currentProgress = targetProgress;
        
        setProgress((prev) => {
          if (Math.abs(prev - currentProgress) > 0.01 || currentProgress === targetProgress) {
            return currentProgress;
          }
          return prev;
        });
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const fullText = l1 + s1 + l2 + ' ' + l3 + s2 + l4;
  const totalChars = fullText.length;
  
  let currentIndex = 0;
  
  // Timeline Definitions
  const bgFadeEnd = 0.25; // Background finishes fading in by progress 0.25
  const textStart = 0.25; // Text starts revealing right after background finishes
  const holdDuration = 0.3; // Hold fully lit text for the last 30% of scroll
  const textEnd = 1 - holdDuration; // 0.70
  
  let bgFadeProgress = 0;
  if (progress > 0) {
    bgFadeProgress = Math.min(1, progress / bgFadeEnd);
  }

  const renderChars = (text: string, isItalic: boolean) => {
    return text.split('').map((char, i) => {
      const charIndex = currentIndex++;
      // 10% window for a single character to transition from faded to solid
      const windowSize = 0.1; 
      
      // Distribute character thresholds between textStart and (textEnd - windowSize)
      const charThreshold = textStart + (charIndex / totalChars) * (textEnd - textStart - windowSize);
      
      let opacity = 0.05; 
      
      if (progress > charThreshold + windowSize) {
        opacity = 1;
      } else if (progress > charThreshold) {
        opacity = 0.05 + 0.95 * ((progress - charThreshold) / windowSize);
      }

      return (
        <span 
          key={`${i}-${char}`} 
          className={isItalic ? "italic-serif" : ""}
          style={{ 
            opacity, 
            transition: 'opacity 0.4s ease-out',
            fontWeight: isItalic ? 400 : 600,
            fontFamily: isItalic ? 'var(--font-instrument), serif' : undefined,
            fontStyle: isItalic ? 'italic' : undefined,
            color: 'var(--navy)'
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      <div 
        ref={innerRef}
        style={{ 
          position: 'sticky', 
          top: 0,
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {bgImage && (
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: bgFadeProgress, // Fully reveals the transparent PNG
              zIndex: -1,
              pointerEvents: 'none'
            }}
          >
            <Image 
              src={bgImage}
              alt="Background Texture"
              fill
              style={{ 
                objectFit: 'cover'
              }}
            />
          </div>
        )}

        {tag && (
          <div style={{ textAlign: 'center', marginBottom: '4rem', opacity: progress > 0 ? (1 - progress * 2) : 1, transition: 'opacity 0.1s ease-out' }}>
            <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', marginLeft: '0.5rem' }}>
              {tag}
            </span>
          </div>
        )}
        <h2 
          style={{ 
            fontSize: 'clamp(1.75rem, 4.5vw, 4.5rem)', 
            letterSpacing: '-0.04em', 
            lineHeight: 1, 
            textAlign: 'center', 
            color: 'var(--navy)', 
            textWrap: 'balance', 
            maxWidth: '1300px', 
            margin: '0 auto',
            padding: '0 2rem'
          }}
        >
          {renderChars(l1, false)}
          {renderChars(s1, true)}
          {renderChars(l2 + ' ', false)}
          {renderChars(l3, false)}
          {renderChars(s2, true)}
          {renderChars(l4, false)}
        </h2>
      </div>
    </div>
  );
}
