"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { MuxPlayerRefAttributes } from "@mux/mux-player-react";

import { focalPointStyle, getMediaSizes, type ProjectMedia } from "@/content/projects";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), { ssr: false });

type PortfolioVideoProps = {
  media: ProjectMedia;
  playLabel: string;
  title: string;
  className?: string;
  sizes?: string;
  posterAlt?: string;
  active?: boolean;
  onActivate?: () => void;
  onDeactivate?: () => void;
  /** Etiquetas ya traducidas de las pistas de subtítulos, por `labelKey`. */
  trackLabels?: Record<string, string>;
};

function embedSrc(media: ProjectMedia) {
  if (media.provider === "youtube" && media.videoId) {
    return `https://www.youtube-nocookie.com/embed/${media.videoId}?autoplay=1`;
  }

  if (media.provider === "vimeo" && media.videoId) {
    return `https://player.vimeo.com/video/${media.videoId}?autoplay=1`;
  }

  return undefined;
}

export function PortfolioVideo({
  media,
  playLabel,
  title,
  className,
  sizes,
  posterAlt,
  active,
  onActivate,
  onDeactivate,
  trackLabels = {},
}: PortfolioVideoProps) {
  const [localActive, setLocalActive] = useState(false);
  const isPlaying = active ?? localActive;
  const [posterVisible, setPosterVisible] = useState(true);
  const [posterFailed, setPosterFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ratio = media.aspectRatio?.replace(":", " / ") ?? "16 / 9";
  const frameClassName = ["portfolio-video", className].filter(Boolean).join(" ");
  const objectPosition = focalPointStyle(media);
  const mobilePoster = media.mobilePoster;
  const canPlay = media.provider === "mux"
    ? Boolean(media.muxPlaybackId)
    : media.provider === "native"
      ? Boolean(media.src)
      : Boolean(embedSrc(media));

  useEffect(() => {
    const handleOtherVideoActivation = (event: Event) => {
      if ((event as CustomEvent<string>).detail === media.id) return;
      setLocalActive(false);
      onDeactivate?.();
    };

    window.addEventListener("portfolio-video-activate", handleOtherVideoActivation);
    return () => window.removeEventListener("portfolio-video-activate", handleOtherVideoActivation);
  }, [media.id, onDeactivate]);

  useEffect(() => {
    if (isPlaying && media.provider === "native") {
      void videoRef.current?.play();
    }
  }, [isPlaying, media.provider]);

  const showPoster = posterVisible || !isPlaying;

  if (!media.poster || !title) {
    return null;
  }

  return (
    <div className={frameClassName} style={{ aspectRatio: ratio }}>
      {isPlaying && media.provider === "mux" && media.muxPlaybackId ? (
        <MuxPlayer
          accentColor="#a52522"
          autoPlay
          className="portfolio-video-player"
          loop={false}
          metadata={{ video_title: title }}
          muted
          noMutedPref
          onPlay={(event) => {
            const player = event.currentTarget as unknown as MuxPlayerRefAttributes;
            player.muted = true;
          }}
          playbackId={media.muxPlaybackId}
          playsInline
          preload="none"
          ref={(player) => {
            if (player) player.muted = true;
          }}
          streamType="on-demand"
        />
      ) : null}
      {isPlaying && media.provider === "native" && media.src ? (
        <video
          className="portfolio-video-player"
          controls
          playsInline
          poster={media.poster}
          preload="none"
          ref={videoRef}
          src={media.src}
          title={title}
        >
          {media.tracks?.map((track) => (
            <track
              default={track.default}
              key={track.src}
              kind={track.kind}
              label={trackLabels[track.labelKey] ?? track.srcLang.toUpperCase()}
              src={track.src}
              srcLang={track.srcLang}
            />
          ))}
        </video>
      ) : null}

      {isPlaying && media.provider !== "native" && embedSrc(media) ? (
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="portfolio-video-player"
          loading="lazy"
          src={embedSrc(media)}
          title={title}
        />
      ) : null}

      {showPoster && canPlay && !posterFailed ? (
        <button
          aria-label={`${playLabel}: ${title}`}
          className="portfolio-video-poster"
          data-state={isPlaying ? "exiting" : "idle"}
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent("portfolio-video-activate", { detail: media.id }),
            );
            setLocalActive(true);
            onActivate?.();
          }}
          onTransitionEnd={() => {
            if (isPlaying) {
              setPosterVisible(false);
            }
          }}
          type="button"
        >
          {mobilePoster ? (
            <picture>
              <source media="(max-width: 699px)" srcSet={mobilePoster} />
              <Image
                alt={posterAlt ?? ""}
                fill
                sizes={sizes ?? getMediaSizes(media.layout)}
                src={media.poster}
                style={{ objectPosition }}
                onError={() => setPosterFailed(true)}
              />
            </picture>
          ) : (
            <Image
              alt={posterAlt ?? ""}
              fill
              sizes={sizes ?? getMediaSizes(media.layout)}
              src={media.poster}
              style={{ objectPosition }}
              onError={() => setPosterFailed(true)}
            />
          )}
          <span className="portfolio-video-play" aria-hidden="true">
            ▶
          </span>
          {media.duration ? (
            <span className="portfolio-video-duration">{media.duration}</span>
          ) : null}
        </button>
      ) : showPoster ? (
        <div className="portfolio-video-poster portfolio-video-poster-fallback" role="img" aria-label={title}>
          {media.duration ? <span className="portfolio-video-duration">{media.duration}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
