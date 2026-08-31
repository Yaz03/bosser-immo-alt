import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/articles/[id] — Public endpoint
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const article = await prisma.article.findUnique({
    where: { id: params.id, status: 'PUBLISHED' },
  });

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json(article);
}
