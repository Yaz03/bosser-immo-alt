import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/team — Public endpoint
export async function GET() {
  const members = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(members);
}
