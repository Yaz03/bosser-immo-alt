/**
 * animations.ts
 * Shared GSAP animation presets for Bossert Immobilien.
 *
 * Rules:
 * - Only two easings: power2.out (standard) | power3.out (hero entrance only)
 * - All triggers use start: "top 85%" unless overridden
 * - One-shot sections use once: true (no replay on scroll-back)
 * - prefers-reduced-motion: all timelines skip to end state instantly
 * - GPU-safe transforms only: opacity, y, x, scale, scaleX, scaleY
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Motion preference — read once at module level
// ---------------------------------------------------------------------------
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------------------
// Standard fade-slide-up reveal
// ---------------------------------------------------------------------------
export interface RevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  /** ScrollTrigger start position */
  start?: string;
  /** If true, trigger fires only once (toggleActions: "play none none none") */
  once?: boolean;
  /** ScrollTrigger scroller (default: window) */
  scroller?: string | Element;
}

export function fadeSlideUp(
  targets: gsap.TweenTarget,
  options: RevealOptions = {}
): gsap.core.Tween {
  const {
    y = 40,
    duration = 0.7,
    delay = 0,
    stagger = 0,
    ease = 'power2.out',
    start = 'top 85%',
    once = true,
    scroller,
  } = options;

  const reduced = prefersReducedMotion();

  // Set initial state
  gsap.set(targets, { opacity: 0, y });

  return gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: reduced ? 0 : duration,
    delay: reduced ? 0 : delay,
    stagger: reduced ? 0 : stagger,
    ease,
    scrollTrigger: {
      trigger: targets as Element,
      start,
      toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      scroller: scroller ?? undefined,
    },
  });
}

// ---------------------------------------------------------------------------
// ScaleX reveal (for lines / underlines)
// ---------------------------------------------------------------------------
export function scaleXReveal(
  target: gsap.TweenTarget,
  options: RevealOptions = {}
): gsap.core.Tween {
  const {
    duration = 0.7,
    delay = 0,
    ease = 'power2.out',
    start = 'top 85%',
    once = true,
  } = options;

  const reduced = prefersReducedMotion();

  gsap.set(target, { scaleX: 0, transformOrigin: 'left center' });

  return gsap.to(target, {
    scaleX: 1,
    duration: reduced ? 0 : duration,
    delay: reduced ? 0 : delay,
    ease,
    scrollTrigger: {
      trigger: target as Element,
      start,
      toggleActions: once ? 'play none none none' : 'play reverse play reverse',
    },
  });
}

// ---------------------------------------------------------------------------
// ScaleY reveal (for vertical bars)
// ---------------------------------------------------------------------------
export function scaleYReveal(
  target: gsap.TweenTarget,
  options: RevealOptions = {}
): gsap.core.Tween {
  const {
    duration = 0.8,
    delay = 0,
    ease = 'power2.out',
    start = 'top 85%',
    once = true,
  } = options;

  const reduced = prefersReducedMotion();

  gsap.set(target, { scaleY: 0, transformOrigin: 'top center' });

  return gsap.to(target, {
    scaleY: 1,
    duration: reduced ? 0 : duration,
    delay: reduced ? 0 : delay,
    ease,
    scrollTrigger: {
      trigger: target as Element,
      start,
      toggleActions: once ? 'play none none none' : 'play reverse play reverse',
    },
  });
}

// ---------------------------------------------------------------------------
// Slide-in from side (for split layouts)
// ---------------------------------------------------------------------------
export function slideIn(
  target: gsap.TweenTarget,
  direction: 'left' | 'right',
  options: RevealOptions = {}
): gsap.core.Tween {
  const {
    duration = 0.9,
    delay = 0,
    ease = 'power2.out',
    start = 'top 80%',
    once = true,
  } = options;

  const reduced = prefersReducedMotion();
  const x = direction === 'left' ? -50 : 50;

  gsap.set(target, { opacity: 0, x });

  return gsap.to(target, {
    opacity: 1,
    x: 0,
    duration: reduced ? 0 : duration,
    delay: reduced ? 0 : delay,
    ease,
    scrollTrigger: {
      trigger: target as Element,
      start,
      toggleActions: once ? 'play none none none' : 'play reverse play reverse',
    },
  });
}

// ---------------------------------------------------------------------------
// Parallax (continuous, scroll-linked)
// ---------------------------------------------------------------------------
export function parallax(
  target: gsap.TweenTarget,
  speed = 0.3,
  triggerEl?: Element
): ScrollTrigger {
  if (prefersReducedMotion()) {
    // Return a dummy if user prefers no motion
    return ScrollTrigger.create({ trigger: triggerEl });
  }

  return ScrollTrigger.create({
    trigger: triggerEl,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const yMove = (self.progress - 0.5) * 2 * 80 * speed;
      gsap.set(target, { y: yMove });
    },
  });
}

// ---------------------------------------------------------------------------
// Batch stagger (for card grids — more performant than per-card triggers)
// ---------------------------------------------------------------------------
export function batchReveal(
  targets: string | Element[],
  options: {
    stagger?: number;
    y?: number;
    duration?: number;
    once?: boolean;
    start?: string;
  } = {}
): void {
  const {
    stagger = 0.12,
    y = 40,
    duration = 0.7,
    once = true,
    start = 'top 88%',
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return;
  }

  // Set initial hidden state
  gsap.set(targets, { opacity: 0, y });

  ScrollTrigger.batch(targets, {
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power2.out',
        overwrite: true,
      });
    },
    onLeaveBack: once
      ? undefined
      : (batch) => {
          gsap.to(batch, { opacity: 0, y, duration: 0.4, stagger, overwrite: true });
        },
    start,
  });
}
