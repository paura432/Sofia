import type { MetadataRoute } from "next";

import { pendingVerification } from "@/content/pending-verification";
import { getPublishedProjects } from "@/content/projects";
import type { Locale, PublicAppPathname } from "@/i18n/routing";
import { localizedUrl, projectUrl } from "@/lib/metadata";

const routes: PublicAppPathname[] = [
  "/",
  "/work",
  "/about",
  "/experience",
  "/contact",
];
const locales: Locale[] = ["es", "en"];

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
        languages: {
          es: localizedUrl(route, "es"),
          en: localizedUrl(route, "en"),
        },
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
        languages: {
          es: projectUrl(project.slug, "es"),
          en: projectUrl(project.slug, "en"),
        },
      },
    })),
  );

  return [...routeEntries, ...projectEntries];
}
