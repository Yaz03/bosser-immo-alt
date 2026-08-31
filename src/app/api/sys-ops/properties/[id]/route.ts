import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeAuditLog } from '@/lib/audit';
import { canEdit, canDelete } from '@/lib/auth';
import type { Role } from '@prisma/client';

// GET /api/sys-ops/properties/[id]
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      images: { orderBy: { order: 'asc' } },
      amenities: true,
      floorPlans: { orderBy: { order: 'asc' } },
      documents: true,
      schools: true,
      transport: true,
    },
  });

  if (!property) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(property);
}

// PUT /api/sys-ops/properties/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userRole = (session.user as { role: Role }).role;
  if (!canEdit(userRole)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();

  const property = await prisma.property.update({
    where: { id: params.id },
    data: {
      type: body.type,
      priceDisplay: body.priceDisplay,
      priceValue: body.priceValue,
      location: body.location,
      specs: body.specs,
      beds: body.beds,
      baths: body.baths,
      areaSqm: body.areaSqm,
      status: body.status,
      featured: body.featured,
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
    action: 'UPDATE',
    entityType: 'Property',
    entityId: property.id,
    detail: `Updated property: ${property.type} in ${property.location}`,
  });

  return NextResponse.json(property);
}

// DELETE /api/sys-ops/properties/[id]
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userRole = (session.user as { role: Role }).role;
  if (!canDelete(userRole)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const property = await prisma.property.delete({ where: { id: params.id } });

  await writeAuditLog({
    userId: session.user!.id as string,
    userEmail: session.user!.email!,
    action: 'DELETE',
    entityType: 'Property',
    entityId: params.id,
    detail: `Deleted property: ${property.type} in ${property.location}`,
  });

  return NextResponse.json({ success: true });
}
