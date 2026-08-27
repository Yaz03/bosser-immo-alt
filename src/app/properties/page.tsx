import PropertiesHero from '@/components/PropertiesHero';
import SearchSection from '@/components/SearchSection';
import PropertiesGrid from '@/components/PropertiesGrid';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

export default function PropertiesPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <PropertiesHero />
      <SearchSection hideHeader={true} isDarkBg={true} hideResultsCount={true} />
      <PropertiesGrid />
      <CtaSection variant="properties" />
      <Footer />
    </main>
  );
}
