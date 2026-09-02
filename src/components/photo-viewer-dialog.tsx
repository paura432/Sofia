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
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef(0);
  const titleId = useId();
  const active = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active) {
      if (!dialog.open) {
        openerRef.current = document.activeElement as HTMLElement | null;
        dialog.showModal();
        closeRef.current?.focus();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [active]);

  useEffect(() => {
    if (activeIndex === null) return;

    const html = document.documentElement;
    scrollYRef.current = window.scrollY;
    const bar = window.innerWidth - html.clientWidth;
    const prevOverflow = html.style.overflow;
    const prevPad = html.style.paddingRight;
    html.style.overflow = "hidden";
    if (bar > 0) html.style.paddingRight = `${bar}px`;

    return () => {
      html.style.overflow = prevOverflow;
      html.style.paddingRight = prevPad;
      window.scrollTo(0, scrollYRef.current);
      openerRef.current?.focus();
    };
  }, [activeIndex]);

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

  if (!active || activeIndex === null) {
    return null;
  }

  return (
    <dialog
      aria-labelledby={titleId}
      className="photo-archive-dialog"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onClose={() => {
        if (activeIndex !== null) onClose();
      }}
      ref={dialogRef}
    >
      <button
        className="photo-viewer-close"
        onClick={onClose}
        ref={closeRef}
        type="button"
      >
        {closeLabel}
      </button>
      <figure
        className="photo-archive-viewer"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          alt={active.label}
          height={active.height}
          sizes="100dvw"
          src={active.src}
          style={{
            height: "auto",
            maxHeight: "calc(100dvh - 9rem)",
            maxWidth: "calc(100dvw - 2.5rem)",
            width: "auto",
          }}
          width={active.width}
        />
        <figcaption id={titleId}>{active.label}</figcaption>
      </figure>
      {items.length > 1 ? (
        <div
          className="photo-viewer-controls"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            disabled={activeIndex === 0}
            onClick={() => onNavigate(activeIndex - 1)}
            type="button"
          >
            ← {prevLabel}
          </button>
          <span>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>
          <button
            disabled={activeIndex === items.length - 1}
            onClick={() => onNavigate(activeIndex + 1)}
            type="button"
          >
            {nextLabel} →
          </button>
        </div>
      ) : null}
    </dialog>
  );
}
