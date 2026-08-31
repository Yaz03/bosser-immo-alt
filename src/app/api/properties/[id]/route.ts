import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/properties/[id] — Public endpoint
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const property = await prisma.property.findUnique({
    where: { id: params.id, status: 'PUBLISHED' },
    include: {
      images: { orderBy: { order: 'asc' } },
      amenities: true,
      floorPlans: { orderBy: { order: 'asc' } },
      documents: true,
      schools: true,
      transport: true,
    },
  });

  if (!property) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }

  return NextResponse.json(property);
}
