import type { MetadataRoute } from "next";
import { SITE, absoluteUrl, languageAlternates } from "@/content/site";

// Sitemap.xml gerado dinamicamente. Cobre todas as rotas em ambos os locales
// com hreflang alternates pra cada uma.
//
// Doc: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/metadata/sitemap.md

const PATHS = ["", "/experiencia", "/formacao", "/projetos", "/contato"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    for (const lang of SITE.locales) {
      entries.push({
        url: absoluteUrl(`/${lang}${path}`),
        lastModified,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }

  return entries;
}
