import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  Boxes,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Briefcase,
  HandshakeIcon,
  Languages,
  Layers,
  MonitorSmartphone,
  Rocket,
  Server,
  Sparkles,
  UserRound,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCv } from "@/content/cv";
import { brand } from "@/content/brand";
import {
  CATEGORY_LABEL,
  type SkillCategory,
  groupSkills,
  isTechnical,
} from "@/lib/skills";
import { getDictionary, hasLocale } from "./dictionaries";

const CATEGORY_ICON: Record<SkillCategory, typeof Cloud> = {
  cloud: Cloud,
  backend: Server,
  frontend: MonitorSmartphone,
  database: Database,
  devops: Wrench,
  language: Languages,
  other: Boxes,
};

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const cv = getCv();
  const { profile } = cv;
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();

  const startYears = cv.positions
    .map((p) => p.range.start.year)
    .filter((y) => y > 0);
  const earliest = startYears.length > 0 ? Math.min(...startYears) : 0;
  const yearsActive = earliest > 0 ? new Date().getFullYear() - earliest : 0;

  const groupedSkills = groupSkills(cv.skills.filter((s) => isTechnical(s.name)));

  const certByAuthority = new Map<string, number>();
  for (const c of cv.certifications) {
    certByAuthority.set(c.authority, (certByAuthority.get(c.authority) ?? 0) + 1);
  }
  const topAuthorities = [...certByAuthority.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const stats = [
    {
      icon: Briefcase,
      value: `${yearsActive}+`,
      label: lang === "pt" ? "anos de experiência" : "years of experience",
    },
    {
      icon: Award,
      value: String(cv.certifications.length),
      label: lang === "pt" ? "certificações" : "certifications",
    },
    {
      icon: GraduationCap,
      value: String(cv.courses.length),
      label: lang === "pt" ? "cursos concluídos" : "courses completed",
    },
  ];

  return (
    <div className="flex flex-col gap-16 -mt-10">
      <section
        className={`relative overflow-hidden rounded-2xl ring-1 ring-foreground/5 ${brand.hero.gradient} px-8 py-16 sm:px-12 sm:py-24`}
      >
        <div
          className={`absolute inset-0 ${brand.hero.gradientAccent}`}
          aria-hidden
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-8 sm:-right-4 sm:-top-12 opacity-[0.07] mix-blend-multiply"
        >
          <Image
            src={brand.logo.vertical}
            alt=""
            width={640}
            height={729}
            priority
            className="w-[260px] sm:w-[420px] h-auto"
          />
        </div>
        <div className="relative flex flex-col gap-5 max-w-2xl">
          <Badge
            variant="outline"
            className="w-fit bg-background/70 backdrop-blur gap-1.5 pl-2 pr-3"
          >
            <Sparkles className="size-3 text-primary" />
            <span>{fullName}</span>
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold leading-[1.1] tracking-tight">
            {profile.headline || dict.home.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
            {profile.summary || brand.tagline[lang as "pt" | "en"]}
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              href={`/${lang}/projetos`}
              className={buttonVariants({ variant: "default" })}
              transitionTypes={["nav-forward"]}
            >
              <Layers className="size-3.5" />
              {dict.home.ctaProjects}
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href={`/${lang}/contato`}
              className={buttonVariants({ variant: "outline" })}
              transitionTypes={["nav-forward"]}
            >
              {dict.home.ctaContact}
            </Link>
          </div>
        </div>
      </section>

      <section className="reveal-on-scroll flex flex-col gap-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-12 items-start">
          <div className="flex flex-col gap-5 order-2 md:order-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary inline-flex items-center gap-2">
              <UserRound className="size-3.5" />
              {dict.home.about.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              {dict.home.about.heading}
            </h2>
            <div className="flex flex-col gap-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {dict.home.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="relative aspect-[479/544] w-full max-w-[320px] mx-auto md:max-w-none rounded-2xl overflow-hidden ring-1 ring-foreground/10 shadow-sm">
              <Image
                src="/images/wesley-xavier/terno-azul.webp"
                alt={`${fullName} — ${profile.headline}`}
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(0,0,0,0.45)_100%)]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-xs font-medium opacity-90">{fullName}</p>
                <p className="text-[10px] opacity-70 mt-0.5">
                  {lang === "pt" ? "Fundador, TRCX Soluções" : "Founder, TRCX Soluções"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: UserRound,
              title:
                lang === "pt" ? "Atenção personalizada" : "Personalized attention",
              desc:
                lang === "pt"
                  ? "Cada projeto recebe foco dedicado, sem fórmulas prontas."
                  : "Every project gets dedicated focus, no cookie-cutter formulas.",
            },
            {
              icon: Rocket,
              title:
                lang === "pt"
                  ? "Tecnologias de ponta"
                  : "Cutting-edge technologies",
              desc:
                lang === "pt"
                  ? "Stack moderna pra entregar rápido sem abrir mão de qualidade."
                  : "Modern stack to ship fast without sacrificing quality.",
            },
            {
              icon: HandshakeIcon,
              title:
                lang === "pt" ? "Trabalho lado a lado" : "Side-by-side work",
              desc:
                lang === "pt"
                  ? "Flexibilidade pra alinhar a solução aos seus objetivos."
                  : "Flexibility to align the solution to your goals.",
            },
          ].map((pillar) => (
            <li key={pillar.title}>
              <Card className="h-full hover:ring-primary/30 transition-all group/pillar">
                <CardContent className="flex items-start gap-3 py-4">
                  <div className="rounded-lg bg-primary/10 text-primary p-2 group-hover/pillar:bg-primary group-hover/pillar:text-primary-foreground transition-colors">
                    <pillar.icon className="size-4" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold leading-tight">
                      {pillar.title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className="reveal-on-scroll grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-card/60 backdrop-blur ring-1 ring-foreground/5 hover:ring-primary/30 transition-all group/stat">
            <CardContent className="flex items-center gap-4 py-4">
              <div className="rounded-lg bg-primary/10 text-primary p-3 group-hover/stat:bg-primary group-hover/stat:text-primary-foreground transition-colors">
                <s.icon className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="reveal-on-scroll flex flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Code2 className="size-5 text-primary" />
              Stack
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {lang === "pt"
                ? "Tecnologias agrupadas por área."
                : "Technologies grouped by area."}
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {groupedSkills.map((g) => {
            const Icon = CATEGORY_ICON[g.category];
            return (
              <Card
                key={g.category}
                className="ring-1 ring-foreground/5 hover:ring-primary/30 transition-all group/skill"
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-primary/10 text-primary p-1.5 group-hover/skill:bg-primary group-hover/skill:text-primary-foreground transition-colors">
                      <Icon className="size-3.5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {CATEGORY_LABEL[g.category][lang as "pt" | "en"]}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <Badge
                        key={s.name}
                        variant="secondary"
                        className="bg-primary/5 text-primary border-primary/20"
                      >
                        {s.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {topAuthorities.length > 0 && (
        <section className="reveal-on-scroll flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Award className="size-5 text-primary" />
              {lang === "pt"
                ? "Certificações por instituição"
                : "Certifications by issuer"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {lang === "pt"
                ? "Onde investi em aprendizado contínuo."
                : "Where I've invested in continuous learning."}
            </p>
          </div>
          <ul className="flex flex-wrap gap-3">
            {topAuthorities.map(([authority, count]) => (
              <li key={authority}>
                <div className="group/auth flex items-center gap-2 rounded-full bg-card ring-1 ring-foreground/10 hover:ring-primary/40 pl-3 pr-1 py-1 transition-all">
                  <Award className="size-3.5 text-muted-foreground group-hover/auth:text-primary transition-colors" />
                  <span className="text-sm">{authority}</span>
                  <Badge
                    variant="secondary"
                    className="bg-primary text-primary-foreground rounded-full"
                  >
                    {count}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href={`/${lang}/formacao`}
            className="text-sm text-primary hover:underline w-fit inline-flex items-center gap-1 group/all"
            transitionTypes={["nav-forward"]}
          >
            {lang === "pt" ? "Ver todas" : "View all"}
            <ArrowRight className="size-3.5 group-hover/all:translate-x-0.5 transition-transform" />
          </Link>
        </section>
      )}
    </div>
  );
}
