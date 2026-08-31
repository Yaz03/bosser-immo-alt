"use client";

import React, { useEffect, useRef, useState, ReactNode } from 'react';

/**
 * SmoothScrollProvider
 * Wraps content to provide a momentum-based smooth scroll using a native scroll spacer.
 * Respects prefers-reduced-motion by falling back to native scrolling completely.
 */
export const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  
  // Track scroll positions
  const currentY = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    // Modern way to listen to matchMedia changes
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    // Reset positions on mount to avoid jumping if scrolled previously
    currentY.current = window.scrollY;
    targetY.current = window.scrollY;

    const content = contentRef.current;
    const spacer = spacerRef.current;
    
    if (!content || !spacer) return;

    // Keep spacer height synced with content height
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (spacer) {
          spacer.style.height = `${entry.contentRect.height}px`;
        }
      }
    });
    
    resizeObserver.observe(content);

    // Update targetY on scroll (this ensures keyboard/touch/wheel all work natively)
    const handleScroll = () => {
      targetY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // The lerp loop
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      // Lerp factor ~0.08 for a smooth glide
      currentY.current = lerp(currentY.current, targetY.current, 0.08);
      
      // Stop decimal jittering when close enough
      if (Math.abs(targetY.current - currentY.current) < 0.05) {
        currentY.current = targetY.current;
      }
      
      if (content) {
        content.style.transform = `translate3d(0, -${currentY.current}px, 0)`;
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      
      // Cleanup transform if unmounted
      if (content) content.style.transform = 'none';
    };
  }, [isReducedMotion]);

  if (isReducedMotion) {
    return <>{children}</>;
  }

  return (
    <>
      <div ref={spacerRef} className="smooth-scroll-spacer" style={{ width: '100%' }} />
      <div 
        ref={contentRef} 
        className="smooth-scroll-content"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          willChange: 'transform',
          // overflow: 'hidden' is problematic if there are sticky headers, 
          // but we can leave it off unless needed. It prevents horizontal scroll issues.
          overflow: 'hidden'
        }}
      >
        {children}
      </div>
    </>
  );
};
