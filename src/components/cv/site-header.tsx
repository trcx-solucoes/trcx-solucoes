import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { brand } from "@/content/brand";
import { LocaleSwitcher } from "./locale-switcher";

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
      className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between gap-6">
        <Link
          href={`/${lang}`}
          className="flex items-center group"
          transitionTypes={["nav-back"]}
          aria-label={brand.name}
        >
          <Image
            src={brand.logo.horizontal}
            alt={brand.name}
            width={1275}
            height={360}
            priority
            className="h-7 w-auto transition-transform group-hover:scale-105"
          />
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          {items.slice(1).map((i) => (
            <Link
              key={i.href}
              href={i.href}
              transitionTypes={[i.direction]}
              className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {i.label}
            </Link>
          ))}
          <LocaleSwitcher current={lang} label={dict.locale.switchTo} />
        </nav>
      </div>
    </header>
  );
}
