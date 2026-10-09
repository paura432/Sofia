import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PhotoArchive } from "@/components/photo-archive";
import { Reveal } from "@/components/motion/reveal";
import {
  PHOTO_ARCHIVE_COUNT,
  archiveGroupProject,
  archivePhotoCopyKey,
  photoArchiveGroups,
} from "@/content/photo-archive-data";
import type { MediaCopy } from "@/content/projects";
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

/** ALT de cada foto del archivo, tomado del texto de su serie. */
function archiveAlts(projects: Awaited<ReturnType<typeof getTranslations<"Projects">>>) {
  const alts: Record<string, string> = {};
  for (const [group, slug] of Object.entries(archiveGroupProject)) {
    const media = projects.raw(`items.${slug}.media`) as Record<string, MediaCopy>;
    for (const photo of photoArchiveGroups[group as keyof typeof photoArchiveGroups]) {
      const alt = media[archivePhotoCopyKey(slug, photo)]?.alt;
      if (alt) alts[photo.id] = alt;
    }
  }
  return alts;
}

export default async function PhotographyArchivePage() {
  const [t, projects] = await Promise.all([
    getTranslations("Work"),
    getTranslations("Projects"),
  ]);
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
        alts={archiveAlts(projects)}
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
