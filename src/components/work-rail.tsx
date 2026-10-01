"use client";

import { useParams } from "next/navigation";

import { Link, usePathname } from "@/i18n/navigation";
import type { ProjectSection } from "@/content/projects";

export type WorkRailStory = {
  slug: string;
  section?: ProjectSection;
};

type WorkRailProps = {
  audiovisualLabel: string;
  archiveLabel: string;
  backLabel: string;
  indexLabel: string;
  nextLabel: string;
  photographyLabel: string;
  reportingLabel: string;
  prevLabel: string;
  hasReporting: boolean;
  hasAudiovisual: boolean;
  hasPhotography: boolean;
  stories: WorkRailStory[];
  workLabel: string;
};

export function WorkRail({
  audiovisualLabel,
  archiveLabel,
  backLabel,
  indexLabel,
  nextLabel,
  photographyLabel,
  reportingLabel,
  hasReporting,
  hasAudiovisual,
  hasPhotography,
  prevLabel,
  stories,
  workLabel,
}: WorkRailProps) {
  const params = useParams<{ slug?: string }>();
  const pathname = usePathname();
  const slug = typeof params.slug === "string" ? params.slug : undefined;
  const currentStory = slug ? stories.find((story) => story.slug === slug) : undefined;
  const sectionStories = currentStory
    ? stories.filter((story) => story.section === currentStory.section)
    : [];
  const index = currentStory
    ? sectionStories.findIndex((story) => story.slug === currentStory.slug)
    : -1;
  const prev = index > -1
    ? sectionStories[(index - 1 + sectionStories.length) % sectionStories.length]
    : undefined;
  const next = index > -1
    ? sectionStories[(index + 1) % sectionStories.length]
    : undefined;
  const backHref = currentStory?.section
    ? `/work/${currentStory.section}` as const
    : "/work";

  return (
    <nav aria-label={workLabel} className="work-rail">
      <div
        className="work-rail-inner"
        data-project={slug ? "true" : undefined}
      >
        {slug ? (
          <Link className="work-rail-back" href={backHref}>
            <span aria-hidden="true" className="work-rail-arrow">←</span>
            {backLabel}
          </Link>
        ) : (
          <div className="work-rail-context">
            <Link href="/work">{indexLabel}</Link>
            {hasReporting ? (
              <Link aria-current={pathname === "/work/reporting" ? "page" : undefined} href="/work/reporting">
                {reportingLabel}
              </Link>
            ) : null}
            {hasAudiovisual ? (
              <Link aria-current={pathname === "/work/audiovisual" ? "page" : undefined} href="/work/audiovisual">
                {audiovisualLabel}
              </Link>
            ) : null}
            {hasPhotography ? (
              <Link aria-current={pathname === "/work/photography" ? "page" : undefined} href="/work/photography">
                {photographyLabel}
              </Link>
            ) : null}
            {hasPhotography ? (
              <Link aria-current={pathname === "/work/photography/archive" ? "page" : undefined} href="/work/photography/archive">
                {archiveLabel}
              </Link>
            ) : null}
          </div>
        )}

        {slug && prev && next ? (
          <p className="work-rail-pager">
            <Link
              aria-label={prevLabel}
              href={{ pathname: "/work/[slug]", params: { slug: prev.slug } }}
            >
              <span aria-hidden="true" className="work-rail-arrow">←</span>
            </Link>
            <span>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(sectionStories.length).padStart(2, "0")}
            </span>
            <Link
              aria-label={nextLabel}
              href={{ pathname: "/work/[slug]", params: { slug: next.slug } }}
            >
              <span aria-hidden="true" className="work-rail-arrow">→</span>
            </Link>
          </p>
        ) : null}
      </div>
    </nav>
  );
}
