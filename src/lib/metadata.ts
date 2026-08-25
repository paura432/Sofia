import type { Metadata } from "next";

import { siteConfig } from "@/content/profile";

const title = "Sofía Chernikova — Periodista y Comunicadora Audiovisual";
const description =
  "Portfolio editorial de Sofía Chernikova, periodista y comunicadora audiovisual en Madrid.";

export const baseMetadata: Metadata = {
  metadataBase: new URL("https://sofia-chernikova.vercel.app"),
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
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
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
