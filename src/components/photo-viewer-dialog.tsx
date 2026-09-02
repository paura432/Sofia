"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";

export type PhotoViewerItem = {
  id: string;
  label: string;
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

type PhotoViewerDialogProps = {
  activeIndex: number | null;
  closeLabel: string;
  items: PhotoViewerItem[];
  nextLabel: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
  prevLabel: string;
};

export function PhotoViewerDialog({
  activeIndex,
  closeLabel,
  items,
  nextLabel,
  onClose,
  onNavigate,
  prevLabel,
}: PhotoViewerDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const active = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [active]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && activeIndex > 0) {
        event.preventDefault();
        onNavigate(activeIndex - 1);
      } else if (event.key === "ArrowRight" && activeIndex < items.length - 1) {
        event.preventDefault();
        onNavigate(activeIndex + 1);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, items.length, onNavigate]);

  return (
    <dialog
      aria-labelledby={titleId}
      className="photo-archive-dialog"
      onClose={onClose}
      ref={dialogRef}
    >
      {active ? (
        <div className="photo-archive-viewer">
          <p id={titleId}>{active.label}</p>
          <Image
            alt={active.label}
            height={active.height}
            sizes="92vw"
            src={active.src}
            style={{
              height: "auto",
              maxHeight: "82vh",
              width: "auto",
              maxWidth: "100%",
            }}
            width={active.width}
          />
          <div className="photo-viewer-controls">
            <button
              disabled={activeIndex === 0}
              onClick={() => onNavigate(activeIndex! - 1)}
              type="button"
            >
              ← {prevLabel}
            </button>
            <span>
              {String(activeIndex! + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>
            <button
              disabled={activeIndex === items.length - 1}
              onClick={() => onNavigate(activeIndex! + 1)}
              type="button"
            >
              {nextLabel} →
            </button>
          </div>
          <form method="dialog">
            <button type="submit">{closeLabel}</button>
          </form>
        </div>
      ) : null}
    </dialog>
  );
}
