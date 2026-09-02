"use client";

import { useEffect, useState } from "react";

import { Link, usePathname } from "@/i18n/navigation";

export type WorkRailStory = {
  slug: string;
  label: string;
};

type WorkRailProps = {
  archiveLabel: string;
  backLabel: string;
  nextLabel: string;
  prevLabel: string;
  stories: WorkRailStory[];
  workLabel: string;
};

export function WorkRail({
  archiveLabel,
  backLabel,
  nextLabel,
  prevLabel,
  stories,
  workLabel,
}: WorkRailProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const slug = pathname.startsWith("/work/")
    ? pathname.slice("/work/".length)
    : undefined;
  const index = slug
    ? stories.findIndex((story) => story.slug === slug)
    : -1;
  const prev = index > -1 ? stories[(index - 1 + stories.length) % stories.length] : undefined;
  const next = index > -1 ? stories[(index + 1) % stories.length] : undefined;

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  return (
    <nav aria-label={workLabel} className="work-rail">
      <div className="work-rail-inner">
        <Link className="work-rail-back" href="/work">
          <span aria-hidden="true">← </span>
          {backLabel}
        </Link>

        <div className="work-rail-stories">
          {stories.map((story) => (
            <Link
              aria-current={slug === story.slug ? "page" : undefined}
              href={{ pathname: "/work/[slug]", params: { slug: story.slug } }}
              key={story.slug}
            >
              {story.label}
            </Link>
          ))}
          <Link
            aria-current={pathname === "/work" && hash === "#archivo" ? "location" : undefined}
            href={{ pathname: "/work", hash: "archivo" }}
          >
            {archiveLabel}
          </Link>
        </div>

        {slug && prev && next ? (
          <p className="work-rail-pager">
            <Link
              aria-label={prevLabel}
              href={{ pathname: "/work/[slug]", params: { slug: prev.slug } }}
            >
              ←
            </Link>
            <span>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(stories.length).padStart(2, "0")}
            </span>
            <Link
              aria-label={nextLabel}
              href={{ pathname: "/work/[slug]", params: { slug: next.slug } }}
            >
              →
            </Link>
          </p>
        ) : null}
      </div>
    </nav>
  );
}
