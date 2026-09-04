/**
 * useGSAP.ts
 * Thin hook that creates a scoped GSAP context for a container ref.
 * Automatically cleans up all ScrollTrigger instances and tweens on unmount,
 * preventing memory leaks on Next.js route changes.
 *
 * Usage:
 *   const containerRef = useRef<HTMLElement>(null);
 *   useGSAP(containerRef, (ctx) => {
 *     // All GSAP code here is automatically cleaned up
 *     gsap.from('.my-el', { opacity: 0, y: 30 });
 *   });
 */

'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type GSAPContextCallback = (ctx: gsap.Context) => void;

export function useGSAP<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  callback: GSAPContextCallback,
  deps: React.DependencyList = []
): void {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Create a scoped GSAP context — all animations within are tracked
    // NOTE: gsap.context() executes its callback synchronously, before
    // `ctx` is assigned, so we must use the `self` parameter GSAP provides.
    const ctx = gsap.context((self) => {
      callback(self);
    }, el);

    return () => {
      // Reverts all animations and kills all ScrollTrigger instances in scope
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Call ScrollTrigger.refresh() after all page images and fonts have loaded.
 * Prevents layout-shift from breaking trigger positions on the 800vh sticky section.
 */
export function useScrollTriggerRefresh(): void {
  useEffect(() => {
    const refresh = () => {
      ScrollTrigger.refresh();
    };

    // Refresh after document fonts load
    document.fonts.ready.then(refresh);

    // Refresh after all images finish loading
    const images = Array.from(document.querySelectorAll('img'));
    const pending = images.filter((img) => !img.complete);

    if (pending.length === 0) {
      // All images already loaded
      refresh();
    } else {
      let loaded = 0;
      const onLoad = () => {
        loaded++;
        if (loaded >= pending.length) refresh();
      };
      pending.forEach((img) => {
        img.addEventListener('load', onLoad, { once: true });
        img.addEventListener('error', onLoad, { once: true });
      });
    }

    // Safety net: also refresh after a short delay (handles web fonts / lazy images)
    const timer = setTimeout(refresh, 800);

    return () => clearTimeout(timer);
  }, []);
}
