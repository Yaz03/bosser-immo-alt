import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeAuditLog } from '@/lib/audit';
import { canEdit, canDelete } from '@/lib/auth';
import type { Role } from '@prisma/client';

// GET /api/sys-ops/settings?page=home
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');

  const settings = await prisma.siteSetting.findMany({
    where: page ? { page } : undefined,
    orderBy: [{ page: 'asc' }, { keyName: 'asc' }],
  });

  return NextResponse.json(settings);
}

// PUT /api/sys-ops/settings - Upsert a setting
export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userRole = (session.user as { role: Role }).role;
  if (!canEdit(userRole)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { page, keyName, valueEn, valueDe } = body;

  const setting = await prisma.siteSetting.upsert({
    where: { page_keyName: { page, keyName } },
    update: { valueEn, valueDe },
    create: { page, keyName, valueEn, valueDe },
  });

  await writeAuditLog({
    userId: session.user!.id as string,
    userEmail: session.user!.email!,
    action: 'UPDATE',
    entityType: 'SiteSetting',
    detail: `Updated setting: ${page}.${keyName}`,
  });

  return NextResponse.json(setting);
}
