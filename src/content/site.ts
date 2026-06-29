import type { Locale } from "@/app/[lang]/dictionaries";

// Fonte única de verdade do site. Tudo que vai pro SEO/metadata referencia
// esses valores — mude o domínio uma vez e todas as URLs canônicas, sitemap,
// JSON-LD e OG seguem juntas.

export const SITE = {
  /** Origin sem barra final. */
  baseUrl: "https://www.trcx.com.br",
  name: "TRCX Soluções",
  shortName: "TRCX",
  description: {
    pt: "Portfólio técnico de Wesley Xavier — engenharia de software, arquitetura de sistemas e soluções digitais sob medida da TRCX Soluções.",
    en: "Wesley Xavier's technical portfolio — software engineering, systems architecture, and tailor-made digital solutions from TRCX Soluções.",
  } satisfies Record<Locale, string>,
  keywords: [
    "Wesley Xavier",
    "TRCX Soluções",
    "trcx",
    "desenvolvedor de software",
    "engenharia de software",
    "Next.js",
    "Node.js",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "soluções digitais",
    "consultoria em tecnologia",
    "desenvolvimento web sob medida",
    "São Paulo",
  ],
  /** Imagem padrão para Open Graph / Twitter card. Idealmente 1200×630. */
  ogImage: {
    path: "/images/wesley-xavier/polo-sorrindo.webp",
    width: 670,
    height: 409,
    alt: "Wesley Xavier — TRCX Soluções",
  },
  author: {
    name: "Wesley Xavier",
    /** URL canônica que outras plataformas usam pra autoridade. */
    url: "https://www.trcx.com.br",
    image: "/images/wesley-xavier/terno-preto-busto.webp",
    jobTitle: {
      pt: "Analista de Tecnologia da Informação Pleno",
      en: "Senior IT Analyst",
    } satisfies Record<Locale, string>,
    worksFor: "Grupo Belfort",
    knowsAbout: [
      "Software Engineering",
      "Web Development",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
    ],
    sameAs: [
      "https://www.linkedin.com/in/trcx/",
      "https://github.com/wtrcx",
      "https://www.instagram.com/trcx.solucoes/",
      "https://www.instagram.com/w.trcx",
      "https://x.com/wesleytrcx",
      "https://t.me/wesleytrcx",
    ],
  },
  locales: ["pt", "en"] as const,
  defaultLocale: "pt" as Locale,
};

/** URL canônica absoluta para um caminho relativo já com locale. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Mapa de hreflang pra uma rota — Next aceita { [locale]: url } em `alternates.languages`. */
export function languageAlternates(
  path: string,
): Record<string, string> {
  // path deve começar com '/' sem locale (ex.: '/contato' ou '')
  const out: Record<string, string> = {};
  for (const l of SITE.locales) {
    out[l] = absoluteUrl(`/${l}${path}`);
  }
  // x-default aponta pro locale default
  out["x-default"] = absoluteUrl(`/${SITE.defaultLocale}${path}`);
  return out;
}
