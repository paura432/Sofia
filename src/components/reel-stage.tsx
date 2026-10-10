"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { PortfolioVideo } from "@/components/portfolio-video";
import type { ShortFormStory } from "@/components/short-form-reporting";
import { Link } from "@/i18n/navigation";

type ReelStageProps = {
  stories: ShortFormStory[];
  listLabel: string;
  nowShowingLabel: string;
  soundHint: string;
  viewProjectLabel: string;
};

/**
 * Monitor del hero: una sola pantalla 9:16 y una escaleta con todas las
 * piezas. Elegir una pieza de la escaleta es un gesto explícito, así que
 * empieza a reproducirse (con sonido si el navegador lo permite). Sólo existe
 * un reproductor a la vez.
 */
export function ReelStage({ stories, listLabel, nowShowingLabel, soundHint, viewProjectLabel }: ReelStageProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const stop = useCallback(() => setPlaying(false), []);
  const selected = stories.find((story) => story.id === selectedId) ?? stories[0];

  if (!selected?.video) return null;

  return (
    <div className="reel-stage">
      <figure className="reel-stage-screen">
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
          sizes="(max-width: 699px) 50vw, 360px"
          title={selected.title}
          />
        </div>
        <figcaption className="reel-stage-caption">
          <span className="sr-only">{nowShowingLabel}: </span>
          <span className="reel-stage-title">{selected.title}</span>
          {selected.description ? (
            <span className="reel-stage-description">{selected.description}</span>
          ) : null}
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

      <ol aria-label={listLabel} className="reel-stage-list">
        {stories.map((story, index) => {
          const isSelected = story.id === selected.id;
          return (
            <li key={story.id}>
              <button
                aria-current={isSelected ? "true" : undefined}
                aria-label={`${story.playLabel}: ${story.title}`}
                className="reel-stage-item"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("portfolio-video-activate", { detail: story.video?.id }),
                  );
                  setSelectedId(story.id);
                  setPlaying(true);
                }}
                type="button"
              >
                <span className="reel-stage-thumb">
                  <Image alt="" fill sizes="64px" src={story.posterSrc} />
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
  );
}
