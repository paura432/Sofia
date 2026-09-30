"use client";

import Image from "next/image";
import { useState } from "react";

import { PortfolioVideo } from "@/components/portfolio-video";
import type { ProjectMedia } from "@/content/projects";

export type ShortFormStory = {
  id: string;
  title: string;
  organisation?: string;
  role?: string;
  year?: string;
  sourceUrl: string;
  posterSrc: string;
  posterAlt: string;
  posterRatio: string;
  video?: ProjectMedia;
  playLabel: string;
};

type ShortFormReportingProps = {
  projects: ShortFormStory[];
  viewOriginalLabel: string;
  opensInNewTabLabel: string;
};

export function ShortFormReporting({
  projects,
  viewOriginalLabel,
  opensInNewTabLabel,
}: ShortFormReportingProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  if (!projects.length) return null;

  return (
    <div className="short-form-reporting" data-count={projects.length}>
      {projects.map((project) => (
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
                playLabel={project.playLabel}
                posterAlt={project.posterAlt}
                sizes="(max-width: 699px) 78vw, (max-width: 899px) 45vw, (max-width: 1199px) 30vw, 300px"
                title={project.title}
              />
            ) : (
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
          </div>
        </article>
      ))}
    </div>
  );
}
