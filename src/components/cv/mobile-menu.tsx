"use client";

import { useEffect, useState } from "react";
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
  const pathname = usePathname() ?? `/${lang}`;
  const target: Locale = lang === "pt" ? "en" : "pt";
  const swappedLocale = pathname.replace(/^\/(pt|en)(?=\/|$)/, `/${target}`);

  // Fecha ao mudar de rota
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll quando aberto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="size-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 top-[57px] bg-background/95 backdrop-blur-sm z-40 animate-in fade-in duration-200"
            onClick={() => setOpen(false)}
          />
          <nav
            className="fixed inset-x-0 top-[57px] bottom-0 z-50 flex flex-col p-6 gap-1 animate-in slide-in-from-top-4 fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {items.map((i, idx) => (
              <Link
                key={i.href}
                href={i.href}
                transitionTypes={[i.direction]}
                className="px-4 py-4 text-lg font-medium rounded-xl hover:bg-muted hover:text-primary transition-colors animate-in slide-in-from-right-4 fade-in"
                style={{ animationDelay: `${idx * 40}ms`, animationFillMode: "both" }}
              >
                {i.label}
              </Link>
            ))}
            <div className="mt-auto pt-6 border-t">
              <Link
                href={swappedLocale}
                className="px-4 py-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="inline-block size-1.5 rounded-full bg-primary" />
                {switchLabel}
              </Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
