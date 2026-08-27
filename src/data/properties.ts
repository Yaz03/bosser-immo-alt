export interface Property {
  id: string;
  imageSrc: string;
  type: string;
  price: string;
  location: string;
  specs: string;
  featured?: boolean;
  galleryImages?: string[];
  description?: string;
  amenities?: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
  floorPlans?: string[];
  documents?: { title: string; url: string }[];
  locationData?: {
    coordinates?: [number, number];
    schools?: { name: string; distance: string }[];
    transport?: { name: string; type: string; distance: string }[];
  };
  financials?: {
    propertyTax?: number;
    hoaFees?: number;
  };
}

const baseProperties: Property[] = [
  {
    id: 'prop-base-1',
    imageSrc: '/images/prop_villa_1787771383699.jpg',
    type: 'Luxury Villa',
    price: '€ 4,250,000',
    location: 'Los Angeles, CA',
    specs: '5 Beds • 6 Baths • 650 m²',
    featured: true,
    galleryImages: [
      '/images/prop_villa_1787771383699.jpg',
      '/test_bg_villa.jpg',
      '/background.jpg',
      '/images/prop_penthouse_1787771396787.jpg'
    ],
    description: 'An architectural masterpiece offering unparalleled luxury and sophistication. This stunning villa features bespoke finishes, soaring ceilings, and panoramic views of the surrounding landscape. The expansive outdoor living spaces, including an infinity pool and lush gardens, create a perfect sanctuary for relaxation and entertainment.',
    amenities: ['Infinity Pool', 'Home Theater', 'Wine Cellar', 'Smart Home System', 'Chef\'s Kitchen', 'Spa & Sauna'],
    videoUrl: 'https://www.youtube.com/embed/S2qYJdK0-hE',
    virtualTourUrl: 'https://my.matterport.com/show/?m=placeholder',
    floorPlans: ['/images/floorplan_placeholder.jpg'],
    documents: [
      { title: 'Property Brochure', url: '/brochure.pdf' },
      { title: 'Energy Performance Certificate', url: '/epc.pdf' }
    ],
    locationData: {
      coordinates: [34.0522, -118.2437],
      schools: [
        { name: 'Beverly Hills High', distance: '1.2 km' },
        { name: 'Westwood Elementary', distance: '0.8 km' }
      ],
      transport: [
        { name: 'Sunset Blvd Station', type: 'Bus', distance: '0.5 km' }
      ]
    },
    financials: {
      propertyTax: 42500,
      hoaFees: 1200
    }
  },
  {
    id: 'prop-base-2',
    imageSrc: '/images/prop_estate_1787771411381.jpg',
    type: 'Historic Estate',
    price: '€ 8,900,000',
    location: 'Cotswolds, UK',
    specs: '8 Beds • 10 Baths • 1,200 m²',
    featured: true
  },
  {
    id: 'prop-base-3',
    imageSrc: '/images/prop_penthouse_1787771396787.jpg',
    type: 'Penthouse',
    price: '€ 3,100,000',
    location: 'London, UK',
    specs: '3 Beds • 3 Baths • 280 m²',
    featured: true
  },
  {
    id: 'prop-base-4',
    imageSrc: '/images/prop_apartment_new.jpg',
    type: 'Modern Apartment',
    price: '€ 1,850,000',
    location: 'Malibu, CA',
    specs: '2 Beds • 2 Baths • 160 m²',
    featured: true
  },
  {
    id: 'prop-base-5',
    imageSrc: '/images/owners_editorial.jpg',
    type: 'City Townhouse',
    price: '€ 2,400,000',
    location: 'Berlin, DE',
    specs: '4 Beds • 3 Baths • 320 m²'
  },
  {
    id: 'prop-base-6',
    imageSrc: '/images/owners_cream.jpg',
    type: 'Minimalist Loft',
    price: '€ 1,150,000',
    location: 'Frankfurt, DE',
    specs: '2 Beds • 2 Baths • 145 m²'
  },
  {
    id: 'prop-base-7',
    imageSrc: '/images/owners_bg_wide.jpg',
    type: 'Waterfront Villa',
    price: '€ 6,700,000',
    location: 'Lake Como, IT',
    specs: '6 Beds • 7 Baths • 850 m²'
  },
  {
    id: 'prop-base-8',
    imageSrc: '/images/prop_villa_1787771383699.jpg',
    type: 'Modern Mansion',
    price: '€ 12,500,000',
    location: 'Miami, FL',
    specs: '7 Beds • 9 Baths • 1,400 m²'
  }
];

export const mockProperties: Property[] = Array.from({ length: 50 }, (_, i) => {
  const baseProp = baseProperties[i % baseProperties.length];
  return {
    ...baseProp,
    id: `prop-${i + 1}`
  };
});
