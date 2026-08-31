import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Protect all /sys-ops routes except login page
  const isSysOps = pathname.startsWith('/sys-ops');
  const isLoginPage = pathname === '/sys-ops/login';

  if (isSysOps && !isLoginPage) {
    if (!req.auth) {
      const loginUrl = new URL('/sys-ops/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    // User is logged in but account might be inactive (handled at login)
  }

  // If already logged in and visiting login page, redirect to dashboard
  if (isLoginPage && req.auth) {
    return NextResponse.redirect(new URL('/sys-ops', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/sys-ops/:path*'],
};
