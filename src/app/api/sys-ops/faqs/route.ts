import { NextRequest, NextResponse } from 'next/server';
import { auth, canEdit } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Role } from '@prisma/client';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const faqs = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(faqs);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const role = (session.user as { role: Role }).role;
  if (!canEdit(role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const count = await prisma.fAQ.count();
  const faq = await prisma.fAQ.create({
    data: {
      questionEn: body.questionEn,
      answerEn: body.answerEn,
      questionDe: body.questionDe || null,
      answerDe: body.answerDe || null,
      category: body.category || null,
      isActive: body.isActive ?? true,
      order: body.order ?? count,
    },
  });
  return NextResponse.json(faq, { status: 201 });
}
