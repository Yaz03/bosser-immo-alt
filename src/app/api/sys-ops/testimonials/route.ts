import { NextRequest, NextResponse } from 'next/server';
import { auth, canEdit } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Role } from '@prisma/client';

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const role = (session.user as { role: Role }).role;
  if (!canEdit(role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const count = await prisma.testimonial.count();
  const t = await prisma.testimonial.create({
    data: {
      quoteEn: body.quoteEn,
      quoteDe: body.quoteDe || null,
      author: body.author,
      location: body.location,
      image: body.image || null,
      order: body.order ?? count,
      isActive: body.isActive ?? true,
    },
  });
  return NextResponse.json(t, { status: 201 });
}
