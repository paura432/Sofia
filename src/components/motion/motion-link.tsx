import type { ComponentProps, ReactNode } from "react";

import { Link } from "@/i18n/navigation";

type MotionLinkProps = {
  children: ReactNode;
  className?: string;
  newTabHint?: string;
} & (
  | { href: ComponentProps<typeof Link>["href"]; external?: false }
  | { href: string; external: true }
);

/**
 * Link editorial con subrayado y flecha. El hover vive en CSS (`.text-link`,
 * `.arrow-link`), así que no necesita JavaScript ni cambia de tamaño.
 */
export function MotionLink({
  children,
  className,
  newTabHint,
  ...link
}: MotionLinkProps) {
  const classNames = ["text-link", "arrow-link", className]
    .filter(Boolean)
    .join(" ");
  const suffix = (
    <>
      {" "}
      <span aria-hidden="true">↗</span>
      {newTabHint ? <span className="sr-only">{newTabHint}</span> : null}
    </>
  );

  if (link.external) {
    return (
      <a
        className={classNames}
        href={link.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
        {suffix}
      </a>
    );
  }

  return (
    <Link className={classNames} href={link.href}>
      {children}
      <span aria-hidden="true"> ↗</span>
    </Link>
  );
}
