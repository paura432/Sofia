"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import {
  PhotoViewerDialog,
  type PhotoViewerItem,
} from "@/components/photo-viewer-dialog";
import type { ArchivePhoto } from "@/content/photo-archive-data";
import {
  buildJustifiedRows,
  isArchiveMobile,
  secondaryRowConfig,
} from "@/lib/justified-rows";

type MoreFromSeriesProps = {
  closeLabel: string;
  countLabel: string;
  items: ArchivePhoto[];
  nextLabel: string;
  prevLabel: string;
  title: string;
};

function moreSizes(landscape: boolean) {
  return landscape
    ? "(max-width: 359px) 92vw, (max-width: 699px) 92vw, (max-width: 1023px) 42vw, 32vw"
    : "(max-width: 359px) 92vw, (max-width: 699px) 46vw, (max-width: 1023px) 32vw, 24vw";
}

function SeriesThumb({
  item,
  label,
  onOpen,
}: {
  item: ArchivePhoto;
  label: string;
  onOpen: () => void;
}) {
  const landscape = item.width >= item.height;

  return (
    <button aria-label={label} onClick={onOpen} type="button">
      <Image
        alt={label}
        blurDataURL={item.blurDataURL}
        height={item.height}
        loading="lazy"
        placeholder={item.blurDataURL ? "blur" : "empty"}
        sizes={moreSizes(landscape)}
        src={item.src}
        width={item.width}
      />
    </button>
  );
}

export function MoreFromSeries({
  closeLabel,
  countLabel,
  items,
  nextLabel,
  prevLabel,
  title,
}: MoreFromSeriesProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const apply = (next: number) => {
      const rounded = Math.round(next);
      setWidth((prev) => (prev === rounded ? prev : rounded));
    };
    apply(el.clientWidth);
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) apply(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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

  const indexById = new Map<string, number>(
    items.map((item, index) => [item.id, index]),
  );
  const measured = width > 0;
  const mobile = measured && isArchiveMobile(width);
  const rowConfig = secondaryRowConfig(width);
  const rows =
    !measured || mobile || items.length === 1
      ? null
      : buildJustifiedRows(
          items,
          width,
          rowConfig.targetRowHeight,
          rowConfig.gap,
          rowConfig.maxItems,
        );

  return (
    <section className="section more-from-series">
      <div className="more-from-series-frame" ref={frameRef}>
        <header className="more-from-series-header">
          <p className="eyebrow">{title}</p>
          <p>{countLabel}</p>
        </header>
        {items.length === 1 ? (
          <div className="more-from-series-single">
            <SeriesThumb
              item={items[0]}
              label={viewerItems[0].label}
              onOpen={() => setActiveIndex(0)}
            />
          </div>
        ) : !measured ? null : rows ? (
          <div className="more-from-series-justified">
            {rows.map((row, rowIndex) => (
              <ul
                className={
                  row.loose
                    ? "more-from-series-row more-from-series-row--loose"
                    : "more-from-series-row"
                }
                key={rowIndex}
                style={{
                  gap: rowConfig.gap,
                  height: row.rowHeight,
                  marginBottom: rowConfig.gap,
                }}
              >
                {row.photos.map((placed) => {
                  const index = indexById.get(placed.id) ?? 0;
                  const photo = items[index];
                  return (
                    <li
                      key={placed.id}
                      style={{
                        flex: row.loose
                          ? `0 0 ${placed.displayWidth}px`
                          : `${placed.width / placed.height} 1 0`,
                        width: placed.displayWidth,
                      }}
                    >
                      <SeriesThumb
                        item={photo}
                        label={viewerItems[index].label}
                        onOpen={() => setActiveIndex(index)}
                      />
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        ) : (
          <ul className="more-from-series-mobile">
            {items.map((item, index) => (
              <li
                data-orient={item.width >= item.height ? "land" : "port"}
                key={item.id}
              >
                <SeriesThumb
                  item={item}
                  label={viewerItems[index].label}
                  onOpen={() => setActiveIndex(index)}
                />
              </li>
            ))}
          </ul>
        )}
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
