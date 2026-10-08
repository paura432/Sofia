"use client";

import { useParams } from "next/navigation";

import { Link, usePathname } from "@/i18n/navigation";
import type { ProjectSection } from "@/content/projects";

export type WorkRailStory = {
  slug: string;
  section?: ProjectSection;
};

type WorkRailProps = {
  workLabel: string;
  sectionLabels: Record<ProjectSection, string>;
  archiveSectionLabel: string;
  nextLabel: string;
  prevLabel: string;
  stories: WorkRailStory[];
};

/**
 * Barra de contexto para las páginas que cuelgan de Trabajo (detalle y
 * archivo). El índice de Trabajo no la necesita: tiene su propia navegación
 * por secciones.
 */
export function WorkRail({
  workLabel,
  sectionLabels,
  archiveSectionLabel,
  nextLabel,
  prevLabel,
  stories,
}: WorkRailProps) {
  const params = useParams<{ slug?: string }>();
  const pathname = usePathname();
  const slug = typeof params.slug === "string" ? params.slug : undefined;
  const isArchive = pathname === "/work/photography/archive";

  if (!slug && !isArchive) return null;

  const currentStory = slug ? stories.find((story) => story.slug === slug) : undefined;
  const section: ProjectSection = currentStory?.section ?? "photography";
  const sectionStories = currentStory
    ? stories.filter((story) => story.section === currentStory.section)
    : [];
  const index = currentStory
    ? sectionStories.findIndex((story) => story.slug === currentStory.slug)
    : -1;
  const prev = index > -1 && sectionStories.length > 1
    ? sectionStories[(index - 1 + sectionStories.length) % sectionStories.length]
    : undefined;
  const next = index > -1 && sectionStories.length > 1
    ? sectionStories[(index + 1) % sectionStories.length]
    : undefined;

  return (
    <nav aria-label={workLabel} className="work-rail">
      <div className="work-rail-inner">
        <p className="work-rail-trail">
          <Link href="/work">{workLabel}</Link>
          <span aria-hidden="true">/</span>
          <Link href={{ pathname: "/work", hash: section }}>
            {isArchive ? archiveSectionLabel : sectionLabels[section]}
          </Link>
        </p>

        {prev && next ? (
          <p className="work-rail-pager">
            <Link
              aria-label={prevLabel}
              href={{ pathname: "/work/[slug]", params: { slug: prev.slug } }}
            >
              <span aria-hidden="true">←</span>
            </Link>
            <span className="work-rail-count">
              {index + 1}/{sectionStories.length}
            </span>
            <Link
              aria-label={nextLabel}
              href={{ pathname: "/work/[slug]", params: { slug: next.slug } }}
            >
              <span aria-hidden="true">→</span>
            </Link>
          </p>
        ) : null}
      </div>
    </nav>
  );
}
