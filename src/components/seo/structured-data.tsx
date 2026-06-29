import { SITE, absoluteUrl } from "@/content/site";
import { getCv } from "@/content/cv";
import { getContactChannels } from "@/content/contact";
import type { Locale } from "@/app/[lang]/dictionaries";

// Schema.org JSON-LD pra ajudar buscadores a entender quem é o autor, o que
// é o site e a estrutura de navegação. Server-only (não usa hooks/estado).
//
// Refs:
//   https://schema.org/Person
//   https://schema.org/WebSite
//   https://schema.org/ProfessionalService
//   https://schema.org/BreadcrumbList

function Ld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // O JSON é gerado server-side; objetos vão sempre sem caracteres perigosos
      // de injection, mas escapamos < / > pra ser explícito.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function PersonSchema({ lang }: { lang: Locale }) {
  const { profile } = getCv();
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();

  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${SITE.baseUrl}/#person`,
        name: fullName,
        url: SITE.baseUrl,
        image: absoluteUrl(SITE.author.image),
        jobTitle: SITE.author.jobTitle[lang],
        worksFor: {
          "@type": "Organization",
          name: SITE.author.worksFor,
        },
        knowsAbout: SITE.author.knowsAbout,
        sameAs: SITE.author.sameAs,
        address: profile.location
          ? {
              "@type": "PostalAddress",
              addressLocality: profile.location,
              addressCountry: "BR",
            }
          : undefined,
      }}
    />
  );
}

export function ProfessionalServiceSchema({ lang }: { lang: Locale }) {
  const channels = getContactChannels(lang);
  const email = channels
    .find((c) => c.key === "email")
    ?.href.replace(/^mailto:/, "");

  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${SITE.baseUrl}/#organization`,
        name: SITE.name,
        url: SITE.baseUrl,
        logo: absoluteUrl("/images/horizontal-logo.webp"),
        image: absoluteUrl(SITE.ogImage.path),
        description: SITE.description[lang],
        email,
        areaServed: "BR",
        founder: { "@id": `${SITE.baseUrl}/#person` },
        sameAs: SITE.author.sameAs,
      }}
    />
  );
}

export function WebSiteSchema({ lang }: { lang: Locale }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE.baseUrl}/#website`,
        url: SITE.baseUrl,
        name: SITE.name,
        description: SITE.description[lang],
        inLanguage: lang === "pt" ? "pt-BR" : "en-US",
        publisher: { "@id": `${SITE.baseUrl}/#organization` },
      }}
    />
  );
}

export type BreadcrumbStep = { label: string; path: string };

export function BreadcrumbSchema({
  lang,
  steps,
}: {
  lang: Locale;
  steps: BreadcrumbStep[];
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: steps.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.label,
          item: absoluteUrl(`/${lang}${s.path}`),
        })),
      }}
    />
  );
}
