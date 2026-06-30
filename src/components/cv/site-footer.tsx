import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { brand } from "@/content/brand";
import {
  getContactChannels,
  type ContactChannel,
  type ContactChannelKey,
} from "@/content/contact";
import type { Locale } from "@/app/[lang]/dictionaries";
import { Logo } from "./logo";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  XIcon,
  YoutubeIcon,
} from "./brand-icons";

type IconCmp = React.ComponentType<React.ComponentProps<"svg">>;

const ICONS: Record<ContactChannelKey, IconCmp> = {
  email: Mail,
  whatsapp: MessageCircle,
  telegram: TelegramIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  instagram: InstagramIcon,
  x: XIcon,
  youtube: YoutubeIcon,
  website: Globe,
};

const DIRECT_KEYS = new Set<ContactChannelKey>(["email", "whatsapp", "telegram"]);

function isExternal(href: string) {
  return !href.startsWith("mailto:");
}

function ChannelLink({ ch }: { ch: ContactChannel }) {
  const Icon = ICONS[ch.key];
  const external = isExternal(ch.href);
  return (
    <a
      href={ch.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group/ft-ch inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
    >
      <Icon className="size-4 shrink-0" />
      <span className="truncate max-w-[200px]">{ch.label}</span>
    </a>
  );
}

export function SiteFooter({ lang }: { lang: Locale }) {
  const channels = getContactChannels(lang);
  const direct = channels.filter((c) => DIRECT_KEYS.has(c.key));
  const social = channels.filter((c) => !DIRECT_KEYS.has(c.key));
  const year = new Date().getFullYear();

  const navLinks = [
    {
      href: `/${lang}/experiencia`,
      label: lang === "pt" ? "Experiência" : "Experience",
    },
    {
      href: `/${lang}/formacao`,
      label: lang === "pt" ? "Formação" : "Education",
    },
    {
      href: `/${lang}/projetos`,
      label: lang === "pt" ? "Projetos" : "Projects",
    },
    {
      href: `/${lang}/contato`,
      label: lang === "pt" ? "Contato" : "Contact",
    },
  ];

  const cta = {
    eyebrow: lang === "pt" ? "Vamos colaborar" : "Let's collaborate",
    heading:
      lang === "pt"
        ? "Pronto pra construir algo juntos?"
        : "Ready to build something together?",
    sub:
      lang === "pt"
        ? "Resposta em até 24h."
        : "Reply within 24h.",
    primary:
      lang === "pt" ? "Iniciar conversa" : "Start the conversation",
  };

  return (
    <footer className="mt-24">
      {/* CTA banner */}
      <section className="border-t bg-foreground text-background relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_30%_30%,var(--primary)_0%,transparent_60%)]"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 text-background/70">
              <Sparkles className="size-3.5" />
              {cta.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              {cta.heading}
            </h2>
            <p className="text-sm text-background/70">{cta.sub}</p>
          </div>
          <Link
            href={`/${lang}/contato`}
            transitionTypes={["nav-forward"]}
            className="group/cta inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-background text-foreground font-medium hover:bg-background/90 transition-colors w-full sm:w-auto"
          >
            {cta.primary}
            <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* Main footer grid */}
      <div className="border-t">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12 grid gap-10 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-3 items-start">
            <Logo
              variant="horizontal"
              darkVariant="horizontalNegative"
              height={32}
            />
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {brand.tagline[lang as "pt" | "en"]}
            </p>
          </div>

          <nav className="flex flex-col gap-2.5 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
              {lang === "pt" ? "Navegar" : "Navigate"}
            </p>
            {navLinks.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                transitionTypes={["nav-forward"]}
                className="group/ft-nav inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                <span>{i.label}</span>
                <ArrowUpRight className="size-3 opacity-0 -translate-x-1 transition-all group-hover/ft-nav:opacity-100 group-hover/ft-nav:translate-x-0" />
              </Link>
            ))}
          </nav>

          {direct.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                {lang === "pt" ? "Direto" : "Direct"}
              </p>
              {direct.map((ch) => (
                <ChannelLink key={ch.href} ch={ch} />
              ))}
            </div>
          )}

          {social.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                {lang === "pt" ? "Em outros lugares" : "Elsewhere"}
              </p>
              {social.map((ch) => (
                <ChannelLink key={ch.href} ch={ch} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center sm:justify-between">
          <span>© {year} Wesley Xavier · TRCX Soluções</span>
          <span className="font-mono opacity-60">
            {lang === "pt" ? "Construído com Next.js" : "Built with Next.js"}
          </span>
        </div>
      </div>
    </footer>
  );
}
