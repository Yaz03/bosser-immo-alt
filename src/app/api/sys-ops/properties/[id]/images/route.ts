import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { canEdit } from '@/lib/auth';
import type { Role } from '@prisma/client';

// PUT /api/sys-ops/properties/[id]/images — Replace all images
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userRole = (session.user as { role: Role }).role;
  if (!canEdit(userRole)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { images } = await req.json() as { images: string[] };

  // Delete existing, re-insert in order
  await prisma.propertyImage.deleteMany({ where: { propertyId: params.id } });

  if (images && images.length > 0) {
    await prisma.propertyImage.createMany({
      data: images.map((url, order) => ({ propertyId: params.id, url, order })),
    });
  }

  return NextResponse.json({ success: true });
}
