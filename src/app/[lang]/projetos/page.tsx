import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink, Layers, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo/structured-data";
import { getCv } from "@/content/cv";
import { formatRange } from "@/lib/cv-format";
import { pageMetadata } from "@/lib/page-metadata";
import { ROUTE_ACCENT } from "@/lib/route-accent";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/projetos",
    title: dict.projects.title,
    description: dict.projects.description,
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { projects } = getCv();

  return (
    <div
      data-accent={ROUTE_ACCENT.projetos}
      className="flex flex-col gap-8"
    >
      <BreadcrumbSchema
        lang={lang}
        steps={[
          { label: dict.nav.home, path: "" },
          { label: dict.projects.title, path: "/projetos" },
        ]}
      />
      <header className="reveal-on-scroll flex items-start gap-4">
        <div className="relative size-16 sm:size-20 rounded-2xl overflow-hidden ring-2 ring-primary/30 shrink-0">
          <Image
            src="/images/wesley-xavier/polo-sq.webp"
            alt="Wesley Xavier"
            fill
            sizes="80px"
            className="object-cover"
          />
          <div className="absolute bottom-1 right-1 size-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center ring-2 ring-background">
            <Layers className="size-3.5" />
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            {dict.projects.title}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            {lang === "pt" ? "Coisas que construí." : "Things I've built."}
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
            {dict.projects.description}
          </p>
        </div>
      </header>

      {projects.length === 0 ? (
        <div className="reveal-on-scroll rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex flex-col items-center gap-3 text-center">
          <Sparkles className="size-8 text-primary" />
          <p className="text-sm text-muted-foreground max-w-md">
            {lang === "pt"
              ? "Em breve — esta seção será preenchida manualmente, já que o LinkedIn não exporta projetos."
              : "Coming soon — this section will be populated manually, since LinkedIn does not export projects."}
          </p>
        </div>
      ) : (
        <ul className="reveal-on-scroll grid gap-4 sm:grid-cols-2">
          {projects.map((p, idx) => (
            <li key={`${p.title}-${idx}`}>
              <Card className="h-full hover:ring-primary/30 transition-all group/proj">
                <CardHeader>
                  <p className="text-xs text-primary font-semibold uppercase tracking-wide">
                    {formatRange(p.range, lang, dict.experience.current)}
                  </p>
                  <CardTitle className="text-base">
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors inline-flex items-start gap-1.5"
                      >
                        <span>{p.title}</span>
                        <ExternalLink className="size-3.5 mt-0.5 opacity-50 group-hover/proj:opacity-100 transition-opacity shrink-0" />
                      </a>
                    ) : (
                      p.title
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-line text-muted-foreground">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

