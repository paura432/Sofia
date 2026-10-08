import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

// Las antiguas páginas por disciplina viven ahora como secciones de Trabajo.
const legacyRedirects = new Map([
  ["/work", "/trabajo"],
  ["/about", "/sobre-mi"],
  ["/experience", "/experiencia"],
  ["/contact", "/contacto"],
  ["/trabajo/reportajes", "/trabajo#reporting"],
  ["/trabajo/audiovisual", "/trabajo#audiovisual"],
  ["/trabajo/fotografia", "/trabajo#photography"],
  ["/es/trabajo/reportajes", "/trabajo#reporting"],
  ["/es/trabajo/audiovisual", "/trabajo#audiovisual"],
  ["/es/trabajo/fotografia", "/trabajo#photography"],
  ["/en/work/reporting", "/en/work#reporting"],
  ["/en/work/audiovisual", "/en/work#audiovisual"],
  ["/en/work/photography", "/en/work#photography"],
  ["/ru/rabota/reportazhi", "/ru/rabota#reporting"],
  ["/ru/rabota/audiovizualnoe", "/ru/rabota#audiovisual"],
  ["/ru/rabota/fotografiya", "/ru/rabota#photography"],
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
    const [pathname, hash] = redirectTarget.split("#");
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    url.hash = hash ? `#${hash}` : "";
    return NextResponse.redirect(url, 308);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
