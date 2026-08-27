"use client";

import { useEffect, useState, useRef } from 'react';

/**
 * useScrollReveal
 * @param threshold - Number between 0 and 1 indicating how much of the element must be visible before triggering
 * @param triggerOnce - If true, the animation only runs once when first scrolled into view
 * @returns [ref, isVisible] - Attach the ref to the element, and apply classes based on isVisible
 */
export function useScrollReveal(threshold = 0.15, triggerOnce = true) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<IntersectionObserverEntry>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current as any);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Triggers slightly before it fully crosses the bottom
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce]);

  return { ref, isVisible };
}
