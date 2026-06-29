import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe, Mail, MessageCircle } from "lucide-react";
import { brand } from "@/content/brand";
import { getContactChannels, type ContactChannelKey } from "@/content/contact";
import type { Locale } from "@/app/[lang]/dictionaries";
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

export function SiteFooter({ lang }: { lang: Locale }) {
  const channels = getContactChannels(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t mt-20 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(135deg,var(--primary-100),var(--primary-200))]"
      />
      <div className="relative mx-auto max-w-5xl px-6 py-10 grid gap-8 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Image
            src={brand.logo.horizontal}
            alt={brand.name}
            width={1275}
            height={360}
            className="h-8 w-auto"
          />
          <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
            {brand.tagline[lang as "pt" | "en"]}
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
            {lang === "pt" ? "Navegar" : "Navigate"}
          </p>
          {[
            { href: `/${lang}/experiencia`, label: lang === "pt" ? "Experiência" : "Experience" },
            { href: `/${lang}/formacao`, label: lang === "pt" ? "Formação" : "Education" },
            { href: `/${lang}/projetos`, label: lang === "pt" ? "Projetos" : "Projects" },
            { href: `/${lang}/contato`, label: lang === "pt" ? "Contato" : "Contact" },
          ].map((i) => (
            <Link
              key={i.href}
              href={i.href}
              transitionTypes={["nav-forward"]}
              className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 w-fit"
            >
              {i.label}
              <ArrowUpRight className="size-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100" />
            </Link>
          ))}
        </nav>

        {channels.length > 0 && (
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
              {lang === "pt" ? "Em outros lugares" : "Elsewhere"}
            </p>
            {channels.map((ch) => {
              const Icon = ICONS[ch.key];
              const isExternal = !ch.href.startsWith("mailto:");
              return (
                <a
                  key={ch.href}
                  href={ch.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 w-fit"
                >
                  <Icon className="size-4" />
                  <span className="truncate max-w-[180px]">{ch.label}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>

      <div className="relative border-t">
        <div className="mx-auto max-w-5xl px-6 py-4 text-xs text-muted-foreground flex justify-between items-center">
          <span>© {year} Wesley Xavier · TRCX Soluções</span>
          <span className="font-mono opacity-60">
            {lang === "pt" ? "Construído com Next.js" : "Built with Next.js"}
          </span>
        </div>
      </div>
    </footer>
  );
}
