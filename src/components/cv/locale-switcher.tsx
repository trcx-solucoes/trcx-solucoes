"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/app/[lang]/dictionaries";

export function LocaleSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const pathname = usePathname() ?? `/${current}`;
  const target: Locale = current === "pt" ? "en" : "pt";
  const swapped = pathname.replace(/^\/(pt|en)(?=\/|$)/, `/${target}`);

  return (
    <Link
      href={swapped}
      className="text-sm text-[var(--header-fg)]/70 hover:text-[var(--header-fg)] transition-colors"
      aria-label={`Switch language to ${label}`}
    >
      {label}
    </Link>
  );
}
