"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { focalPointStyle, getMediaSizes, type ProjectMedia } from "@/content/projects";

type PortfolioVideoProps = {
  media: ProjectMedia;
  playLabel: string;
  title: string;
  className?: string;
  sizes?: string;
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
  trackLabels = {},
}: PortfolioVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterVisible, setPosterVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ratio = media.aspectRatio?.replace(":", " / ") ?? "16 / 9";
  const frameClassName = ["portfolio-video", className].filter(Boolean).join(" ");
  const objectPosition = focalPointStyle(media);

  useEffect(() => {
    if (isPlaying && media.provider === "native") {
      void videoRef.current?.play();
    }
  }, [isPlaying, media.provider]);

  if (!media.poster || !title) {
    return null;
  }

  return (
    <div className={frameClassName} style={{ aspectRatio: ratio }}>
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

      {posterVisible ? (
        <button
          aria-label={`${playLabel}: ${title}`}
          className="portfolio-video-poster"
          data-state={isPlaying ? "exiting" : "idle"}
          onClick={() => setIsPlaying(true)}
          onTransitionEnd={() => {
            if (isPlaying) {
              setPosterVisible(false);
            }
          }}
          type="button"
        >
          <Image
            alt=""
            fill
            sizes={sizes ?? getMediaSizes(media.layout)}
            src={media.poster}
            style={objectPosition ? { objectPosition } : undefined}
          />
          <span className="portfolio-video-play" aria-hidden="true">
            ▶
          </span>
          {media.duration ? (
            <span className="portfolio-video-duration">{media.duration}</span>
          ) : null}
        </button>
      ) : null}
    </div>
  );
}
