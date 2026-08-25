"use client";

import { createContext, useContext } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { StaticAppPathname } from "@/i18n/routing";

const MobileNavCloseContext = createContext<(() => void) | null>(null);

export function MobileNavCloseProvider({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <MobileNavCloseContext.Provider value={onClose}>
      {children}
    </MobileNavCloseContext.Provider>
  );
}

type NavLinkProps = {
  href: StaticAppPathname;
  label: string;
  index?: string;
};

export function NavLink({ href, label, index }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const closeMobileNav = useContext(MobileNavCloseContext);

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      href={href}
      onClick={closeMobileNav ?? undefined}
    >
      {index ? <span aria-hidden="true">{index}</span> : null}
      {label}
    </Link>
  );
}
