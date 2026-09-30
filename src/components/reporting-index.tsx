"use client";

import Image from "next/image";
import { useState } from "react";

import { PortfolioVideo } from "@/components/portfolio-video";
import { StaggerGroup } from "@/components/motion/stagger";
import { Link } from "@/i18n/navigation";
import { publishableYear, type ProjectMedia } from "@/content/projects";

export type ReportingStory = {
  id: string;
  slug: string;
  title: string;
  roles?: string[];
  organisation?: string;
  year?: string;
  sourceUrl: string;
  detailPage: boolean;
  posterSrc: string;
  posterAlt: string;
  posterRatio: string;
  video?: ProjectMedia;
  playLabel: string;
};

type ReportingIndexProps = {
  projects: ReportingStory[];
  closePlayerLabel: string;
  viewOriginalLabel: string;
  playLabel: string;
};

export function ReportingIndex({
  projects,
  closePlayerLabel,
  viewOriginalLabel,
  playLabel,
}: ReportingIndexProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  if (projects.length === 0) return null;

  return (
    <div className="reporting-index" data-count={projects.length}>
      {projects.map((project, index) => {
        const year = publishableYear(project.year);
        const poster = (
          <div
            className="reporting-story-poster"
            style={{ aspectRatio: project.posterRatio }}
          >
            <Image
              alt={project.posterAlt}
              fill
              sizes="(min-width: 1200px) 28vw, (min-width: 700px) 45vw, 92vw"
              src={project.posterSrc}
            />
            {project.video ? (
              <span className="reporting-story-play" aria-hidden="true">
                ▶
              </span>
            ) : null}
          </div>
        );

        return (
          <StaggerGroup
            as="article"
            className="reporting-story"
            key={project.id}
            step={40}
          >
            {activeId === project.id && project.video ? (
              <div className="reporting-story-player">
                <PortfolioVideo
                  media={project.video}
                  playLabel={playLabel}
                  title={project.title}
                />
                <button
                  className="reporting-story-close"
                  onClick={() => setActiveId(null)}
                  type="button"
                >
                  {closePlayerLabel}
                </button>
              </div>
            ) : (
              project.video ? (
                <button
                  aria-label={project.playLabel}
                  className="reporting-story-poster-button"
                  onClick={() => setActiveId(project.id)}
                  type="button"
                >
                  {poster}
                </button>
              ) : (
                <a
                  className="reporting-story-poster-link"
                  href={project.sourceUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {poster}
                </a>
              )
            )}
            <p className="case-number">{String(index + 1).padStart(2, "0")}</p>
            <div className="reporting-story-copy">
              {project.organisation || year ? (
                <p className="case-discipline">
                  {project.organisation}
                  {project.organisation && year ? " · " : null}
                  {year}
                </p>
              ) : null}
              {project.detailPage ? (
                <Link
                  className="reporting-story-title"
                  href={{
                    pathname: "/work/[slug]",
                    params: { slug: project.slug },
                  }}
                >
                  <h3>{project.title}</h3>
                </Link>
              ) : (
                <h3>{project.title}</h3>
              )}
              {project.roles?.length ? (
                <p className="reporting-story-roles">
                  {project.roles.join(" · ")}
                </p>
              ) : null}
              <a
                aria-label={`${viewOriginalLabel}: ${project.title}`}
                className="project-row-cta"
                href={project.sourceUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {viewOriginalLabel}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </StaggerGroup>
        );
      })}
    </div>
  );
}
