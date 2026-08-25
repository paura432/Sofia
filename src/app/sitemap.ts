import type { MetadataRoute } from "next";

import type { AppPathname, Locale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/metadata";

const routes: AppPathname[] = ["/", "/work", "/about", "/experience", "/contact"];
const locales: Locale[] = ["es", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: localizedUrl(route, locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.7,
      alternates: {
        languages: {
          es: localizedUrl(route, "es"),
          en: localizedUrl(route, "en"),
        },
      },
    })),
  );
}
