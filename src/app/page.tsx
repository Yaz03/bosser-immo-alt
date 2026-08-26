import HeroSection from '@/components/HeroSection';
import SearchSection from '@/components/SearchSection';
import ServicesSection from '@/components/ServicesSection';
import ExploreSection from '@/components/ExploreSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <SearchSection />
      <ExploreSection />
    </main>
  );
}
