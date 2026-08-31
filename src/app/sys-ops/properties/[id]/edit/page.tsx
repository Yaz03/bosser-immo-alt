import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect, notFound } from 'next/navigation';
import PropertyForm from '@/components/sys-ops/PropertyForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: PageProps) {
  const session = await auth();
  if (!session) redirect('/sys-ops/login');

  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: 'asc' } },
      amenities: true,
      floorPlans: { orderBy: { order: 'asc' } },
      schools: true,
      transport: true,
      documents: true,
    },
  });

  if (!property) notFound();

  // Map DB → form shape
  const initialData = {
    id: property.id,
    type: property.type,
    priceDisplay: property.priceDisplay,
    priceValue: property.priceValue?.toString() || '',
    location: property.location,
    specs: property.specs,
    beds: property.beds?.toString() || '',
    baths: property.baths?.toString() || '',
    areaSqm: property.areaSqm?.toString() || '',
    status: property.status,
    featured: property.featured,
    descriptionEn: property.descriptionEn || '',
    videoUrl: property.videoUrl || '',
    virtualTourUrl: property.virtualTourUrl || '',
    heroImage: property.heroImage || '',
    galleryImages: property.images.map((img) => img.url),
    floorPlanImages: property.floorPlans.map((fp) => fp.url),
    amenities: property.amenities.map((a) => a.name).join('\n'),
    lat: property.lat?.toString() || '',
    lng: property.lng?.toString() || '',
    propertyTax: property.propertyTax?.toString() || '',
    hoaFees: property.hoaFees?.toString() || '',
    schools: property.schools.map((s) => ({ name: s.name, distance: s.distance })),
    transport: property.transport.map((t) => ({ name: t.name, type: t.type, distance: t.distance })),
    documents: property.documents.map((d) => ({ title: d.title, url: d.url })),
  };

  return <PropertyForm mode="edit" initialData={initialData} />;
}
