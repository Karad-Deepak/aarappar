import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import intlConfig from "./next-intl.config";

const intlMiddleware = createIntlMiddleware({
  locales: intlConfig.locales,
  defaultLocale: intlConfig.defaultLocale,
  localePrefix: intlConfig.localePrefix,
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get("auth");
    if (!authCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/login" ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js)$/)
  ) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
