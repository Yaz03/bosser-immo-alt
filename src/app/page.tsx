import HeroSection from '@/components/HeroSection';
import IntroSequence from '@/components/IntroSequence';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import FindPropertySection from '@/components/FindPropertySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ConsultationSection from '@/components/ConsultationSection';
import SearchProfileBanner from '@/components/SearchProfileBanner';
import Footer from '@/components/Footer';

// Phase 1: Hero + Navbar only.
// Old section components remain in /components/ for reference.
// New sections will be added here section by section.

export default function Home() {
  return (
    <main>
      <IntroSequence />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FindPropertySection />
      <TestimonialsSection />
      <ConsultationSection />
      <SearchProfileBanner />
      <Footer />
    </main>
  );
}
