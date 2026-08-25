"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
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
