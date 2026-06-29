"use client";

import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PRIMARY_SCALE = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
const NEUTRAL_SCALE = PRIMARY_SCALE;

const BASE_TOKENS = [
  { name: "background", var: "--background" },
  { name: "foreground", var: "--foreground" },
  { name: "card", var: "--card" },
  { name: "card-foreground", var: "--card-foreground" },
  { name: "popover", var: "--popover" },
  { name: "popover-foreground", var: "--popover-foreground" },
  { name: "primary", var: "--primary" },
  { name: "primary-foreground", var: "--primary-foreground" },
  { name: "secondary", var: "--secondary" },
  { name: "secondary-foreground", var: "--secondary-foreground" },
  { name: "muted", var: "--muted" },
  { name: "muted-foreground", var: "--muted-foreground" },
  { name: "accent", var: "--accent" },
  { name: "accent-foreground", var: "--accent-foreground" },
  { name: "border", var: "--border" },
  { name: "input", var: "--input" },
  { name: "ring", var: "--ring" },
];

const SEMANTIC_TOKENS = [
  { name: "success", var: "--success", fg: "--success-foreground" },
  { name: "warning", var: "--warning", fg: "--warning-foreground" },
  { name: "destructive", var: "--destructive", fg: "--destructive-foreground" },
  { name: "info", var: "--info", fg: "--info-foreground" },
];

const RADII = [
  { label: "sm", value: "var(--radius-sm)" },
  { label: "md", value: "var(--radius-md)" },
  { label: "lg (base)", value: "var(--radius-lg)" },
  { label: "xl", value: "var(--radius-xl)" },
  { label: "2xl", value: "var(--radius-2xl)" },
  { label: "full", value: "9999px" },
];

const SHADOWS = [
  { label: "sm", value: "shadow-sm" },
  { label: "padrão", value: "shadow" },
  { label: "md", value: "shadow-md" },
  { label: "lg", value: "shadow-lg" },
  { label: "xl", value: "shadow-xl" },
];

const CHART_TOKENS = [
  { name: "chart-1", var: "--chart-1" },
  { name: "chart-2", var: "--chart-2" },
  { name: "chart-3", var: "--chart-3" },
  { name: "chart-4", var: "--chart-4" },
  { name: "chart-5", var: "--chart-5" },
];

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t pt-10 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Swatch({
  label,
  cssVar,
  foregroundVar,
}: {
  label: string;
  cssVar: string;
  foregroundVar?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-16 w-full rounded-md border"
        style={{
          backgroundColor: `var(${cssVar})`,
          color: foregroundVar ? `var(${foregroundVar})` : undefined,
        }}
      >
        {foregroundVar && (
          <div className="flex h-full items-center justify-center text-xs font-medium">
            Aa
          </div>
        )}
      </div>
      <div className="text-xs font-medium">{label}</div>
      <code className="text-[10px] text-muted-foreground">{cssVar}</code>
    </div>
  );
}

