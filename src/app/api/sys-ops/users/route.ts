import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeAuditLog } from '@/lib/audit';
import { canEdit, canDelete, canManageUsers, isSuperAdmin } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import type { Role } from '@prisma/client';

// GET /api/sys-ops/users
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userRole = (session.user as { role: Role }).role;
  if (!canManageUsers(userRole)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      lastLoginAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json(users);
}

// POST /api/sys-ops/users - Create a new admin user
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const actorRole = (session.user as { role: Role }).role;
  if (!canManageUsers(actorRole)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { name, email, password, role } = body;

  // Role creation restrictions
  // Super Admin can create any role; Admin can only create EDITOR or VIEWER
  const allowedRolesForAdmin: Role[] = ['EDITOR', 'VIEWER'];
  if (actorRole === 'ADMIN' && !allowedRolesForAdmin.includes(role as Role)) {
    return NextResponse.json({ error: 'Admins can only create Editors or Viewers' }, { status: 403 });
  }

  // Only Super Admin can create Super Admins
  if (role === 'SUPER_ADMIN' && !isSuperAdmin(actorRole)) {
    return NextResponse.json({ error: 'Only Super Admin can create Super Admin accounts' }, { status: 403 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: 'Email already in use' }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
    select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
  });

  await writeAuditLog({
    userId: session.user!.id as string,
    userEmail: session.user!.email!,
    action: 'CREATE',
    entityType: 'User',
    entityId: user.id,
    detail: `Created user: ${user.email} with role ${user.role}`,
  });

  return NextResponse.json(user, { status: 201 });
}
