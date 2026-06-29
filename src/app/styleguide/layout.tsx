"use client";

import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation } from "./navigation";
import { ThemeToggle } from "./components/theme-toggle";
import { ThemeSelector } from "./components/theme-selector";

const STYLEGUIDE_ENABLED =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_ENABLE_STYLEGUIDE === "true";

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!STYLEGUIDE_ENABLED) {
    notFound();
  }

  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-card p-6 flex flex-col gap-6 fixed top-0 left-0 h-screen overflow-y-auto">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <Link href="/styleguide" className="text-xl font-bold leading-tight">
              Template Inicial
            </Link>
            <ThemeToggle />
          </div>
          <p className="text-xs text-muted-foreground leading-snug">
            Ponto de partida com tokens, temas e componentes shadcn/ui prontos
            para novos projetos.
          </p>
        </div>

        <ThemeSelector />

        <nav className="flex flex-col gap-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-1">
                {section.items.length === 0 ? (
                  <li className="px-3 py-2 text-xs text-muted-foreground italic">
                    Nenhum ainda
                  </li>
                ) : (
                  section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-3 py-2 rounded-md text-sm transition-colors",
                          pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 ml-64 overflow-auto">{children}</main>
    </div>
  );
}
