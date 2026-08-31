import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/properties — Public endpoint, no auth required
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const location = searchParams.get('location') || '';
  const type = searchParams.get('type') || '';
  const beds = searchParams.get('beds') || '';
  const minPrice = parseFloat(searchParams.get('minPrice') || '0');
  const maxPrice = parseFloat(searchParams.get('maxPrice') || '0');
  const minSqm = parseFloat(searchParams.get('minSqm') || '0');
  const maxSqm = parseFloat(searchParams.get('maxSqm') || '0');
  const featured = searchParams.get('featured') === 'true';

  // Build Prisma where clause
  const where: Record<string, unknown> = {
    status: 'PUBLISHED',
  };

  if (featured) where.featured = true;
  if (location) where.location = { contains: location };
  if (type && type !== 'Any') where.type = { contains: type };
  if (beds && beds !== 'Any') {
    const minBeds = parseInt(beds.replace('+', ''), 10);
    where.beds = { gte: minBeds };
  }
  if (minPrice > 0 || maxPrice > 0) {
    where.priceValue = {};
    if (minPrice > 0) (where.priceValue as Record<string, number>).gte = minPrice;
    if (maxPrice > 0) (where.priceValue as Record<string, number>).lte = maxPrice;
  }
  if (minSqm > 0 || maxSqm > 0) {
    where.areaSqm = {};
    if (minSqm > 0) (where.areaSqm as Record<string, number>).gte = minSqm;
    if (maxSqm > 0) (where.areaSqm as Record<string, number>).lte = maxSqm;
  }

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      include: {
        images: { orderBy: { order: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.property.count({ where }),
  ]);

  return NextResponse.json({ properties, total, page, limit });
}
