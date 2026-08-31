import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// On VPS: uploads are stored in public/uploads/{folder}/
// These are served statically by Next.js at /uploads/{folder}/{filename}

const UPLOAD_BASE = path.join(process.cwd(), 'public', 'uploads');

// Ensure base upload directory exists on startup
if (!fs.existsSync(UPLOAD_BASE)) {
  fs.mkdirSync(UPLOAD_BASE, { recursive: true });
}

export interface UploadResult {
  url: string;       // Public URL e.g. /uploads/properties/abc123.jpg
  filename: string;  // e.g. abc123.jpg
  path: string;      // Absolute server path
}

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'application/pdf': '.pdf',
};

const MAX_SIZE = 20 * 1024 * 1024; // 20MB

export async function uploadToFilesystem(
  fileBuffer: Buffer,
  originalName: string,
  mimeType: string,
  folder: string = 'general'
): Promise<UploadResult> {
  // Validate mime type
  const ext = ALLOWED_TYPES[mimeType];
  if (!ext) {
    throw new Error(`Unsupported file type: ${mimeType}`);
  }

  // Validate size
  if (fileBuffer.length > MAX_SIZE) {
    throw new Error(`File too large. Maximum size is 20MB.`);
  }

  // Create folder if it doesn't exist
  const folderPath = path.join(UPLOAD_BASE, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Generate unique filename preserving extension
  const filename = `${uuidv4()}${ext}`;
  const filePath = path.join(folderPath, filename);

  // Write file to disk
  fs.writeFileSync(filePath, fileBuffer);

  // Return public URL (relative, served by Next.js static file serving)
  const publicUrl = `/uploads/${folder}/${filename}`;

  return {
    url: publicUrl,
    filename,
    path: filePath,
  };
}

export async function deleteFromFilesystem(publicUrl: string): Promise<void> {
  // Convert /uploads/folder/file.jpg to absolute path
  const relativePath = publicUrl.replace(/^\//, '');
  const absPath = path.join(process.cwd(), 'public', relativePath);

  if (fs.existsSync(absPath)) {
    fs.unlinkSync(absPath);
  }
}

export function getUploadFolders(): string[] {
  if (!fs.existsSync(UPLOAD_BASE)) return [];
  return fs.readdirSync(UPLOAD_BASE).filter((f) =>
    fs.statSync(path.join(UPLOAD_BASE, f)).isDirectory()
  );
}

export interface UploadedFile {
  filename: string;
  url: string;
  size: number;
  folder: string;
}

export function listUploads(folder: string): UploadedFile[] {
  const folderPath = path.join(UPLOAD_BASE, folder);
  if (!fs.existsSync(folderPath)) return [];

  return fs.readdirSync(folderPath).map((filename) => {
    const filePath = path.join(folderPath, filename);
    const stats = fs.statSync(filePath);
    return {
      filename,
      url: `/uploads/${folder}/${filename}`,
      size: stats.size,
      folder,
    };
  });
}
