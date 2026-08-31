import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { canEdit } from '@/lib/auth';
import type { Role } from '@prisma/client';

// PUT /api/sys-ops/properties/[id]/amenities — Replace all amenities
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userRole = (session.user as { role: Role }).role;
  if (!canEdit(userRole)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { amenities } = await req.json() as { amenities: string[] };

  await prisma.propertyAmenity.deleteMany({ where: { propertyId: params.id } });

  if (amenities && amenities.length > 0) {
    await prisma.propertyAmenity.createMany({
      data: amenities.map((name) => ({ propertyId: params.id, name })),
    });
  }

  return NextResponse.json({ success: true });
}
