import type { Metadata } from "next";

import { siteConfig } from "@/content/profile";
import type { AppPathname, Locale } from "@/i18n/routing";

export const SITE_URL = "https://sofiachernikova.vercel.app";
export const IS_PUBLIC = false;

export const localizedPathnames: Record<AppPathname, Record<Locale, string>> = {
  "/": {
    es: "/",
    en: "/en",
  },
  "/work": {
    es: "/trabajo",
    en: "/en/work",
  },
  "/about": {
    es: "/sobre-mi",
    en: "/en/about",
  },
  "/experience": {
    es: "/experiencia",
    en: "/en/experience",
  },
  "/contact": {
    es: "/contacto",
    en: "/en/contact",
  },
};

const ogLocales: Record<Locale, string> = {
  es: "es_ES",
  en: "en_GB",
};

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function localizedPath(pathname: AppPathname, locale: Locale) {
  return localizedPathnames[pathname][locale];
}

export function localizedUrl(pathname: AppPathname, locale: Locale) {
  return absoluteUrl(localizedPath(pathname, locale));
}

export function alternatesFor(pathname: AppPathname) {
  return {
    canonical: localizedPath(pathname, "es"),
    languages: {
      es: localizedUrl(pathname, "es"),
      en: localizedUrl(pathname, "en"),
      "x-default": localizedUrl(pathname, "es"),
    },
  };
}

export function pageMetadata({
  locale,
  pathname,
  title,
  description,
  ogAlt,
}: {
  locale: Locale;
  pathname: AppPathname;
  title: string;
  description: string;
  ogAlt: string;
}): Metadata {
  const pageUrl = localizedPath(pathname, locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s — Sofía Chernikova",
    },
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: pageUrl,
      languages: alternatesFor(pathname).languages,
    },
    robots: {
      index: IS_PUBLIC,
      follow: IS_PUBLIC,
      googleBot: {
        index: IS_PUBLIC,
        follow: IS_PUBLIC,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      url: pageUrl,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: `${localizedPath("/", locale) === "/" ? "" : "/en"}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${localizedPath("/", locale) === "/" ? "" : "/en"}/opengraph-image`],
    },
  };
}

export function personJsonLd({
  locale,
  jobTitle,
}: {
  locale: Locale;
  jobTitle: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle,
    url: localizedUrl("/", locale),
    sameAs: [siteConfig.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madrid",
      addressCountry: "ES",
    },
  };
}
