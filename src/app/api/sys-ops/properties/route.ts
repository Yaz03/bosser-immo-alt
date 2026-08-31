import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeAuditLog } from '@/lib/audit';
import { canEdit } from '@/lib/auth';
import type { Role } from '@prisma/client';

// GET /api/sys-ops/properties - List all properties with filters
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const status = searchParams.get('status');
  const type = searchParams.get('type');
  const search = searchParams.get('search');

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (type) where.type = type;
  if (search) {
    where.OR = [
      { type: { contains: search } },
      { location: { contains: search } },
    ];
  }

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      include: { images: { take: 1, orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.property.count({ where }),
  ]);

  return NextResponse.json({ properties, total, page, limit });
}

// POST /api/sys-ops/properties - Create property
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userRole = (session.user as { role: Role }).role;
  if (!canEdit(userRole)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();

  const property = await prisma.property.create({
    data: {
      type: body.type,
      priceDisplay: body.priceDisplay,
      priceValue: body.priceValue,
      location: body.location,
      specs: body.specs,
      beds: body.beds,
      baths: body.baths,
      areaSqm: body.areaSqm,
      status: body.status || 'DRAFT',
      featured: body.featured || false,
      heroImage: body.heroImage,
      videoUrl: body.videoUrl,
      virtualTourUrl: body.virtualTourUrl,
      descriptionEn: body.descriptionEn,
      descriptionDe: body.descriptionDe,
      lat: body.lat,
      lng: body.lng,
      propertyTax: body.propertyTax,
      hoaFees: body.hoaFees,
    },
  });

  await writeAuditLog({
    userId: session.user!.id as string,
    userEmail: session.user!.email!,
    action: 'CREATE',
    entityType: 'Property',
    entityId: property.id,
    detail: `Created property: ${property.type} in ${property.location}`,
  });

  return NextResponse.json(property, { status: 201 });
}
