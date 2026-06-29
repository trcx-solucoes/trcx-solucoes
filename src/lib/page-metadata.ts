import type { Metadata } from "next";
import { SITE, absoluteUrl, languageAlternates } from "@/content/site";
import type { Locale } from "@/app/[lang]/dictionaries";

const OG_LOCALE: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
};

/**
 * Constrói metadata canônica + alternates hreflang + OG/Twitter pra uma página.
 *
 * @param path  Caminho SEM o prefixo de locale, ex.: "" (home), "/contato", "/experiencia".
 */
export function pageMetadata({
  lang,
  path,
  title,
  description,
}: {
  lang: Locale;
  path: string;
  title?: string;
  description?: string;
}): Metadata {
  const fullPath = `/${lang}${path}`;
  const canonical = absoluteUrl(fullPath);
  const resolvedDescription = description ?? SITE.description[lang];

  return {
    title,
    description: resolvedDescription,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    // openGraph.images / twitter.images vêm da convenção opengraph-image.tsx
    // em app/[lang]/. Aqui só configuramos os demais campos.
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: title ?? SITE.name,
      description: resolvedDescription,
      url: canonical,
      locale: OG_LOCALE[lang],
      alternateLocale: SITE.locales
        .filter((l) => l !== lang)
        .map((l) => OG_LOCALE[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? SITE.name,
      description: resolvedDescription,
    },
  };
}
