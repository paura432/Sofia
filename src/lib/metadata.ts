import type { Metadata } from "next";

import { siteConfig } from "@/content/profile";
import type { Locale, PublicAppPathname } from "@/i18n/routing";

export const SITE_URL = "https://sofiachernikova.vercel.app";
/** Preview: false. Launch: set NEXT_PUBLIC_IS_PUBLIC=true in Vercel. */
export const IS_PUBLIC = process.env.NEXT_PUBLIC_IS_PUBLIC === "true";

export const localizedPathnames: Record<
  PublicAppPathname,
  Record<Locale, string>
> = {
  "/": {
    es: "/",
    en: "/en",
    ru: "/ru",
  },
  "/work": {
    es: "/trabajo",
    en: "/en/work",
    ru: "/ru/rabota",
  },
  "/work/[slug]": {
    es: "/trabajo/[slug]",
    en: "/en/work/[slug]",
    ru: "/ru/rabota/[slug]",
  },
  "/about": {
    es: "/sobre-mi",
    en: "/en/about",
    ru: "/ru/o-sebe",
  },
  "/experience": {
    es: "/experiencia",
    en: "/en/experience",
    ru: "/ru/opyt",
  },
  "/contact": {
    es: "/contacto",
    en: "/en/contact",
    ru: "/ru/kontakty",
  },
};

const ogLocales: Record<Locale, string> = {
  es: "es_ES",
  en: "en_GB",
  ru: "ru_RU",
};

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function localizedPath(pathname: PublicAppPathname, locale: Locale) {
  return localizedPathnames[pathname][locale];
}

export function localizedUrl(pathname: PublicAppPathname, locale: Locale) {
  return absoluteUrl(localizedPath(pathname, locale));
}

export function projectPath(slug: string, locale: Locale) {
  return localizedPathnames["/work/[slug]"][locale].replace("[slug]", slug);
}

export function projectUrl(slug: string, locale: Locale) {
  return absoluteUrl(projectPath(slug, locale));
}

export function projectAlternates(slug: string) {
  return {
    canonical: projectPath(slug, "es"),
    languages: {
      es: projectUrl(slug, "es"),
      en: projectUrl(slug, "en"),
      ru: projectUrl(slug, "ru"),
      "x-default": projectUrl(slug, "es"),
    },
  };
}

export function alternatesFor(pathname: PublicAppPathname) {
  return {
    canonical: localizedPath(pathname, "es"),
    languages: {
      es: localizedUrl(pathname, "es"),
      en: localizedUrl(pathname, "en"),
      ru: localizedUrl(pathname, "ru"),
      "x-default": localizedUrl(pathname, "es"),
    },
  };
}

export function pageMetadata({
  locale,
  pathname,
  canonicalPath,
  alternateLanguages,
  title,
  description,
  ogAlt,
  ogImage,
}: {
  locale: Locale;
  pathname: PublicAppPathname;
  canonicalPath?: string;
  alternateLanguages?: Record<string, string>;
  title: string;
  description: string;
  ogAlt: string;
  ogImage?: string;
}): Metadata {
  const pageUrl = canonicalPath ?? localizedPath(pathname, locale);
  const og =
    ogImage ??
    `${locale === "es" ? "" : `/${locale}`}/opengraph-image`;

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
      languages: alternateLanguages ?? alternatesFor(pathname).languages,
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
          url: og,
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
      images: [og],
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
