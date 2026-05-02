import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/', '/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api') || pathname.startsWith('/_next')) return NextResponse.next();

  // App currently uses client-session; keep middleware lightweight.
  // Protected pages are enforced client-side after hydration.
  if (!PUBLIC_PATHS.includes(pathname) && pathname !== '/dashboard' && pathname !== '/explore' && pathname !== '/needs/new' && pathname !== '/offers/new') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|favicon.ico).*)'],
};
