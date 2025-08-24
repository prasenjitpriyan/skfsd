import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getSession } from './lib/auth'; // your custom session/token verifier

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const cookieStore = cookies();
  const session = await getSession(cookieStore);

  // If no session → redirect to login
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Role-based protection
  if (pathname.startsWith('/dashboard/admin')) {
    if (session.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (pathname.startsWith('/dashboard/delivery')) {
    if (session.role !== 'delivery') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (pathname.startsWith('/dashboard/office')) {
    if (session.role !== 'office') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

// ✅ Limit middleware to only dashboard routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
