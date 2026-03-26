import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Use a completely un-cacheable dynamic API route to grant access
  const url = new URL('/en/units', request.url);
  const response = NextResponse.redirect(url);
  
  // Hard-inject the secret lifetime auth cookie
  response.cookies.set('norpacwar_auth', 'true', { 
    path: '/', 
    maxAge: 31536000 // 1 year
  });
  
  return response;
}
