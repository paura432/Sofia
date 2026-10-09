import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PhotoArchive } from "@/components/photo-archive";
import { Reveal } from "@/components/motion/reveal";
import { PHOTO_ARCHIVE_COUNT } from "@/content/photo-archive-data";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as Locale;
  const t = await getTranslations({ locale: lang, namespace: "Metadata" });
  return pageMetadata({
    locale: lang,
    pathname: "/work/photography/archive",
    title: t("pages.photoArchive.title"),
    description: t("pages.photoArchive.description"),
    ogAlt: t("ogAlt"),
  });
}

export default async function PhotographyArchivePage() {
  const t = await getTranslations("Work");
  return (
    <main id="main">
      <section className="page-hero section section-first">
        <Reveal className="container page-hero-inner">
          <p className="eyebrow">{t("photographyEyebrow")}</p>
          <h1 className="display-page">{t("archiveTitle")}</h1>
          <p>{t("seriesCount", { count: PHOTO_ARCHIVE_COUNT })}</p>
          <Link className="work-back-link" href={{ pathname: "/work", hash: "photography" }}>← {t("backToPhotography")}</Link>
        </Reveal>
      </section>
      <PhotoArchive
        closeLabel={t("archiveClose")}
        groups={[
          { id: "musica", title: t("archiveMusicaFull") },
          { id: "retrato", title: t("archiveRetratoFull") },
          { id: "estudio", title: t("archiveEstudioFull") },
          { id: "calle", title: t("archiveCalleFull") },
        ]}
        nextLabel={t("archiveNext")}
        prevLabel={t("archivePrev")}
        title={t("archiveTitle")}
        totalLabel={t("archiveTotal")}
      />
    </main>
  );
}
