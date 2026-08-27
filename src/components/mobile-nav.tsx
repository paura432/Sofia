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
  closeLabel: string;
  linksAriaLabel: string;
  links: ReactNode;
  localeSwitcher: ReactNode;
};

export function MobileNav({
  brand,
  summaryLabel,
  menuLabel,
  closeLabel,
  linksAriaLabel,
  links,
  localeSwitcher,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    const brand = document.querySelector(".site-header .brand");
    const desktopNav = document.querySelector(".desktop-nav");

    if (isOpen) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      brand?.setAttribute("inert", "");
      desktopNav?.setAttribute("inert", "");
      document.body.style.overflow = "hidden";
    } else {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      brand?.removeAttribute("inert");
      desktopNav?.removeAttribute("inert");
      document.body.style.overflow = "";
    }

    return () => {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      brand?.removeAttribute("inert");
      desktopNav?.removeAttribute("inert");
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const focusable = panel.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

      if (event.shiftKey && event.target === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && event.target === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    panel.addEventListener("keydown", trapFocus);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      panel.removeEventListener("keydown", trapFocus);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const offset = prefersReducedMotion ? 0 : -8;

  return (
    <div className="mobile-nav">
      <button
        aria-controls="mobile-nav-panel"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={isOpen ? closeLabel : summaryLabel}
        onClick={() => setIsOpen((open) => !open)}
        ref={triggerRef}
        type="button"
      >
        {summaryLabel}
      </button>

      <AnimatePresence>
        {isOpen ? (
          <>
            <button
              aria-label={closeLabel}
              className="mobile-nav-backdrop"
              onClick={close}
              tabIndex={-1}
              type="button"
            />
            <m.div
              animate={{ opacity: 1, y: 0 }}
              aria-labelledby="mobile-nav-panel-title"
              aria-modal="true"
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
              ref={panelRef}
              role="dialog"
              transition={{
                duration: prefersReducedMotion
                  ? 0
                  : motionDuration.interface,
                ease: easeOutEditorial,
              }}
            >
              <div className="mobile-nav-panel-header">
                <span id="mobile-nav-panel-title">{brand}</span>
                <span>{menuLabel}</span>
              </div>
              <MobileNavLinks
                ariaLabel={linksAriaLabel}
                onNavigate={close}
              >
                {links}
              </MobileNavLinks>
              {localeSwitcher}
            </m.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
