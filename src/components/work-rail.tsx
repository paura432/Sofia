"use client";

import { useParams } from "next/navigation";

import { Link } from "@/i18n/navigation";

export type WorkRailStory = {
  slug: string;
};

type WorkRailProps = {
  audiovisualLabel: string;
  archiveLabel: string;
  backLabel: string;
  indexLabel: string;
  nextLabel: string;
  photographyLabel: string;
  prevLabel: string;
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
  prevLabel,
  stories,
  workLabel,
}: WorkRailProps) {
  const params = useParams<{ slug?: string }>();
  const slug = typeof params.slug === "string" ? params.slug : undefined;
  const index = slug
    ? stories.findIndex((story) => story.slug === slug)
    : -1;
  const prev = index > -1 ? stories[(index - 1 + stories.length) % stories.length] : undefined;
  const next = index > -1 ? stories[(index + 1) % stories.length] : undefined;

  return (
    <nav aria-label={workLabel} className="work-rail">
      <div
        className="work-rail-inner"
        data-project={slug ? "true" : undefined}
      >
        {slug ? (
          <Link className="work-rail-back" href="/work">
            <span aria-hidden="true" className="work-rail-arrow">←</span>
            {backLabel}
          </Link>
        ) : (
          <div className="work-rail-context">
            <Link aria-current="page" href="/work">{indexLabel}</Link>
            <Link
              href={{ pathname: "/work", hash: "audiovisual" }}
            >
              {audiovisualLabel}
            </Link>
            <Link
              href={{ pathname: "/work", hash: "fotografia" }}
            >
              {photographyLabel}
            </Link>
            <Link href={{ pathname: "/work", hash: "archivo" }}>
              {archiveLabel}
            </Link>
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
              {String(stories.length).padStart(2, "0")}
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
