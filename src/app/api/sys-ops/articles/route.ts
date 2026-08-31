import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeAuditLog } from '@/lib/audit';
import { canEdit } from '@/lib/auth';
import type { Role } from '@prisma/client';

// GET /api/sys-ops/articles
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const status = searchParams.get('status');
  const category = searchParams.get('category');

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (category) where.category = category;

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.article.count({ where }),
  ]);

  return NextResponse.json({ articles, total });
}

// POST /api/sys-ops/articles
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userRole = (session.user as { role: Role }).role;
  if (!canEdit(userRole)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();

  // Only one article can be featured at a time
  if (body.featured) {
    await prisma.article.updateMany({ where: { featured: true }, data: { featured: false } });
  }

  const slug = body.slug || body.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const article = await prisma.article.create({
    data: {
      slug,
      category: body.category,
      date: body.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase(),
      heroImage: body.heroImage || null,
      featured: body.featured || false,
      status: body.status || 'DRAFT',
      titleEn: body.titleEn,
      titleDe: body.titleDe || null,
      descEn: body.descEn || body.excerptEn || '',
      descDe: body.descDe || body.excerptDe || null,
      contentEn: body.contentEn || body.bodyEn || '',
      contentDe: body.contentDe || body.bodyDe || null,
      metaTitleEn: body.metaTitleEn || null,
      metaDescEn: body.metaDescEn || null,
    },
  });

  await writeAuditLog({
    userId: session.user!.id as string,
    userEmail: session.user!.email!,
    action: 'CREATE',
    entityType: 'Article',
    entityId: article.id,
    detail: `Created article: ${article.titleEn}`,
  });

  return NextResponse.json(article, { status: 201 });
}
