"use client";

import { useEffect, useId, useRef, useState } from "react";

import { NavLink, useMobileNavClose } from "@/components/nav-link";
import { Link, usePathname } from "@/i18n/navigation";
import type { StaticAppPathname } from "@/i18n/routing";

export type WorkStoryLink = {
  slug: string;
  title: string;
};

export type WorkNavCopy = {
  work: string;
  indexLabel: string;
  storiesLabel: string;
  allWork: string;
  photography: string;
  trajectory: string;
  viewAll: string;
};

type WorkNavProps = {
  copy: WorkNavCopy;
  stories: WorkStoryLink[];
  variant: "desktop" | "mobile";
};

export function WorkNav({ copy, stories, variant }: WorkNavProps) {
  const pathname = usePathname();
  const closeMobile = useMobileNavClose();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const workActive =
    pathname === "/work" || pathname.startsWith("/work/");

  useEffect(() => {
    if (!open || variant !== "desktop") {
      return;
    }

    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, variant]);

  const indexLinks: Array<{ href: StaticAppPathname; label: string }> = [
    { href: "/work", label: copy.allWork },
    { href: "/work", label: copy.photography },
    { href: "/experience", label: copy.trajectory },
  ];

  if (variant === "mobile") {
    return (
      <details className="work-nav-mobile">
        <summary>
          <span aria-hidden="true">01</span>
          {copy.work}
        </summary>
        <div className="work-nav-mobile-panel">
          {indexLinks.map((item) => (
            <NavLink href={item.href} key={item.label} label={item.label} />
          ))}
          {stories.map((story) => (
            <Link
              href={{
                pathname: "/work/[slug]",
                params: { slug: story.slug },
              }}
              key={story.slug}
              onClick={closeMobile ?? undefined}
            >
              {story.title}
            </Link>
          ))}
        </div>
      </details>
    );
  }

  return (
    <div
      className="work-nav"
      data-open={open ? "true" : undefined}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      ref={rootRef}
    >
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-haspopup="true"
        className="work-nav-trigger"
        data-active={workActive ? "true" : undefined}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {copy.work}
      </button>
      <div
        className="work-nav-panel"
        hidden={!open}
        id={panelId}
        inert={!open}
      >
        <div>
          <p className="work-nav-heading">{copy.indexLabel}</p>
          <ul>
            {indexLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} onClick={close}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="work-nav-heading">{copy.storiesLabel}</p>
          <ul>
            {stories.map((story) => (
              <li key={story.slug}>
                <Link
                  href={{
                    pathname: "/work/[slug]",
                    params: { slug: story.slug },
                  }}
                  onClick={close}
                >
                  {story.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/work" onClick={close}>
                {copy.viewAll}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
