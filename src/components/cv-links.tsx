import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/content/profile";

/** Los dos currículums en PDF (castellano e inglés), como lista en línea. */
export async function CvLinks() {
  const t = await getTranslations("Contact");
  const files = [
    { href: siteConfig.cv.es, download: "CV_Sofia_Chernikova_ES.pdf", label: t("cvSpanish") },
    { href: siteConfig.cv.en, download: "CV_Sofia_Chernikova_EN.pdf", label: t("cvEnglish") },
  ];

  return (
    <ul className="inline-list cv-links">
      {files.map((file) => (
        <li key={file.href}>
          <a download={file.download} href={file.href} type="application/pdf">
            {file.label} <span aria-hidden="true">↓</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
