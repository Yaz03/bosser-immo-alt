import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { uploadToFilesystem } from '@/lib/upload';

// Valid upload folders — each maps to public/uploads/{folder}/
const VALID_FOLDERS = [
  'properties',    // Property gallery images
  'articles',      // Knowledge hub hero images
  'testimonials',  // Testimonial background images
  'references',    // Past transaction images
  'team',          // Team member portraits
  'documents',     // PDFs (brochures, EPCs)
  'floorplans',    // Floor plan images
  'general',       // Misc
];

// POST /api/sys-ops/upload
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file') as File;
  const folder = (formData.get('folder') as string) || 'general';

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!VALID_FOLDERS.includes(folder)) {
    return NextResponse.json(
      { error: `Invalid folder. Allowed: ${VALID_FOLDERS.join(', ')}` },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const result = await uploadToFilesystem(buffer, file.name, file.type, folder);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// DELETE /api/sys-ops/upload - Remove a file
export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: 'No URL provided' }, { status: 400 });

  // Security: Only allow deleting files within /uploads/
  if (!url.startsWith('/uploads/')) {
    return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
  }

  const { deleteFromFilesystem } = await import('@/lib/upload');
  await deleteFromFilesystem(url);

  return NextResponse.json({ success: true });
}
