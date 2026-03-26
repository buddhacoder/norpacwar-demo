import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const authCookie = req.cookies.get('norpacwar_auth');
  const hasAccessQuery = url.searchParams.get('access') === 'pixar';
  
  const isProtectedPath = !url.pathname.startsWith('/under-construction') && !url.pathname.startsWith('/studio');

  // Block unauthorized visitors dynamically
  if (isProtectedPath && !hasAccessQuery && (!authCookie || authCookie.value !== 'true')) {
    url.pathname = '/under-construction';
    return NextResponse.rewrite(url);
  }

  // Normal internationalized routing
  const res = intlMiddleware(req);

  // Set the secret lifetime cookie if they used the custom bypass URL
  if (hasAccessQuery) {
    res.cookies.set('norpacwar_auth', 'true', { path: '/', maxAge: 60 * 60 * 24 * 365, secure: process.env.NODE_ENV === 'production' });
  }

  return res;
}

export const config = {
  // Match internationalized pathnames, and completely skip studio/api/static
  matcher: ['/', '/(ru|en)/:path*', '/((?!api|_next|_vercel|studio|images|audio|models|.*\\..*).*)']
};
