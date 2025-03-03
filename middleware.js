// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Only run middleware for /admin routes
  if (pathname.startsWith("/admin")) {
    const authCookie = req.cookies.get("auth");
    if (!authCookie) {
      // If not authenticated, redirect to the login page
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// This config tells Next.js to run this middleware for any route starting with /admin
export const config = {
  matcher: ["/admin/:path*"],
};
