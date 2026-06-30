"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/app/[lang]/dictionaries";

type Item = {
  href: string;
  label: string;
  direction: "nav-forward" | "nav-back";
};

export function MobileMenu({
  items,
  lang,
  switchLabel,
  className,
}: {
  items: Item[];
  lang: Locale;
  switchLabel: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() ?? `/${lang}`;
  const target: Locale = lang === "pt" ? "en" : "pt";
  const swappedLocale = pathname.replace(/^\/(pt|en)(?=\/|$)/, `/${target}`);

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const overlay = open && mounted ? (
    // Renderizado em document.body — escapa o stacking context do header sticky.
    createPortal(
      <>
        <div
          className="fixed inset-0 z-[1000] bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        />
        <nav
          className="fixed inset-x-0 top-0 z-[1001] bg-background border-b shadow-lg flex flex-col p-5 gap-1 animate-in slide-in-from-top-4 fade-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end mb-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="size-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
              aria-label="Fechar menu"
            >
              <X className="size-5" />
            </button>
          </div>
          {items.map((i, idx) => (
            <Link
              key={i.href}
              href={i.href}
              transitionTypes={[i.direction]}
              className="px-4 py-3.5 text-lg font-medium rounded-xl hover:bg-muted hover:text-primary transition-colors animate-in slide-in-from-right-4 fade-in"
              style={{ animationDelay: `${idx * 40}ms`, animationFillMode: "both" }}
            >
              {i.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t">
            <Link
              href={swappedLocale}
              className="px-4 py-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="inline-block size-1.5 rounded-full bg-primary" />
              {switchLabel}
            </Link>
          </div>
        </nav>
      </>,
      document.body,
    )
  ) : null;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="size-10 flex items-center justify-center rounded-lg hover:bg-background/10 transition-colors"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
      >
        <Menu className="size-5" />
      </button>
      {overlay}
    </div>
  );
}
