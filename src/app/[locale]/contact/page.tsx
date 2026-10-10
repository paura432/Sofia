import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ContactBlock } from "@/components/contact-block";
import { Reveal } from "@/components/motion/reveal";
import { Prose } from "@/components/prose";
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
  const t = await getTranslations("Contact");
  const opportunities = t("opportunities");

  return (
    <main id="main" className="contact-page">
      <ContactBlock page />
      {opportunities ? (
        <section className="section prose-section" aria-labelledby="contact-opportunities">
          <Reveal className="container editorial-grid">
            <p className="eyebrow" id="contact-opportunities">
              {t("opportunitiesEyebrow")}
            </p>
            <Prose paragraphs={[opportunities]} />
          </Reveal>
        </section>
      ) : null}
    </main>
  );
}
