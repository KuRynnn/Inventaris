import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  console.log('Middleware: Path:', path);

  // Allow access to the auth page and API routes without a token
  if (path === '/auth' || path.startsWith('/api')) {
    return NextResponse.next();
  }

  // For all other routes, we'll let the client-side handle the authentication
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};