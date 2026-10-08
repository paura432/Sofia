import Image from "next/image";

import { MorphFrame } from "@/components/motion/morph-frame";
import { Link } from "@/i18n/navigation";

export type FilmEntry = {
  slug: string;
  title: string;
  description?: string;
  format?: string;
  role?: string;
  duration?: string;
  posterSrc: string;
  posterAlt: string;
};

type FilmIndexProps = {
  films: FilmEntry[];
  viewLabel: string;
  /** "feature": primera obra grande + lista. "list": todas como filas. */
  variant?: "feature" | "list";
};

function FilmPoster({ film, sizes }: { film: FilmEntry; sizes: string }) {
  return (
    <MorphFrame slug={film.slug}>
      <span className="film-poster">
      <Image alt={film.posterAlt} fill sizes={sizes} src={film.posterSrc} />
      {film.duration ? <span className="timecode film-duration">{film.duration}</span> : null}
      </span>
    </MorphFrame>
  );
}

/** Filmografía editorial: cada obra lleva rol, formato y duración visibles. */
export function FilmIndex({ films, viewLabel, variant = "list" }: FilmIndexProps) {
  if (!films.length) return null;
  const [lead, ...rest] = variant === "feature" ? films : [undefined, ...films];

  return (
    <div className="film-index" data-variant={variant}>
      {lead ? (
        <Link
          className="film-lead"
          href={{ pathname: "/work/[slug]", params: { slug: lead.slug } }}
        >
          <FilmPoster film={lead} sizes="(max-width: 899px) 100vw, 58vw" />
          <span className="film-lead-copy">
            <span className="film-title">{lead.title}</span>
            <span className="film-meta">{[lead.format, lead.role].filter(Boolean).join(" · ")}</span>
          </span>
        </Link>
      ) : null}
      <ol className="film-list">
        {rest.map((film) =>
          film ? (
            <li key={film.slug}>
              <Link
                aria-label={`${viewLabel}: ${film.title}`}
                className="film-row"
                href={{ pathname: "/work/[slug]", params: { slug: film.slug } }}
              >
                <FilmPoster film={film} sizes="(max-width: 699px) 40vw, 280px" />
                <span className="film-row-copy">
                  <span className="film-title">{film.title}</span>
                  {film.format ? <span className="film-meta">{film.format}</span> : null}
                  {film.role ? <span className="film-role">{film.role}</span> : null}
                  {variant === "list" && film.description ? (
                    <span className="film-description">{film.description}</span>
                  ) : null}
                </span>
                <span aria-hidden="true" className="film-arrow">→</span>
              </Link>
            </li>
          ) : null,
        )}
      </ol>
    </div>
  );
}
