import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Newsreader } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { MotionProvider } from "@/components/motion/motion-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import { serializeJsonLd } from "@/lib/json-ld";
import { pageMetadata, personJsonLd } from "@/lib/metadata";

import "../globals.css";
import "../../styles/media.css";
import "../../styles/motion.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz"],
});

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "es";
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return pageMetadata({
    locale,
    pathname: "/",
    title: t("siteTitle"),
    description: t("siteDescription"),
    ogAlt: t("ogAlt"),
  });
}

export const viewport: Viewport = {
  themeColor: "#f6f1e8",
  colorScheme: "light",
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const [messages, metadata] = await Promise.all([
    getMessages(),
    getTranslations({ locale, namespace: "Metadata" }),
  ]);

  return (
    <html
      lang={locale}
      className={`${sans.variable} ${serif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
          </MotionProvider>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(
              personJsonLd({
                locale,
                jobTitle: metadata("personRole"),
              }),
            ),
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
