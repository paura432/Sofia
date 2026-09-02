import type { MetadataRoute } from "next";

import { pendingVerification } from "@/content/pending-verification";
import { getPublishedProjects } from "@/content/projects";
import { locales, type PublicAppPathname } from "@/i18n/routing";
import { localizedUrl, projectUrl } from "@/lib/metadata";

const routes: PublicAppPathname[] = [
  "/",
  "/work",
  "/about",
  "/experience",
  "/contact",
];

function languageMap(make: (locale: (typeof locales)[number]) => string) {
  return {
    es: make("es"),
    en: make("en"),
    ru: make("ru"),
  };
}

// ponytail: build-time guard so the internal audit registry stays wired in
if (pendingVerification.length < 1) {
  throw new Error("Pending verification registry must not be empty.");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routeEntries = routes.flatMap((route) =>
    locales.map((locale) => ({
      url: localizedUrl(route, locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.7,
      alternates: {
        languages: languageMap((item) => localizedUrl(route, item)),
      },
    })),
  );

  const projectEntries = getPublishedProjects().flatMap((project) =>
    locales.map((locale) => ({
      url: projectUrl(project.slug, locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: languageMap((item) => projectUrl(project.slug, item)),
      },
    })),
  );

  return [...routeEntries, ...projectEntries];
}
