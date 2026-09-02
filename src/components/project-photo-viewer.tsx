"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import {
  PhotoViewerDialog,
  type PhotoViewerItem,
} from "@/components/photo-viewer-dialog";

type ProjectPhotoViewerContextValue = {
  open: (id: string) => void;
};

const ProjectPhotoViewerContext =
  createContext<ProjectPhotoViewerContextValue | null>(null);

type ProjectPhotoViewerProps = {
  children: ReactNode;
  closeLabel: string;
  items: PhotoViewerItem[];
  nextLabel: string;
  prevLabel: string;
};

export function ProjectPhotoViewer({
  children,
  closeLabel,
  items,
  nextLabel,
  prevLabel,
}: ProjectPhotoViewerProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const value = useMemo(
    () => ({
      open: (id: string) => {
        const index = items.findIndex((item) => item.id === id);
        if (index >= 0) setActiveIndex(index);
      },
    }),
    [items],
  );

  if (items.length === 0) {
    return children;
  }

  return (
    <ProjectPhotoViewerContext.Provider value={value}>
      {children}
      <PhotoViewerDialog
        activeIndex={activeIndex}
        closeLabel={closeLabel}
        items={items}
        nextLabel={nextLabel}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
        prevLabel={prevLabel}
      />
    </ProjectPhotoViewerContext.Provider>
  );
}

export function useProjectPhotoOpen(id: string) {
  const ctx = useContext(ProjectPhotoViewerContext);
  if (!ctx) return undefined;
  return () => ctx.open(id);
}
