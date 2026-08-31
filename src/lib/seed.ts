/**
 * Seed script: Runs on first boot to:
 * 1. Create the Super Admin user from .env
 * 2. Migrate all hardcoded content from locale files into the database
 *
 * Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' src/lib/seed.ts
 * Or: npx prisma db seed
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Sys-ops seed...');

  // ─── 1. Super Admin ───────────────────────────────────────────────────────
  const saEmail = process.env.SUPERADMIN_EMAIL || 'superadmin@bossert-immobilien.de';
  const saPassword = process.env.SUPERADMIN_PASSWORD || 'ChangeMe@2025!';
  const saName = process.env.SUPERADMIN_NAME || 'Super Admin';

  const existing = await prisma.user.findUnique({ where: { email: saEmail } });
  if (!existing) {
    const hashed = await bcrypt.hash(saPassword, 12);
    await prisma.user.create({
      data: { name: saName, email: saEmail, password: hashed, role: 'SUPER_ADMIN' },
    });
    console.log(`✅ Super Admin created: ${saEmail}`);
  } else {
    console.log(`ℹ️  Super Admin already exists: ${saEmail}`);
  }

  // ─── 2. Testimonials ─────────────────────────────────────────────────────
  const testimonialsCount = await prisma.testimonial.count();
  if (testimonialsCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          quoteEn: 'On downsizing after our children moved out; Bossert Immobilien supported us not just in selling our previous property but also in finding a new, suitable home. The guidance felt professional, personal, and reliable throughout.',
          author: 'Schneider',
          location: 'Home Sale & Purchase',
          image: '/test_bg_villa.jpg',
          order: 0,
        },
        {
          quoteEn: 'Excellent property exposé, prompt responsiveness, and accurate property description. The experience was fully satisfactory.',
          author: 'Fr. H',
          location: 'Property Purchase',
          image: '/test_bg_penthouse.jpg',
          order: 1,
        },
        {
          quoteEn: 'We have worked with Bossert Immobilien multiple times over the years for property marketing. Each experience has been a genuine relief and consistently positive.',
          author: 'W. Mayer',
          location: 'Multiple Transactions',
          image: '/test_bg_estate.jpg',
          order: 2,
        },
      ],
    });
    console.log('✅ Testimonials seeded');
  }

  // ─── 3. Team Members ─────────────────────────────────────────────────────
  const teamCount = await prisma.teamMember.count();
  if (teamCount === 0) {
    await prisma.teamMember.createMany({
      data: [
        {
          name: 'Maximilian Bossert',
          titleEn: 'Founder & Managing Director',
          quoteEn: '"True luxury in real estate is found in the details—both in the properties we represent and the service we provide."',
          order: 0,
        },
        {
          name: 'Elena Bossert',
          titleEn: 'Director of Premium Sales',
          quoteEn: '"We don\'t just sell homes; we match unique individuals with spaces that perfectly reflect their lifestyle."',
          order: 1,
        },
      ],
    });
    console.log('✅ Team members seeded');
  }

  // ─── 4. FAQs ─────────────────────────────────────────────────────────────
  const faqCount = await prisma.fAQ.count();
  if (faqCount === 0) {
    await prisma.fAQ.createMany({
      data: [
        {
          questionEn: 'How do I get started with buying property?',
          answerEn: 'Our principals will schedule a private consultation to understand your exact portfolio requirements before presenting curated, off-market options.',
          order: 0,
        },
        {
          questionEn: 'Do you offer support for property rentals?',
          answerEn: 'We focus exclusively on high-net-worth acquisitions and sales, ensuring absolute discretion for luxury properties.',
          order: 1,
        },
        {
          questionEn: 'How does the off-market process work?',
          answerEn: 'We leverage a private network of investors and owners, allowing you to buy or sell without public listings or portals.',
          order: 2,
        },
      ],
    });
    console.log('✅ FAQs seeded');
  }

  // ─── 5. Site Settings (Home Page) ────────────────────────────────────────
  const settingsCount = await prisma.siteSetting.count({ where: { page: 'home' } });
  if (settingsCount === 0) {
    const homeSettings = [
      { keyName: 'hero.since', valueEn: 'Since 1991' },
      { keyName: 'hero.headlineTop', valueEn: 'A DIFFERENT' },
      { keyName: 'hero.headlineMiddle', valueEn: 'Perspective' },
      { keyName: 'hero.headlineBottom', valueEn: 'On' },
      { keyName: 'hero.headlineBottom2', valueEn: 'Real Estate.' },
      { keyName: 'hero.experience', valueEn: 'Over 30 years of excellence in premium real estate across the Rhein-Main region.' },
      { keyName: 'hero.statsNumber', valueEn: '500+' },
      { keyName: 'cta.headline', valueEn: 'Connect' },
      { keyName: 'cta.headlineSerif', valueEn: 'with Bossert.' },
      { keyName: 'cta.subhead', valueEn: 'Whether you are exploring a property, have a project in mind, or wish to discuss an off-market opportunity, we offer absolute discretion.' },
    ];
    await prisma.siteSetting.createMany({
      data: homeSettings.map((s) => ({ page: 'home', ...s })),
    });
    console.log('✅ Home page settings seeded');
  }

  // ─── 6. Knowledge Articles ───────────────────────────────────────────────
  const articlesCount = await prisma.article.count();
  if (articlesCount === 0) {
    await prisma.article.createMany({
      data: [
        {
          slug: 'q3-frankfurt-luxury-market-report',
          category: 'Market Reports',
          date: 'OCTOBER 2023',
          heroImage: '/images/owners_bg_wide.jpg',
          featured: true,
          status: 'PUBLISHED',
          titleEn: 'The Q3 Frankfurt Luxury Market Report',
          descEn: 'An in-depth analysis of high-end residential real estate trends, off-market shifts, and capital appreciation in Frankfurt\'s most exclusive districts.',
          contentEn: `The Frankfurt luxury real estate market has seen unprecedented shifts in the third quarter of 2023.\n\n### The Shift to Off-Market\nOne of the most notable trends is the increasing volume of transactions occurring entirely off-market.\n\n### Capital Appreciation\nDespite macroeconomic headwinds, core premium districts have maintained their value.`,
        },
        {
          slug: 'preserving-heritage',
          category: 'Architecture',
          date: 'SEPTEMBER 2023',
          heroImage: '/images/owners_editorial.jpg',
          status: 'PUBLISHED',
          titleEn: 'Preserving Heritage: The Revival of Altbau Estates',
          descEn: 'How historical properties are being modernized without sacrificing their original architectural integrity.',
          contentEn: `Germany's historic "Altbau" properties hold a unique place in the luxury market.\n\n### The Modernization Challenge\nUpdating these 19th and early 20th-century buildings to meet 21st-century standards requires profound architectural sensitivity.`,
        },
        {
          slug: 'navigating-off-market',
          category: 'Investment',
          date: 'AUGUST 2023',
          heroImage: '/test_bg_penthouse.jpg',
          status: 'PUBLISHED',
          titleEn: 'Navigating the Off-Market Landscape',
          descEn: 'Why the most significant transactions in prime locations happen behind closed doors, and how to access them.',
          contentEn: 'In the upper echelons of the real estate market, visibility is often viewed as a disadvantage.',
        },
        {
          slug: 'legal-regulations',
          category: 'Legal',
          date: 'JULY 2023',
          heroImage: '/test_bg_villa.jpg',
          status: 'PUBLISHED',
          titleEn: 'New Regulations for Heritage Properties',
          descEn: 'A comprehensive guide to navigating the latest zoning and renovation laws for listed buildings.',
          contentEn: 'Owning a listed building (Denkmalschutz) is a privilege that comes with strict responsibilities.',
        },
      ],
    });
    console.log('✅ Articles seeded');
  }

  // ─── 7. Base Properties ──────────────────────────────────────────────────
  const propCount = await prisma.property.count();
  if (propCount === 0) {
    const baseProps = [
      {
        type: 'Luxury Villa',
        priceDisplay: '€ 4,250,000',
        priceValue: 4250000,
        location: 'Frankfurt, DE',
        specs: '5 Beds • 6 Baths • 650 m²',
        beds: 5, baths: 6, areaSqm: 650,
        status: 'PUBLISHED' as const,
        featured: true,
        heroImage: '/images/prop_villa_1787771383699.jpg',
        descriptionEn: 'An architectural masterpiece offering unparalleled luxury and sophistication. This stunning villa features bespoke finishes, soaring ceilings, and panoramic views of the surrounding landscape.',
        amenities: ['Infinity Pool', 'Home Theater', 'Wine Cellar', 'Smart Home System', "Chef's Kitchen", 'Spa & Sauna'],
      },
      {
        type: 'Historic Estate',
        priceDisplay: '€ 8,900,000',
        priceValue: 8900000,
        location: 'Wiesbaden, DE',
        specs: '8 Beds • 10 Baths • 1,200 m²',
        beds: 8, baths: 10, areaSqm: 1200,
        status: 'PUBLISHED' as const,
        featured: true,
        heroImage: '/images/prop_estate_1787771411381.jpg',
        descriptionEn: 'A rare heritage property offering a seamless blend of historic grandeur and contemporary refinement.',
        amenities: ['Private Chapel', 'Stables', 'Walled Garden', 'Staff Quarters', 'Wine Cellar'],
      },
      {
        type: 'Penthouse',
        priceDisplay: '€ 3,100,000',
        priceValue: 3100000,
        location: 'Frankfurt, DE',
        specs: '3 Beds • 3 Baths • 280 m²',
        beds: 3, baths: 3, areaSqm: 280,
        status: 'PUBLISHED' as const,
        featured: true,
        heroImage: '/images/prop_penthouse_1787771396787.jpg',
        descriptionEn: 'Elevated living at its finest. This full-floor penthouse commands sweeping city panoramas from every room.',
        amenities: ['Rooftop Terrace', 'Concierge Service', 'Private Lift', 'Smart Home'],
      },
      {
        type: 'Modern Apartment',
        priceDisplay: '€ 1,850,000',
        priceValue: 1850000,
        location: 'Mainz, DE',
        specs: '2 Beds • 2 Baths • 160 m²',
        beds: 2, baths: 2, areaSqm: 160,
        status: 'PUBLISHED' as const,
        featured: false,
        heroImage: '/images/prop_apartment_new.jpg',
        descriptionEn: 'A sleek, contemporary residence in a sought-after riverside location.',
        amenities: ['Underground Parking', 'Fitness Center', 'Concierge', 'Balcony'],
      },
    ];

    for (const prop of baseProps) {
      const { amenities, ...propData } = prop;
      const created = await prisma.property.create({ data: propData });
      if (amenities) {
        await prisma.propertyAmenity.createMany({
          data: amenities.map((name) => ({ propertyId: created.id, name })),
        });
      }
    }
    console.log('✅ Base properties seeded');
  }

  console.log('\n🎉 Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

