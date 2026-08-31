import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/sys-ops/contacts — List all contact submissions
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '30');

  const where = status ? { status } : {};

  const [submissions, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.contactSubmission.count({ where }),
  ]);

  return NextResponse.json({ submissions, total });
}

// PATCH /api/sys-ops/contacts — Update submission status
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, status } = await req.json();
  if (!id || !status) return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });

  const updated = await prisma.contactSubmission.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(updated);
}
