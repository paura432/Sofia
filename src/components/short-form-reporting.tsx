"use client";

import Image from "next/image";
import { useCallback, useId, useState } from "react";

import { PortfolioVideo } from "@/components/portfolio-video";
import type { ProjectMedia } from "@/content/projects";

export type ShortFormStory = {
  id: string;
  title: string;
  organisation?: string;
  role?: string;
  year?: string;
  sourceUrl?: string;
  posterSrc: string;
  posterAlt: string;
  posterRatio: string;
  video?: ProjectMedia;
  playLabel: string;
};

type ShortFormReportingProps = {
  projects: ShortFormStory[];
  label: string;
  viewOriginalLabel: string;
  opensInNewTabLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
};

export function ShortFormReporting({
  projects,
  label,
  viewOriginalLabel,
  opensInNewTabLabel,
  showMoreLabel,
  showLessLabel,
}: ShortFormReportingProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const deactivate = useCallback(() => setActiveId(null), []);

  if (!projects.length) return null;
  const visibleProjects = projects.slice(0, expanded ? projects.length : 8);
  const remainingCount = projects.length - visibleProjects.length;

  return (
    <div className="short-form-group">
      <div
        aria-label={label}
        className="short-form-reporting"
        data-count={projects.length}
        id={listId}
        onKeyDown={(event) => {
          if (
            (event.key !== "ArrowLeft" && event.key !== "ArrowRight") ||
            event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
          ) {
            return;
          }
          event.preventDefault();
          event.currentTarget.scrollBy({
            left:
              event.key === "ArrowRight"
                ? event.currentTarget.clientWidth
                : -event.currentTarget.clientWidth,
          });
        }}
        role="region"
        tabIndex={0}
      >
        {visibleProjects.map((project) => (
          <article className="short-form-card" key={project.id}>
            <div
              className="short-form-poster"
              style={{ aspectRatio: project.posterRatio }}
            >
              {project.video ? (
                <PortfolioVideo
                  active={activeId === project.id}
                  className="short-form-video"
                  media={project.video}
                  onActivate={() => setActiveId(project.id)}
                  onDeactivate={deactivate}
                  playLabel={project.playLabel}
                  posterAlt={project.posterAlt}
                  sizes="(max-width: 699px) 78vw, (max-width: 899px) 45vw, (max-width: 1199px) 30vw, 300px"
                  title={project.title}
                />
              ) : (
                project.sourceUrl ? (
                  <a
                    aria-label={`${viewOriginalLabel}: ${project.title} ${opensInNewTabLabel}`}
                    className="short-form-poster-link"
                    href={project.sourceUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Image
                      alt={project.posterAlt}
                      fill
                      sizes="(max-width: 699px) 78vw, (max-width: 899px) 45vw, (max-width: 1199px) 30vw, 300px"
                      src={project.posterSrc}
                    />
                  </a>
                ) : (
                  <Image
                    alt={project.posterAlt}
                    fill
                    sizes="(max-width: 699px) 78vw, (max-width: 899px) 45vw, (max-width: 1199px) 30vw, 300px"
                    src={project.posterSrc}
                  />
                )
              )}
            </div>
            <div className="short-form-copy">
              {project.organisation || project.year ? (
                <p className="case-discipline">
                  {project.organisation}
                  {project.organisation && project.year ? " · " : null}
                  {project.year}
                </p>
              ) : null}
              <h3>{project.title}</h3>
              {project.role ? <p className="short-form-role">{project.role}</p> : null}
              {project.sourceUrl ? (
                <a
                  aria-label={`${viewOriginalLabel}: ${project.title} ${opensInNewTabLabel}`}
                  className="project-row-cta"
                  href={project.sourceUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {viewOriginalLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      {projects.length > 8 ? (
        <button
          aria-controls={listId}
          aria-expanded={expanded}
          className="short-form-more"
          onClick={() => setExpanded((value) => !value)}
          type="button"
        >
          {expanded
            ? showLessLabel
            : showMoreLabel.replace("{count}", String(remainingCount))}
        </button>
      ) : null}
    </div>
  );
}
