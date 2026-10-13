"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { PortfolioVideo } from "@/components/portfolio-video";
import type { ShortFormStory } from "@/components/short-form-reporting";
import { Link } from "@/i18n/navigation";

type ReelStageProps = {
  stories: ShortFormStory[];
  listLabel: string;
  /** Rótulos de los dos grupos de la escaleta: piezas apaisadas y verticales. */
  wideLabel: string;
  tallLabel: string;
  nowShowingLabel: string;
  soundHint: string;
  viewProjectLabel: string;
  previousLabel: string;
  nextLabel: string;
};

/** "16 / 9" → true; "9 / 16" → false. La pantalla cambia de formato con la pieza. */
function isLandscape(ratio: string) {
  const [width, height] = ratio.split("/").map((part) => Number(part.trim()));
  return Boolean(width && height) && width > height;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Monitor del hero: una sola pantalla (9:16 o 16:9, según la pieza) y una
 * escaleta con todas las piezas. Elegir una pieza de la escaleta es un gesto explícito, así que
 * empieza a reproducirse (con sonido si el navegador lo permite). Sólo existe
 * un reproductor a la vez.
 *
 * En móvil la escaleta es una tira horizontal bajo la pantalla y hay botones de
 * anterior/siguiente; al cambiar de pieza, si la pantalla ha quedado fuera de la
 * vista, la página se desplaza hasta dejarla justo bajo la cabecera.
 */
export function ReelStage({
  stories,
  listLabel,
  wideLabel,
  tallLabel,
  nowShowingLabel,
  soundHint,
  viewProjectLabel,
  previousLabel,
  nextLabel,
}: ReelStageProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const stop = useCallback(() => setPlaying(false), []);
  const screenRef = useRef<HTMLElement>(null);
  const listsRef = useRef<HTMLDivElement>(null);
  // Sólo un cambio hecho por la visitante justifica desplazar la página.
  const userSwitched = useRef(false);

  const selectedIndex = Math.max(0, stories.findIndex((story) => story.id === selectedId));
  const selected = stories[selectedIndex];

  const select = useCallback((story: ShortFormStory) => {
    window.dispatchEvent(new CustomEvent("portfolio-video-activate", { detail: story.video?.id }));
    userSwitched.current = true;
    setSelectedId(story.id);
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!userSwitched.current) return;
    userSwitched.current = false;
    const screen = screenRef.current;
    const lists = listsRef.current;
    if (!screen || !lists) return;

    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

    // La miniatura elegida se centra en la tira sin tocar el scroll de la página.
    const current = lists.querySelector<HTMLElement>('[aria-current="true"]');
    if (current && lists.scrollWidth > lists.clientWidth) {
      const left = current.offsetLeft - (lists.clientWidth - current.offsetWidth) / 2;
      lists.scrollTo({ left: Math.max(0, left), behavior });
    }

    // Pantalla y escaleta ya visibles: no se desplaza nada.
    const headerHeight =
      document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
    const top = headerHeight + 12;
    const screenRect = screen.getBoundingClientRect();
    const listsRect = lists.getBoundingClientRect();
    const visible =
      screenRect.top >= top && Math.max(screenRect.bottom, listsRect.bottom) <= window.innerHeight;
    if (visible) return;

    window.scrollTo({ top: window.scrollY + screenRect.top - top, behavior });
  }, [selectedId]);

  if (!selected?.video) return null;
  const orientation = isLandscape(selected.posterRatio) ? "landscape" : "portrait";
  const previous = stories[selectedIndex - 1];
  const next = stories[selectedIndex + 1];
  // Dos grupos en la escaleta: apaisadas (coberturas) y verticales; la numeración es global.
  const indexed = stories.map((story, index) => ({ story, index }));
  const groups = [
    { key: "wide", label: wideLabel, items: indexed.filter(({ story }) => isLandscape(story.posterRatio)) },
    { key: "tall", label: tallLabel, items: indexed.filter(({ story }) => !isLandscape(story.posterRatio)) },
  ];

  return (
    <div className="reel-stage">
      <figure className="reel-stage-screen" data-orientation={orientation} ref={screenRef}>
        <div className="reel-stage-frame">
          <span aria-hidden="true" className="frame-corners" />
          <PortfolioVideo
          active={playing}
          className="reel-stage-video"
          key={selected.id}
          media={selected.video}
          onActivate={() => setPlaying(true)}
          onDeactivate={stop}
          playLabel={selected.playLabel}
          posterAlt={selected.posterAlt}
          preloadPoster
          // Los reels son 576–720 px de ancho: pedir más sólo descarga píxeles inventados.
          sizes="(max-width: 699px) 76vw, 360px"
          title={selected.title}
          />
        </div>
        <figcaption className="reel-stage-caption">
          <div className="reel-stage-caption-row">
            <span className="reel-stage-title">
              <span className="sr-only">{nowShowingLabel}: </span>
              {selected.title}
            </span>
            <span aria-label={listLabel} className="reel-stage-nav" role="group">
              <span aria-hidden="true" className="reel-stage-counter">
                {String(selectedIndex + 1).padStart(2, "0")}/{String(stories.length).padStart(2, "0")}
              </span>
              <button
                aria-label={previous ? `${previousLabel}: ${previous.title}` : previousLabel}
                className="reel-stage-nav-button"
                disabled={!previous}
                onClick={() => previous && select(previous)}
                type="button"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                aria-label={next ? `${nextLabel}: ${next.title}` : nextLabel}
                className="reel-stage-nav-button"
                disabled={!next}
                onClick={() => next && select(next)}
                type="button"
              >
                <span aria-hidden="true">→</span>
              </button>
            </span>
          </div>
          {playing ? null : <span className="reel-stage-hint">{soundHint}</span>}
          {selected.detailSlug ? (
            <Link
              className="reel-stage-link"
              href={{ pathname: "/work/[slug]", params: { slug: selected.detailSlug } }}
            >
              {viewProjectLabel} <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </figcaption>
      </figure>

      <div aria-label={listLabel} className="reel-stage-lists" ref={listsRef} role="group">
        {groups.map((group) =>
          group.items.length ? (
            <div className="reel-stage-group" key={group.key}>
              <p className="reel-stage-group-label">{group.label}</p>
              <ol className="reel-stage-list">
                {group.items.map(({ story, index }) => {
                  const isSelected = story.id === selected.id;
                  return (
                    <li key={story.id}>
                      <button
                        aria-current={isSelected ? "true" : undefined}
                        aria-label={`${story.playLabel}: ${story.title}`}
                        className="reel-stage-item"
                        onClick={() => select(story)}
                        type="button"
                      >
                        <span className="reel-stage-thumb" style={{ aspectRatio: story.posterRatio }}>
                          <Image alt="" fill sizes="112px" src={story.posterSrc} />
                        </span>
                        <span className="reel-stage-item-copy">
                          <span className="reel-stage-index">{String(index + 1).padStart(2, "0")}</span>
                          <span className="reel-stage-item-title">{story.title}</span>
                          {story.video?.duration ? (
                            <span className="timecode">{story.video.duration}</span>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
