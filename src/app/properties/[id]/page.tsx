import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyHeader from '@/components/property/PropertyHeader';
import PropertyMediaTabs from '@/components/property/PropertyMediaTabs';
import PropertyLocation from '@/components/property/PropertyLocation';
import MortgageCalculator from '@/components/property/MortgageCalculator';
import PropertyPOIs from '@/components/property/PropertyPOIs';
import Button from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch from database
  const dbProperty = await prisma.property.findUnique({
    where: { id, status: 'PUBLISHED' },
    include: {
      images: { orderBy: { order: 'asc' } },
      amenities: true,
      floorPlans: { orderBy: { order: 'asc' } },
      documents: true,
      schools: true,
      transport: true,
    },
  });

  if (!dbProperty) {
    notFound();
  }

  // Map DB shape → the shape components expect
  const property = {
    id: dbProperty.id,
    imageSrc: dbProperty.heroImage || dbProperty.images[0]?.url || '',
    type: dbProperty.type,
    price: dbProperty.priceDisplay,
    location: dbProperty.location,
    specs: dbProperty.specs,
    galleryImages: dbProperty.images.map((img) => img.url),
    description: dbProperty.descriptionEn || undefined,
    amenities: dbProperty.amenities.map((a) => a.name),
    videoUrl: dbProperty.videoUrl || undefined,
    virtualTourUrl: dbProperty.virtualTourUrl || undefined,
    floorPlans: dbProperty.floorPlans.map((fp) => fp.url),
    documents: dbProperty.documents.map((d) => ({ title: d.title, url: d.url })),
    locationData: {
      coordinates: dbProperty.lat && dbProperty.lng
        ? [dbProperty.lat, dbProperty.lng] as [number, number]
        : undefined,
      schools: dbProperty.schools.map((s) => ({ name: s.name, distance: s.distance })),
      transport: dbProperty.transport.map((t) => ({ name: t.name, type: t.type, distance: t.distance })),
    },
    financials: {
      propertyTax: dbProperty.propertyTax ?? undefined,
      hoaFees: dbProperty.hoaFees ?? undefined,
    },
  };

  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', paddingTop: '160px' }}>
      <Navbar invertOnLoad={true} />

      <div className="inner-page-container">
        <PropertyGallery images={property.galleryImages} fallbackImage={property.imageSrc} />

        <div className="property-content-wrapper">
          <PropertyHeader property={property} />

          <div className="property-details-grid">
            <div className="property-main-col">
              {property.description && (
                <section className="property-section">
                  <h2 className="property-section-title">About this property</h2>
                  <p className="property-description">{property.description}</p>
                </section>
              )}

              {property.amenities && property.amenities.length > 0 && (
                <section className="property-section">
                  <h2 className="property-section-title">Amenities</h2>
                  <ul className="property-amenities-list">
                    {property.amenities.map((amenity, idx) => (
                      <li key={idx}>{amenity}</li>
                    ))}
                  </ul>
                </section>
              )}

              <PropertyMediaTabs property={property} />
              <PropertyLocation locationData={property.locationData} />
            </div>

            <div className="property-side-col">
              <MortgageCalculator priceStr={property.price} financials={property.financials} />
              <PropertyPOIs locationData={property.locationData} />

              <div className="property-sidebar-widget agent-widget">
                <h3>Interested in this property?</h3>
                <p>Our senior advisors are available to provide more information and arrange a private viewing.</p>
                <div style={{ marginTop: '1.5rem', display: 'flex' }}>
                  <Button variant="dark" style={{ width: '100%', justifyContent: 'space-between' }}>Contact Us</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
