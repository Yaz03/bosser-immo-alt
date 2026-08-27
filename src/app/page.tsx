import HeroSection from '@/components/HeroSection';
import SearchSection from '@/components/SearchSection';
import ServicesSection from '@/components/ServicesSection';
import ExploreSection from '@/components/ExploreSection';
import WhySection from '@/components/WhySection';
import TestimonialSection from '@/components/TestimonialSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <SearchSection />
      <ExploreSection />
      <WhySection />
      <TestimonialSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
