import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/newsletter — Save newsletter subscriber
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // Upsert — if already subscribed, update name + mark active
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {
        name: name || undefined,
        isActive: true,
        subscribedAt: new Date(),
      },
      create: {
        email,
        name: name || null,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    console.error('[Newsletter] Error:', err);
    return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 500 });
  }
}
