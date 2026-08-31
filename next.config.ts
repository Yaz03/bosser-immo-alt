import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Next.js Image component to optimize images from:
  // 1. Local uploads (served from public/uploads/)
  // 2. The site's own domain (for VPS)
  images: {
    remotePatterns: [
      {
        // For VPS: your own domain's uploaded images
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '') || 'localhost',
        pathname: '/uploads/**',
      },
    ],
    // Allow local static images from public/ without domain restriction
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // Ensure output is a standard Node.js server (not standalone) for VPS with pm2
  // Change to 'standalone' if deploying with Docker
  // output: 'standalone',

  // Increase body size limit for file uploads (default 1mb)
  experimental: {
    serverActions: {
      bodySizeLimit: '21mb',
    },
  },
};

export default nextConfig;
