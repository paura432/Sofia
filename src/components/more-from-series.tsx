"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import {
  PhotoViewerDialog,
  type PhotoViewerItem,
} from "@/components/photo-viewer-dialog";
import type { ArchivePhoto } from "@/content/photo-archive-data";

type MoreFromSeriesProps = {
  closeLabel: string;
  countLabel: string;
  items: ArchivePhoto[];
  nextLabel: string;
  prevLabel: string;
  title: string;
};

export function MoreFromSeries({
  closeLabel,
  countLabel,
  items,
  nextLabel,
  prevLabel,
  title,
}: MoreFromSeriesProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const viewerItems = useMemo<PhotoViewerItem[]>(
    () =>
      items.map((item, index) => ({
        id: item.id,
        label: `${title} ${index + 1}`,
        src: item.src,
        width: item.width,
        height: item.height,
        blurDataURL: item.blurDataURL,
      })),
    [items, title],
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="section more-from-series">
      <div className="container">
        <header className="more-from-series-header">
          <p className="eyebrow">{title}</p>
          <p>{countLabel}</p>
        </header>
        <ul className="more-from-series-grid">
          {viewerItems.map((item, index) => (
            <li key={item.id}>
              <button
                aria-label={item.label}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <Image
                  alt=""
                  blurDataURL={item.blurDataURL}
                  height={item.height}
                  placeholder={item.blurDataURL ? "blur" : "empty"}
                  sizes="(max-width: 699px) 30vw, 160px"
                  src={item.src}
                  width={item.width}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <PhotoViewerDialog
        activeIndex={activeIndex}
        closeLabel={closeLabel}
        items={viewerItems}
        nextLabel={nextLabel}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
        prevLabel={prevLabel}
      />
    </section>
  );
}
