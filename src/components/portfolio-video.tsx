"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import type { ProjectMedia } from "@/content/projects";

type PortfolioVideoProps = {
  media: ProjectMedia;
  playLabel: string;
  title: string;
  className?: string;
  sizes?: string;
};

const defaultSizes =
  "(max-width: 699px) 100vw, (max-width: 1023px) 50vw, 960px";

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
  sizes = defaultSizes,
}: PortfolioVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ratio = media.aspectRatio?.replace(":", " / ") ?? "16 / 9";
  const frameClassName = ["portfolio-video", className].filter(Boolean).join(" ");

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
          ref={videoRef}
          src={media.src}
          title={title}
        />
      ) : null}

      {isPlaying && media.provider !== "native" && embedSrc(media) ? (
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="portfolio-video-player"
          src={embedSrc(media)}
          title={title}
        />
      ) : null}

      {!isPlaying ? (
        <button
          aria-label={`${playLabel}: ${title}`}
          className="portfolio-video-poster"
          onClick={() => setIsPlaying(true)}
          type="button"
        >
          <Image
            alt=""
            fill
            sizes={sizes}
            src={media.poster}
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