function ScaleSwatch({ prefix, step }: { prefix: string; step: number }) {
  const cssVar = `--${prefix}-${step}`;
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-14 w-full rounded-md border"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div className="text-xs font-medium">
        {prefix}-{step}
      </div>
      <code className="text-[10px] text-muted-foreground">{cssVar}</code>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Tokens de Design</h1>
        <p className="mt-2 text-muted-foreground">
          Todos os tokens fundamentais usados no sistema de design. Use o
          seletor na lateral para alternar a paleta ou o tema claro/escuro.
        </p>
      </header>

      <div className="flex flex-col gap-16">
        <Section
          title="Tokens Base"
          description="Tokens neutros de superfície, texto e interação."
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {BASE_TOKENS.map((t) => (
              <Swatch
                key={t.name}
                label={t.name}
                cssVar={t.var}
                foregroundVar={
                  t.name.endsWith("-foreground")
                    ? undefined
                    : BASE_TOKENS.find((x) => x.name === `${t.name}-foreground`)
                        ?.var
                }
              />
            ))}
          </div>
        </Section>

        <Section
          title="Escala Primária"
          description="Cor da marca — muda conforme a paleta selecionada (50 a 900)."
        >
          <div className="grid grid-cols-5 gap-3 md:grid-cols-10">
            {PRIMARY_SCALE.map((step) => (
              <ScaleSwatch key={step} prefix="primary" step={step} />
            ))}
          </div>
        </Section>

        <Section
          title="Escala Neutra"
          description="Tons de cinza frios para texto, bordas e superfícies."
        >
          <div className="grid grid-cols-5 gap-3 md:grid-cols-10">
            {NEUTRAL_SCALE.map((step) => (
              <ScaleSwatch key={step} prefix="neutral" step={step} />
            ))}
          </div>
        </Section>

        <Section
          title="Cores Semânticas"
          description="Sucesso, atenção, erro e informação."
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SEMANTIC_TOKENS.map((t) => (
              <Swatch
                key={t.name}
                label={t.name}
                cssVar={t.var}
                foregroundVar={t.fg}
              />
            ))}
          </div>
        </Section>

        <Section
          title="Cores para Gráficos"
          description="Cinco cores para visualizações de dados. Em temas simples, são variações da mesma família; em temas combinados, misturam paletas para compor combinações visualmente chamativas."
        >
          <div className="grid grid-cols-5 gap-3">
            {CHART_TOKENS.map((t) => (
              <div key={t.name} className="flex flex-col gap-1.5">
                <div
                  className="h-16 w-full rounded-md border"
                  style={{ backgroundColor: `var(${t.var})` }}
                />
                <div className="text-xs font-medium">{t.name}</div>
                <code className="text-[10px] text-muted-foreground">
                  {t.var}
                </code>
              </div>
            ))}
          </div>
          <div className="mt-6 flex h-16 overflow-hidden rounded-md border">
            {CHART_TOKENS.map((t) => (
              <div
                key={t.name}
                className="flex-1"
                style={{ backgroundColor: `var(${t.var})` }}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Prévia da combinação — alterne entre temas simples e combinados no
            seletor lateral para comparar.
          </p>
        </Section>

        <Section title="Tipografia" description="Família: Inter.">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-5xl font-bold tracking-tight">Título 1</h1>
              <code className="text-xs text-muted-foreground">
                text-5xl · font-bold · tracking-tight
              </code>
            </div>
            <div>
              <h2 className="text-4xl font-semibold tracking-tight">
                Título 2
              </h2>
              <code className="text-xs text-muted-foreground">
                text-4xl · font-semibold
              </code>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Título 3</h3>
              <code className="text-xs text-muted-foreground">
                text-2xl · font-semibold
              </code>
            </div>
            <div>
              <h4 className="text-xl font-medium">Título 4</h4>
              <code className="text-xs text-muted-foreground">
                text-xl · font-medium
              </code>
            </div>
            <div>
              <p className="text-base">
                Corpo — A rápida raposa marrom salta sobre o cão preguiçoso.
              </p>
              <code className="text-xs text-muted-foreground">text-base</code>
            </div>
            <div>
              <p className="text-sm">
                Pequeno — A rápida raposa marrom salta sobre o cão preguiçoso.
              </p>
              <code className="text-xs text-muted-foreground">text-sm</code>
            </div>
            <div>
              <p className="font-mono text-sm">const x = 42;</p>
              <code className="text-xs text-muted-foreground">font-mono</code>
            </div>
          </div>
        </Section>

        <Section
          title="Raio de Borda"
          description="Raio base: 0.5rem."
        >
          <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
            {RADII.map((r) => (
              <div key={r.label} className="flex flex-col items-center gap-2">
                <div
                  className="size-16 bg-primary"
                  style={{ borderRadius: r.value }}
                />
                <div className="text-xs font-medium">{r.label}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Sombras">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {SHADOWS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <div className={`size-16 rounded-md bg-card border ${s.value}`} />
                <div className="text-xs font-medium">{s.label}</div>
                <code className="text-[10px] text-muted-foreground">
                  {s.value}
                </code>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Botões">
          <div className="flex flex-wrap gap-3">
            <Button>Padrão</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="outline">Contornado</Button>
            <Button variant="ghost">Fantasma</Button>
            <Button variant="destructive">Destrutivo</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="xs">xs</Button>
            <Button size="sm">sm</Button>
            <Button size="default">padrão</Button>
            <Button size="lg">lg</Button>
          </div>
        </Section>

        <Section title="Badges">
          <div className="flex flex-wrap gap-2">
            <Badge>Padrão</Badge>
            <Badge variant="secondary">Secundário</Badge>
            <Badge variant="outline">Contornado</Badge>
            <Badge variant="destructive">Destrutivo</Badge>
          </div>
        </Section>

        <Section title="Card">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Relatório mensal</CardTitle>
              <CardDescription>
                Um resumo das principais métricas do período.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Conteúdo do card vai aqui.
              </p>
            </CardContent>
          </Card>
        </Section>

        <Section title="Alertas">
          <div className="flex flex-col gap-3">
            <Alert>
              <Info />
              <AlertTitle>Atenção!</AlertTitle>
              <AlertDescription>
                Você pode adicionar componentes ao seu app usando a CLI.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>
                Sua sessão expirou. Faça login novamente.
              </AlertDescription>
            </Alert>
            <Alert>
              <CheckCircle2 className="text-[color:var(--success)]" />
              <AlertTitle>Sucesso</AlertTitle>
              <AlertDescription>
                Suas alterações foram salvas.
              </AlertDescription>
            </Alert>
          </div>
        </Section>

        <Section title="Grupo de Rádio">
          <RadioGroup defaultValue="confortavel" className="max-w-sm">
            <label className="flex items-center gap-3 text-sm">
              <RadioGroupItem value="padrao" />
              Espaçamento padrão
            </label>
            <label className="flex items-center gap-3 text-sm">
              <RadioGroupItem value="confortavel" />
              Espaçamento confortável
            </label>
            <label className="flex items-center gap-3 text-sm">
              <RadioGroupItem value="compacto" />
              Espaçamento compacto
            </label>
          </RadioGroup>
        </Section>
      </div>
    </div>
  );
}
