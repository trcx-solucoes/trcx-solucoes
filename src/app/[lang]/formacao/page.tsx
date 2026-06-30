import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Award, BookOpen, GraduationCap } from "lucide-react";
import { Timeline, type TimelineItem } from "@/components/cv/timeline";
import { CourseList } from "@/components/cv/course-list";
import { CertList } from "@/components/cv/cert-list";
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
    path: "/formacao",
    title: dict.education.title,
    description: dict.education.description,
  });
}

export default async function EducationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const cv = getCv();

  const schoolItems: TimelineItem[] = cv.education.map((e) => ({
    title: e.degree || e.school,
    subtitle: e.degree ? e.school : undefined,
    range: e.range,
    description: e.notes || e.activities || undefined,
  }));

  return (
    <div
      data-accent={ROUTE_ACCENT.formacao}
      className="flex flex-col gap-12"
    >
      <BreadcrumbSchema
        lang={lang}
        steps={[
          { label: dict.nav.home, path: "" },
          { label: dict.education.title, path: "/formacao" },
        ]}
      />
      <header className="reveal-on-scroll flex items-start gap-4">
        <div className="rounded-xl bg-primary/10 text-primary p-3 ring-1 ring-primary/20">
          <GraduationCap className="size-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            {dict.education.title}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            {lang === "pt"
              ? "Formação, certificações e aprendizado contínuo."
              : "Degrees, certifications and continuous learning."}
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
            {dict.education.description}
          </p>
        </div>
      </header>

      <section className="reveal-on-scroll flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary inline-flex items-center gap-2">
            <GraduationCap className="size-4" />
            {dict.education.sections.schools}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
        </div>
        {schoolItems.length > 0 ? (
          <Timeline
            items={schoolItems}
            locale={lang}
            presentLabel={dict.experience.current}
            icon={GraduationCap}
          />
        ) : (
          <p className="text-sm text-muted-foreground italic">
            {dict.education.empty.schools}
          </p>
        )}
      </section>

      <section className="reveal-on-scroll flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary inline-flex items-center gap-2">
            <Award className="size-4" />
            {dict.education.sections.certifications}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
        </div>
        {cv.certifications.length > 0 ? (
          <CertList certifications={cv.certifications} locale={lang} />
        ) : (
          <p className="text-sm text-muted-foreground italic">
            {dict.education.empty.certifications}
          </p>
        )}
      </section>

      <section className="reveal-on-scroll flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary inline-flex items-center gap-2">
            <BookOpen className="size-4" />
            {dict.education.sections.courses}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
        </div>
        {cv.courses.length > 0 ? (
          <CourseList courses={cv.courses} locale={lang} />
        ) : (
          <p className="text-sm text-muted-foreground italic">
            {dict.education.empty.courses}
          </p>
        )}
      </section>
    </div>
  );
}

