import { NextRequest, NextResponse } from 'next/server';
import { auth, canEdit } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Role } from '@prisma/client';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const role = (session.user as { role: Role }).role;
  if (!canEdit(role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const member = await prisma.teamMember.update({
    where: { id: params.id },
    data: {
      name: body.name,
      titleEn: body.titleEn,
      titleDe: body.titleDe || null,
      quoteEn: body.quoteEn || null,
      quoteDe: body.quoteDe || null,
      image: body.image || null,
      order: body.order,
      isActive: body.isActive ?? true,
    },
  });
  return NextResponse.json(member);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const role = (session.user as { role: Role }).role;
  if (!canEdit(role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  await prisma.teamMember.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
