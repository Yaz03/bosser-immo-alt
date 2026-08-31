import { NextRequest, NextResponse } from 'next/server';
import { auth, canEdit } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeAuditLog } from '@/lib/audit';
import type { Role } from '@prisma/client';

// GET /api/sys-ops/articles/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const article = await prisma.article.findUnique({ where: { id: params.id } });
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(article);
}

// PUT /api/sys-ops/articles/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const role = (session.user as { role: Role }).role;
  if (!canEdit(role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();

  // Only one featured article at a time
  if (body.featured) {
    await prisma.article.updateMany({
      where: { featured: true, id: { not: params.id } },
      data: { featured: false },
    });
  }

  const article = await prisma.article.update({
    where: { id: params.id },
    data: {
      slug: body.slug,
      category: body.category,
      date: body.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase(),
      heroImage: body.heroImage || null,
      featured: body.featured || false,
      status: body.status || 'DRAFT',
      titleEn: body.titleEn,
      titleDe: body.titleDe || null,
      descEn: body.excerptEn || body.descEn || '',
      descDe: body.excerptDe || body.descDe || null,
      contentEn: body.bodyEn || body.contentEn || '',
      contentDe: body.bodyDe || body.contentDe || null,
      metaTitleEn: body.metaTitleEn || null,
      metaDescEn: body.metaDescEn || null,
    },
  });

  await writeAuditLog({
    userId: session.user!.id as string,
    userEmail: session.user!.email!,
    action: 'UPDATE',
    entityType: 'Article',
    entityId: article.id,
    detail: `Updated article: ${article.titleEn}`,
  });

  return NextResponse.json(article);
}

// DELETE /api/sys-ops/articles/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const role = (session.user as { role: Role }).role;
  if (!canEdit(role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const article = await prisma.article.findUnique({ where: { id: params.id } });
  await prisma.article.delete({ where: { id: params.id } });

  await writeAuditLog({
    userId: session.user!.id as string,
    userEmail: session.user!.email!,
    action: 'DELETE',
    entityType: 'Article',
    entityId: params.id,
    detail: `Deleted article: ${article?.titleEn}`,
  });

  return NextResponse.json({ success: true });
}
