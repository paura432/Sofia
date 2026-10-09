"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";

export type PhotoViewerItem = {
  id: string;
  /** Pie visible del visor: corto (serie, posición o caption real). */
  label: string;
  /** Descripción para lectores de pantalla. Sin ella se usa `label`. */
  alt?: string;
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
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const swipeRef = useRef<{ x: number; y: number; id: number } | null>(null);
  const active = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

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
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
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
      aria-labelledby={active ? titleId : undefined}
      className="photo-archive-dialog"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={() => {
        if (activeIndex !== null) onClose();
      }}
      ref={dialogRef}
    >
      {active && activeIndex !== null ? (
        <>
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
            // Deslizar en horizontal cambia de foto; un segundo dedo (pellizco
            // para ampliar) cancela el gesto y deja el zoom nativo intacto.
            onPointerCancel={() => {
              swipeRef.current = null;
            }}
            onPointerDown={(event) => {
              if (event.pointerType === "mouse") return;
              swipeRef.current = swipeRef.current
                ? null
                : { x: event.clientX, y: event.clientY, id: event.pointerId };
            }}
            onPointerUp={(event) => {
              const start = swipeRef.current;
              swipeRef.current = null;
              if (!start || start.id !== event.pointerId) return;
              const dx = event.clientX - start.x;
              const dy = event.clientY - start.y;
              if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
              if (dx < 0 && activeIndex < items.length - 1) onNavigate(activeIndex + 1);
              if (dx > 0 && activeIndex > 0) onNavigate(activeIndex - 1);
            }}
          >
            <Image
              key={active.id}
              alt={active.alt ?? active.label}
              height={active.height}
              sizes="100dvw"
              src={active.src}
              style={{
                height: "auto",
                maxHeight:
                  "calc(100dvh - 9rem - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
                maxWidth:
                  "calc(100dvw - 2.5rem - env(safe-area-inset-left) - env(safe-area-inset-right))",
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
                <span aria-hidden="true" className="photo-viewer-arrow">←</span>
                {prevLabel}
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
                {nextLabel}
                <span aria-hidden="true" className="photo-viewer-arrow">→</span>
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </dialog>
  );
}
