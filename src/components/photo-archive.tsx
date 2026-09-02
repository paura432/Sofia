"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import {
  PhotoViewerDialog,
  type PhotoViewerItem,
} from "@/components/photo-viewer-dialog";
import {
  photoArchiveGroups,
  type ArchivePhoto,
} from "@/content/photo-archive-data";

type PhotoArchiveProps = {
  closeLabel: string;
  groups: { id: keyof typeof photoArchiveGroups; title: string }[];
  nextLabel: string;
  prevLabel: string;
  title: string;
  totalLabel: string;
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

export function PhotoArchive({
  closeLabel,
  groups,
  nextLabel,
  prevLabel,
  title,
  totalLabel,
}: PhotoArchiveProps) {
  const t = useTranslations("Work");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
    () => new Map(flatItems.map((item, index) => [item.id, index])),
    [flatItems],
  );

  return (
    <section className="photo-archive" id="archivo">
      <div className="container">
        <header className="photo-archive-header">
          <p className="eyebrow">{title}</p>
          <p>{totalLabel}</p>
        </header>
        {groups.map((group) => (
          <div className="photo-archive-group" key={group.id}>
            <h3>{group.title}</h3>
            <ul className="photo-archive-sheet">
              {photoArchiveGroups[group.id].map((item, index) => {
                const label = t("archiveImageLabel", {
                  group: group.title,
                  index: index + 1,
                });

                return (
                  <li key={item.id}>
                    <button
                      aria-label={label}
                      onClick={() => setActiveIndex(indexById.get(item.id) ?? null)}
                      type="button"
                    >
                      <Image
                        alt=""
                        blurDataURL={item.blurDataURL}
                        height={item.height}
                        placeholder={item.blurDataURL ? "blur" : "empty"}
                        sizes="(max-width: 699px) 30vw, 140px"
                        src={item.src}
                        width={item.width}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
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
