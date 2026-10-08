import Image from "next/image";

import { MorphFrame } from "@/components/motion/morph-frame";
import { Link } from "@/i18n/navigation";

export type SeriesEntry = {
  slug: string;
  title: string;
  countLabel: string;
  src: string;
  alt: string;
  blurDataURL?: string;
  objectPosition: string;
};

type SeriesGridProps = {
  series: SeriesEntry[];
  archive?: { href: "/work/photography/archive"; title: string; countLabel: string; src: string; objectPosition?: string };
  variant?: "strip" | "grid";
};

/**
 * Portadas fotográficas en un mismo formato (4:5) para que se comparen como
 * una hoja de contactos; el punto focal de cada portada evita cortar caras.
 */
export function SeriesGrid({ series, archive, variant = "grid" }: SeriesGridProps) {
  return (
    <ul className="series-grid" data-variant={variant}>
      {series.map((item) => (
        <li key={item.slug}>
          <Link
            className="series-card"
            href={{ pathname: "/work/[slug]", params: { slug: item.slug } }}
          >
            <MorphFrame slug={item.slug}>
              <span className="series-cover">
              <Image
                alt={item.alt}
                blurDataURL={item.blurDataURL}
                fill
                placeholder={item.blurDataURL ? "blur" : "empty"}
                sizes={variant === "strip"
                  ? "(max-width: 699px) 70vw, (max-width: 1199px) 30vw, 19vw"
                  : "(max-width: 699px) 92vw, (max-width: 1199px) 46vw, 31vw"}
                src={item.src}
                style={{ objectPosition: item.objectPosition }}
              />
            </span>
            </MorphFrame>
            <span className="series-copy">
              <span className="series-title">{item.title}</span>
              <span className="series-count">{item.countLabel}</span>
            </span>
          </Link>
        </li>
      ))}
      {archive ? (
        <li className="series-archive">
          <Link className="series-card" href={archive.href}>
            <span className="series-cover series-cover-archive">
              <Image
                alt=""
                fill
                sizes="(max-width: 699px) 92vw, (max-width: 1199px) 46vw, 31vw"
                src={archive.src}
                style={{ objectPosition: archive.objectPosition ?? "50% 50%" }}
              />
              <span className="series-archive-count" aria-hidden="true">74</span>
            </span>
            <span className="series-copy">
              <span className="series-title">{archive.title}</span>
              <span className="series-count">{archive.countLabel}</span>
            </span>
          </Link>
        </li>
      ) : null}
    </ul>
  );
}
