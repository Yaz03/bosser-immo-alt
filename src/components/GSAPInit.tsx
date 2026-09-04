'use client';
import { useScrollTriggerRefresh } from '@/hooks/useGSAP';

/**
 * GSAPInit — mounts at root layout level.
 * Calls ScrollTrigger.refresh() after fonts + images load
 * so the 800vh sticky AboutSection triggers don't compute
 * against a pre-shift layout.
 */
export default function GSAPInit() {
  useScrollTriggerRefresh();
  return null;
}
