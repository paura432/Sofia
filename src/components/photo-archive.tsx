"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import {
  PhotoViewerDialog,
  type PhotoViewerItem,
} from "@/components/photo-viewer-dialog";
import {
  PHOTO_ARCHIVE_COUNT,
  photoArchiveGroups,
  type ArchivePhoto,
} from "@/content/photo-archive-data";
import {
  archiveRowConfig,
  buildJustifiedRows,
  isArchiveMobile,
} from "@/lib/justified-rows";

type GroupId = keyof typeof photoArchiveGroups;

type PhotoArchiveProps = {
  closeLabel: string;
  groups: { id: GroupId; title: string }[];
  nextLabel: string;
  prevLabel: string;
  title: string;
  totalLabel: string;
};

const SECTION_INDEX = ["01", "02", "03", "04"] as const;

const INDEX_KEY: Record<GroupId, "archiveMusica" | "archiveRetrato" | "archiveEstudio" | "archiveCalle"> = {
  musica: "archiveMusica",
  retrato: "archiveRetrato",
  estudio: "archiveEstudio",
  calle: "archiveCalle",
};

function toViewerItem(item: ArchivePhoto, label: string): PhotoViewerItem {
  return {
    id: item.id,
    label,
    src: item.src,
    width: item.width,
    height: item.height,
    blurDataURL: item.blurDataURL,
  };
}

function archiveSizes(landscape: boolean) {
  return landscape
    ? "(max-width: 600px) 92vw, (max-width: 900px) 48vw, 32vw"
    : "(max-width: 600px) 46vw, (max-width: 900px) 32vw, 22vw";
}

function ArchiveThumb({
  item,
  label,
  onOpen,
}: {
  item: {
    src: string;
    width: number;
    height: number;
    blurDataURL?: string;
  };
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
        sizes={archiveSizes(landscape)}
        src={item.src}
        width={item.width}
      />
    </button>
  );
}

export function PhotoArchive({
  closeLabel,
  groups,
  nextLabel,
  prevLabel,
  title,
  totalLabel,
}: PhotoArchiveProps) {
  const t = useTranslations("Work");
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

  const flatItems = useMemo(
    () =>
      groups.flatMap((group) =>
        photoArchiveGroups[group.id].map((item, index) =>
          toViewerItem(
            item,
            t("archiveImageLabel", { group: group.title, index: index + 1 }),
          ),
        ),
      ),
    [groups, t],
  );
  const indexById = useMemo(
    () =>
      new Map<string, number>(
        flatItems.map((item, index) => [item.id, index]),
      ),
    [flatItems],
  );

  const mobile = width === 0 || isArchiveMobile(width);
  const rowConfig = archiveRowConfig(width);

  return (
    <section className="photo-archive" id="archivo">
      <div className="photo-archive-frame" ref={frameRef}>
        <header className="photo-archive-header">
          <p className="eyebrow">{title}</p>
          <p>{totalLabel}</p>
        </header>
        <nav aria-label={title} className="photo-archive-index">
          <a href="#archivo">
            {t("archiveIndexAll")} {PHOTO_ARCHIVE_COUNT}
          </a>
          {groups.map((group) => (
            <a href={`#archivo-${group.id}`} key={group.id}>
              {t(INDEX_KEY[group.id])} {photoArchiveGroups[group.id].length}
            </a>
          ))}
        </nav>
        {groups.map((group, groupIndex) => {
          const photos: ArchivePhoto[] = [...photoArchiveGroups[group.id]];
          const localIndex = new Map<string, number>(
            photos.map((photo, index) => [photo.id, index]),
          );
          const rows =
            mobile
              ? null
              : buildJustifiedRows(
                  photos,
                  width,
                  rowConfig.targetRowHeight,
                  rowConfig.gap,
                  rowConfig.maxItems,
                );

          return (
            <section
              className="photo-archive-group"
              id={`archivo-${group.id}`}
              key={group.id}
            >
              <header className="photo-archive-section-head">
                <span>{SECTION_INDEX[groupIndex]}</span>
                <h3>{group.title}</h3>
                <span>{photos.length}</span>
              </header>
              {rows ? (
                <div className="photo-archive-justified">
                  {rows.map((row, rowIndex) => (
                    <ul
                      className={
                        row.loose
                          ? "photo-archive-row photo-archive-row--loose"
                          : "photo-archive-row"
                      }
                      key={`${group.id}-${rowIndex}`}
                      style={{
                        gap: rowConfig.gap,
                        height: row.rowHeight,
                        marginBottom: rowConfig.gap,
                      }}
                    >
                      {row.photos.map((item) => {
                        const photo =
                          photos[localIndex.get(item.id) ?? 0];
                        const label = t("archiveImageLabel", {
                          group: group.title,
                          index: (localIndex.get(item.id) ?? 0) + 1,
                        });

                        return (
                          <li
                            key={item.id}
                            style={{
                              flex: row.loose
                                ? `0 0 ${item.displayWidth}px`
                                : `${item.width / item.height} 1 0`,
                              width: item.displayWidth,
                            }}
                          >
                            <ArchiveThumb
                              item={photo}
                              label={label}
                              onOpen={() =>
                                setActiveIndex(indexById.get(item.id) ?? null)
                              }
                            />
                          </li>
                        );
                      })}
                    </ul>
                  ))}
                </div>
              ) : (
                <ul className="photo-archive-mobile">
                  {photos.map((item, index) => (
                    <li
                      data-orient={
                        item.width >= item.height ? "land" : "port"
                      }
                      key={item.id}
                    >
                      <ArchiveThumb
                        item={item}
                        label={t("archiveImageLabel", {
                          group: group.title,
                          index: index + 1,
                        })}
                        onOpen={() =>
                          setActiveIndex(indexById.get(item.id) ?? null)
                        }
                      />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
      <PhotoViewerDialog
        activeIndex={activeIndex}
        closeLabel={closeLabel}
        items={flatItems}
        nextLabel={nextLabel}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
        prevLabel={prevLabel}
      />
    </section>
  );
}
