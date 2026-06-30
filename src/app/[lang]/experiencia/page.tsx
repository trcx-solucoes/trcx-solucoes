import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Briefcase } from "lucide-react";
import { Timeline, type TimelineItem } from "@/components/cv/timeline";
import { BreadcrumbSchema } from "@/components/seo/structured-data";
import { getCv } from "@/content/cv";
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
    path: "/experiencia",
    title: dict.experience.title,
    description: dict.experience.description,
  });
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { positions } = getCv();

  const items: TimelineItem[] = positions.map((p) => ({
    title: p.title,
    subtitle: [p.company, p.location].filter(Boolean).join(" · "),
    range: p.range,
    description: p.description || undefined,
  }));

  return (
    <div
      data-accent={ROUTE_ACCENT.experiencia}
      className="flex flex-col gap-8"
    >
      <BreadcrumbSchema
        lang={lang}
        steps={[
          { label: dict.nav.home, path: "" },
          { label: dict.experience.title, path: "/experiencia" },
        ]}
      />
      <header className="reveal-on-scroll flex items-start gap-4">
        <div className="rounded-xl bg-primary/10 text-primary p-3 ring-1 ring-primary/20">
          <Briefcase className="size-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            {dict.experience.title}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            {lang === "pt"
              ? "Trajetória profissional."
              : "Professional trajectory."}
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
            {dict.experience.description}
          </p>
        </div>
      </header>
      <div className="reveal-on-scroll">
        <Timeline
          items={items}
          locale={lang}
          presentLabel={dict.experience.current}
          icon={Briefcase}
        />
      </div>
    </div>
  );
}

