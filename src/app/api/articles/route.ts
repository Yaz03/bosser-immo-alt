import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/articles — Public endpoint
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || '';
  const featured = searchParams.get('featured') === 'true';
  const limit = parseInt(searchParams.get('limit') || '20');
  const page = parseInt(searchParams.get('page') || '1');

  const where: Record<string, unknown> = { status: 'PUBLISHED' };
  if (category && category !== 'All' && category !== 'Alle') {
    where.category = category;
  }
  if (featured) where.featured = true;

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.article.count({ where }),
  ]);

  return NextResponse.json({ articles, total });
}
