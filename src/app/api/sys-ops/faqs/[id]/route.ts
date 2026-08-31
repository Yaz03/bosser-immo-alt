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
  const faq = await prisma.fAQ.update({
    where: { id: params.id },
    data: {
      questionEn: body.questionEn,
      answerEn: body.answerEn,
      questionDe: body.questionDe || null,
      answerDe: body.answerDe || null,
      category: body.category || null,
      isActive: body.isActive ?? true,
      order: body.order,
    },
  });
  return NextResponse.json(faq);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const role = (session.user as { role: Role }).role;
  if (!canEdit(role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  await prisma.fAQ.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
