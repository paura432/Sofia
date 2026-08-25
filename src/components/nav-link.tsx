"use client";

import { Link, usePathname } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";

type NavLinkProps = {
  href: AppPathname;
  label: string;
  index?: string;
};

export function NavLink({ href, label, index }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} aria-current={isActive ? "page" : undefined}>
      {index ? <span aria-hidden="true">{index}</span> : null}
      {label}
    </Link>
  );
}
