import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const legacyRedirects = new Map([
  ["/work", "/trabajo"],
  ["/about", "/sobre-mi"],
  ["/experience", "/experiencia"],
  ["/contact", "/contacto"],
]);

export default function proxy(request: NextRequest) {
  const isDevMediaPath = [
    "/dev/media",
    "/es/dev/media",
    "/en/dev/media",
    "/ru/dev/media",
  ].includes(request.nextUrl.pathname);

  if (isDevMediaPath && process.env.NODE_ENV !== "development") {
    return new NextResponse(null, { status: 404 });
  }

  const devMediaLocale = request.nextUrl.pathname.match(
    /^\/(es|en|ru)\/dev\/media$/,
  )?.[1];

  if (devMediaLocale && process.env.NODE_ENV === "development") {
    const url = request.nextUrl.clone();
    url.pathname = `/${devMediaLocale}/dev/media`;
    return NextResponse.rewrite(url);
  }

  if (request.nextUrl.pathname === "/dev/media") {
    const url = request.nextUrl.clone();
    const requestedLocale = request.nextUrl.searchParams.get("locale");
    const locale = ["es", "en", "ru"].includes(requestedLocale ?? "")
      ? requestedLocale
      : "en";
    url.pathname = `/${locale}/dev/media`;
    url.searchParams.delete("locale");
    return NextResponse.rewrite(url);
  }

  const redirectTarget = legacyRedirects.get(request.nextUrl.pathname);

  if (redirectTarget) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTarget;
    return NextResponse.redirect(url, 308);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
