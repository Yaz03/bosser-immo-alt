import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/faqs — Public endpoint
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || '';

  const faqs = await prisma.fAQ.findMany({
    where: {
      isActive: true,
      ...(category ? { category } : {}),
    },
    orderBy: { order: 'asc' },
  });

  return NextResponse.json(faqs);
}
