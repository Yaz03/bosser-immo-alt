import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeAuditLog } from '@/lib/audit';
import { canManageUsers, isSuperAdmin } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import type { Role } from '@prisma/client';

// PUT /api/sys-ops/users/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const actorRole = (session.user as { role: Role }).role;
  if (!canManageUsers(actorRole)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const targetUser = await prisma.user.findUnique({ where: { id: params.id } });
  if (!targetUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // Prevent editing Super Admin unless you are Super Admin
  if (targetUser.role === 'SUPER_ADMIN' && !isSuperAdmin(actorRole)) {
    return NextResponse.json({ error: 'Cannot modify Super Admin account' }, { status: 403 });
  }

  // Check if this is the seeded super admin (env email) — cannot be disabled or demoted
  const superAdminEmail = process.env.SUPERADMIN_EMAIL;
  if (targetUser.email === superAdminEmail) {
    return NextResponse.json({ error: 'System Super Admin cannot be modified' }, { status: 403 });
  }

  const updateData: Record<string, unknown> = {
    name: body.name ?? targetUser.name,
    role: body.role ?? targetUser.role,
    isActive: body.isActive ?? targetUser.isActive,
  };

  if (body.password) {
    updateData.password = await bcrypt.hash(body.password, 12);
  }

  const updated = await prisma.user.update({
    where: { id: params.id },
    data: updateData,
    select: { id: true, name: true, email: true, role: true, isActive: true },
  });

  await writeAuditLog({
    userId: session.user!.id as string,
    userEmail: session.user!.email!,
    action: 'UPDATE',
    entityType: 'User',
    entityId: updated.id,
    detail: `Updated user: ${updated.email}`,
  });

  return NextResponse.json(updated);
}

// DELETE /api/sys-ops/users/[id]
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const actorRole = (session.user as { role: Role }).role;
  if (!isSuperAdmin(actorRole)) return NextResponse.json({ error: 'Only Super Admin can delete users' }, { status: 403 });

  const targetUser = await prisma.user.findUnique({ where: { id: params.id } });
  if (!targetUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // Cannot delete the system super admin
  if (targetUser.email === process.env.SUPERADMIN_EMAIL) {
    return NextResponse.json({ error: 'Cannot delete the system Super Admin' }, { status: 403 });
  }

  await prisma.user.delete({ where: { id: params.id } });

  await writeAuditLog({
    userId: session.user!.id as string,
    userEmail: session.user!.email!,
    action: 'DELETE',
    entityType: 'User',
    entityId: params.id,
    detail: `Deleted user: ${targetUser.email}`,
  });

  return NextResponse.json({ success: true });
}
