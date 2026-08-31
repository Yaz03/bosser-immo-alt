import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/testimonials — Public endpoint
export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(testimonials);
}
