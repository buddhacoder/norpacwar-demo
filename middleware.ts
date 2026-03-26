import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // 1. Allow the site owner to set the secret unlock cookie
  if (url.searchParams.get('access') === 'pixar') {
    const res = NextResponse.redirect(new URL('/', req.url));
    res.cookies.set('norpacwar_auth', 'true', { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  // 2. Protect the front-end masterpiece. Ignore /studio and /under-construction
  const isProtectedPath = !url.pathname.startsWith('/under-construction') && !url.pathname.startsWith('/studio');
  
  if (isProtectedPath) {
    const authCookie = req.cookies.get('norpacwar_auth');
    if (!authCookie || authCookie.value !== 'true') {
      // If the colleague deletes /studio from the URL, rewrite to the sterile wall
      url.pathname = '/under-construction';
      return NextResponse.rewrite(url);
    }
  }

  // 3. Normal internationalized routing for authenticated users
  return intlMiddleware(req);
}

export const config = {
  // Match internationalized pathnames, and completely skip studio/api/static
  matcher: ['/', '/(ru|en)/:path*', '/((?!api|_next|_vercel|studio|images|audio|models|.*\\..*).*)']
};
