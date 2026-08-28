"use client";
import React, { useRef, useEffect, useState } from 'react';

interface Props {
  l1: string;
  s1: string;
  l2: string;
  l3: string;
  s2: string;
  l4: string;
}

export default function ApproachHeadline({ l1, s1, l2, l3, s2, l4 }: Props) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Starts revealing when element top is at 90% of viewport height (comes into view)
      const start = windowHeight * 0.9;
      // Ends revealing when element bottom is at 40% of viewport height (near center)
      const end = windowHeight * 0.4;
      
      const current = rect.top;
      
      if (current > start) {
        setProgress(0);
      } else if (current < end) {
        setProgress(1);
      } else {
        setProgress(1 - ((current - end) / (start - end)));
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation in case it's already in view
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fullText = l1 + s1 + l2 + ' ' + l3 + s2 + l4;
  const totalChars = fullText.length;
  
  let currentIndex = 0;

  const renderChars = (text: string, isItalic: boolean) => {
    return text.split('').map((char, i) => {
      const charIndex = currentIndex++;
      // 15% window for a single character to transition from faded to solid
      const windowSize = 0.15; 
      // Compress threshold so the very last character finishes when progress = 1
      const charThreshold = (charIndex / totalChars) * (1 - windowSize);
      
      let opacity = 0.15; 
      
      if (progress > charThreshold + windowSize) {
        opacity = 1;
      } else if (progress > charThreshold) {
        opacity = 0.15 + 0.85 * ((progress - charThreshold) / windowSize);
      }

      return (
        <span 
          key={`${i}-${char}`} 
          className={isItalic ? "italic-serif" : ""}
          style={{ 
            opacity, 
            transition: 'opacity 0.1s ease-out',
            fontWeight: isItalic ? 400 : 600,
            fontFamily: isItalic ? 'var(--font-instrument), serif' : undefined,
            fontStyle: isItalic ? 'italic' : undefined
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <h2 
      ref={containerRef}
      style={{ 
        fontSize: 'clamp(1.75rem, 4.5vw, 4.5rem)', 
        letterSpacing: '-0.04em', 
        lineHeight: 1, 
        textAlign: 'center', 
        color: 'var(--navy)', 
        textWrap: 'balance', 
        maxWidth: '1300px', 
        margin: '0 auto' 
      }}
    >
      {renderChars(l1, false)}
      {renderChars(s1, true)}
      {renderChars(l2 + ' ', false)}
      {renderChars(l3, false)}
      {renderChars(s2, true)}
      {renderChars(l4, false)}
    </h2>
  );
}
