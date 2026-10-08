"use client";

import { useState } from "react";

type CopyEmailProps = {
  email: string;
  label: string;
  copiedLabel: string;
};

export function CopyEmail({ email, label, copiedLabel }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className="copy-email"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          // Sin permiso de portapapeles el email sigue visible y enlazado.
        }
      }}
      type="button"
    >
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
