import Link from "next/link";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { brand } from "@/content/brand";
import { Logo } from "./logo";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

// Hierarquia da navegação: o "home" funciona como nível 0 (back), o resto
// como nível 1+ (forward). View Transitions usam essa info pra direcionar o
// slide. Browser back/forward continua sem direção declarada (ok — não anima).
type NavItem = {
  href: string;
  label: string;
  direction: "nav-forward" | "nav-back";
};

export function SiteHeader({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const items: NavItem[] = [
    { href: `/${lang}`, label: dict.nav.home, direction: "nav-back" },
    { href: `/${lang}/experiencia`, label: dict.nav.experience, direction: "nav-forward" },
    { href: `/${lang}/formacao`, label: dict.nav.education, direction: "nav-forward" },
    { href: `/${lang}/projetos`, label: dict.nav.projects, direction: "nav-forward" },
    { href: `/${lang}/contato`, label: dict.nav.contact, direction: "nav-forward" },
  ];

  return (
    <header
      className="bg-foreground text-background sticky top-0 z-50"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        <Link
          href={`/${lang}`}
          className="flex items-center group"
          transitionTypes={["nav-back"]}
          aria-label={brand.name}
        >
          <Logo
            variant="horizontalNegative"
            height={28}
            priority
            className="transition-transform group-hover:scale-105"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {items.slice(1).map((i) => (
            <Link
              key={i.href}
              href={i.href}
              transitionTypes={[i.direction]}
              className="text-background/70 hover:text-background transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-background after:transition-all hover:after:w-full"
            >
              {i.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-background/20" aria-hidden />
          <LocaleSwitcher current={lang} label={dict.locale.switchTo} />
          <ThemeToggle />
        </nav>
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <MobileMenu
            items={items}
            lang={lang}
            switchLabel={dict.locale.switchTo}
          />
        </div>
      </div>
    </header>
  );
}
