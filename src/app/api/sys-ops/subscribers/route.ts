import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/sys-ops/subscribers — List newsletter subscribers
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '50');

  const [subscribers, total] = await Promise.all([
    prisma.newsletterSubscriber.findMany({
      where: { isActive: true },
      orderBy: { subscribedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),
  ]);

  return NextResponse.json({ subscribers, total });
}
