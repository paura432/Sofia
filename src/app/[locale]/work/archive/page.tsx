import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PhotoArchive } from "@/components/photo-archive";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return pageMetadata({
    locale,
    pathname: "/work",
    title: t("pages.work.title"),
    description: t("pages.work.description"),
    ogAlt: t("ogAlt"),
  });
}

export default async function ArchivePage() {
  const t = await getTranslations("Work");

  return (
    <main id="main">
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
