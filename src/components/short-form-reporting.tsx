"use client";

import Image from "next/image";
import { useCallback, useId, useState } from "react";

import { PortfolioVideo } from "@/components/portfolio-video";
import type { ProjectMedia } from "@/content/projects";
import { Link } from "@/i18n/navigation";

export type ShortFormStory = {
  id: string;
  title: string;
  organisation?: string;
  role?: string;
  year?: string;
  sourceUrl?: string;
  /** Slug de la ficha de detalle, cuando la pieza tiene historia propia. */
  detailSlug?: string;
  posterSrc: string;
  posterAlt: string;
  posterRatio: string;
  video?: ProjectMedia;
  playLabel: string;
};

type ShortFormReportingProps = {
  projects: ShortFormStory[];
  label: string;
  /** Rótulos de los dos grupos: piezas apaisadas (coberturas) y verticales. */
  wideLabel: string;
  tallLabel: string;
  viewOriginalLabel: string;
  viewProjectLabel: string;
  opensInNewTabLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
};

/*
 * Anchos reales de las tarjetas: las apaisadas van siempre a dos columnas (~46vw, tope ~880px
 * en el lienzo de 1920); las verticales a dos columnas en móvil y cuatro en escritorio.
 * Antes se pedían 300px para tarjetas de ~800px y el póster llegaba reescalado y borroso.
 */
const wideSizes = "(max-width: 1919px) 46vw, 880px";
const tallSizes = "(max-width: 999px) 46vw, (max-width: 1919px) 23vw, 430px";

function isLandscape(ratio: string) {
  const [width, height] = ratio.split("/").map((part) => Number(part.trim()));
  return Boolean(width && height) && width > height;
}

export function ShortFormReporting({
  projects,
  label,
  wideLabel,
  tallLabel,
  viewOriginalLabel,
  viewProjectLabel,
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

  const groups = [
    { key: "wide", label: wideLabel, items: visibleProjects.filter((project) => isLandscape(project.posterRatio)) },
    { key: "tall", label: tallLabel, items: visibleProjects.filter((project) => !isLandscape(project.posterRatio)) },
  ].filter((group) => group.items.length);

  return (
    <div className="short-form-group" aria-label={label} id={listId} role="group">
      {groups.map((group) => (
        <section className={`short-form-block short-form-block-${group.key}`} key={group.key}>
          <p className="eyebrow short-form-block-label">{group.label}</p>
          <div className="short-form-reporting" data-count={group.items.length}>
        {group.items.map((project) => {
          const posterSizes = group.key === "wide" ? wideSizes : tallSizes;
          return (
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
                  sizes={posterSizes}
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
                      sizes={posterSizes}
                      src={project.posterSrc}
                    />
                  </a>
                ) : (
                  <Image
                    alt={project.posterAlt}
                    fill
                    sizes={posterSizes}
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
              {project.detailSlug ? (
                <Link
                  aria-label={`${viewProjectLabel}: ${project.title}`}
                  className="project-row-cta"
                  href={{ pathname: "/work/[slug]", params: { slug: project.detailSlug } }}
                >
                  {viewProjectLabel}
                  <span aria-hidden="true">→</span>
                </Link>
              ) : null}
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
          );
        })}
          </div>
        </section>
      ))}
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
