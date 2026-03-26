import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const authCookie = req.cookies.get('norpacwar_auth');
  
  const isProtectedPath = !url.pathname.startsWith('/under-construction') && !url.pathname.startsWith('/studio') && !url.pathname.startsWith('/api/unlock');

  // Block unauthorized visitors dynamically
  if (isProtectedPath && (!authCookie || authCookie.value !== 'true')) {
    url.pathname = '/under-construction';
    return NextResponse.rewrite(url);
  }

  // Normal internationalized routing
  return intlMiddleware(req);
}

export const config = {
  // Match internationalized pathnames, and completely skip studio/api/static
  matcher: ['/', '/(ru|en)/:path*', '/((?!api|_next|_vercel|studio|images|audio|models|.*\\..*).*)']
};
