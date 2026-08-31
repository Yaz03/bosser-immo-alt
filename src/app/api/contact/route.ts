import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/contact — Save contact/consultation form submission
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, subject, propertyId, formType, heardAbout } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: {
        name,
        email: email || null,
        phone: phone || null,
        message: message || '',
        inquiryType: subject || null,
        source: formType || 'contact_page',
        heardAbout: heardAbout || null,
        status: 'NEW',
      },
    });

    return NextResponse.json({ success: true, message: 'Your inquiry has been received. We will be in touch shortly.' });
  } catch (err) {
    console.error('[Contact] Error:', err);
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 });
  }
}
