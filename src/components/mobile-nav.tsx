"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import {
  easeOutEditorial,
  motionDuration,
} from "@/components/motion/motion-config";
import { useMountReveal } from "@/components/motion/use-mount-reveal";
import { MobileNavCloseProvider } from "@/components/nav-link";

function MobileNavLinks({
  ariaLabel,
  children,
  onNavigate,
}: {
  ariaLabel: string;
  children: ReactNode;
  onNavigate: () => void;
}) {
  const revealed = useMountReveal();

  return (
    <MobileNavCloseProvider onClose={onNavigate}>
      <nav
        aria-label={ariaLabel}
        className="mobile-nav-links"
        data-revealed={revealed}
        data-stagger=""
      >
        {children}
      </nav>
    </MobileNavCloseProvider>
  );
}

type MobileNavProps = {
  brand: string;
  summaryLabel: string;
  menuLabel: string;
  linksAriaLabel: string;
  links: ReactNode;
  localeSwitcher: ReactNode;
};

export function MobileNav({
  brand,
  summaryLabel,
  menuLabel,
  linksAriaLabel,
  links,
  localeSwitcher,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const offset = prefersReducedMotion ? 0 : -8;

  return (
    <div className="mobile-nav">
      <button
        aria-controls="mobile-nav-panel"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        ref={triggerRef}
        type="button"
      >
        {summaryLabel}
      </button>

      <AnimatePresence>
        {isOpen ? (
          <m.div
            animate={{ opacity: 1, y: 0 }}
            className="mobile-nav-panel"
            exit={{
              opacity: 0,
              y: offset,
              transition: {
                duration: prefersReducedMotion ? 0 : motionDuration.fast,
              },
            }}
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: offset }}
            transition={{
              duration: prefersReducedMotion
                ? 0
                : motionDuration.interface,
              ease: easeOutEditorial,
            }}
          >
            <div className="mobile-nav-panel-header">
              <span>{brand}</span>
              <span>{menuLabel}</span>
            </div>
            {/* Navegar cierra el panel: los enlaces viven dentro de este bloque. */}
            <MobileNavLinks
              ariaLabel={linksAriaLabel}
              onNavigate={() => setIsOpen(false)}
            >
              {links}
            </MobileNavLinks>
            {localeSwitcher}
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
