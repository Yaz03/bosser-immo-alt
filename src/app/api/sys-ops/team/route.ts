import { NextRequest, NextResponse } from 'next/server';
import { auth, canEdit } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Role } from '@prisma/client';

export async function GET(_req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const members = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(members);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const role = (session.user as { role: Role }).role;
  if (!canEdit(role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const count = await prisma.teamMember.count();
  const member = await prisma.teamMember.create({
    data: {
      name: body.name,
      titleEn: body.titleEn,
      titleDe: body.titleDe || null,
      quoteEn: body.quoteEn || null,
      quoteDe: body.quoteDe || null,
      image: body.image || null,
      order: body.order ?? count,
      isActive: body.isActive ?? true,
    },
  });
  return NextResponse.json(member, { status: 201 });
}
