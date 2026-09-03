import HeroSection from '@/components/HeroSection';
import IntroSequence from '@/components/IntroSequence';

// Phase 1: Hero + Navbar only.
// Old section components remain in /components/ for reference.
// New sections will be added here section by section.

export default function Home() {
  return (
    <main>
      <IntroSequence />
      <HeroSection />
    </main>
  );
}
