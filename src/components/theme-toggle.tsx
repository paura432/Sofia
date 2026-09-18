"use client";

import { useState } from "react";

type Theme = "dark" | "light";

type ThemeToggleProps = {
  darkLabel: string;
  lightLabel: string;
};

export function ThemeToggle({ darkLabel, lightLabel }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== "undefined" && document.documentElement.dataset.theme === "light"
      ? "light"
      : "dark",
  );

  const next = theme === "dark" ? "light" : "dark";
  const label = next === "light" ? lightLabel : darkLabel;

  return (
    <button
      aria-label={label}
      className="theme-toggle"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        localStorage.setItem("sofia-theme", next);
        setTheme(next);
      }}
      type="button"
    >
      <span aria-hidden="true" suppressHydrationWarning>{theme === "dark" ? "☾" : "☼"}</span>
    </button>
  );
}
