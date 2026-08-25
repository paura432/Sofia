import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ContactBlock } from "@/components/contact-block";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return pageMetadata({
    locale,
    pathname: "/contact",
    title: t("pages.contact.title"),
    description: t("pages.contact.description"),
    ogAlt: t("ogAlt"),
  });
}

export default async function ContactPage() {
  return (
    <main id="main" className="contact-page">
      <ContactBlock page />
    </main>
  );
}
