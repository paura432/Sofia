import type { Metadata } from "next";

import { siteConfig, structuredRole } from "@/content/profile";

const title = "Sofía Chernikova — Periodista y Comunicadora Audiovisual";
const description =
  "Portfolio editorial de Sofía Chernikova, periodista y comunicadora audiovisual en Madrid.";

export const SITE_URL = "https://sofiachernikova.vercel.app";
export const IS_PUBLIC = false;

export const baseMetadata: Metadata = {
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
    canonical: "/",
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
    locale: "es_ES",
    url: "/",
    siteName: siteConfig.name,
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

export function pageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${pageTitle} — Sofía Chernikova`,
      description: pageDescription,
      url: path,
    },
    twitter: {
      title: `${pageTitle} — Sofía Chernikova`,
      description: pageDescription,
    },
  };
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: structuredRole,
  url: SITE_URL,
  sameAs: [siteConfig.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Madrid",
    addressCountry: "ES",
  },
};
