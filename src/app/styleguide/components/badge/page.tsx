"use client";

import { BellRing, Check, Circle, Sparkles, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

function Example({
  label,
  code,
  children,
}: {
  label?: string;
  code?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <div className="text-xs font-medium text-muted-foreground">{label}</div>}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-6">
        {children}
      </div>
      {code && (
        <pre className="overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

export default function BadgeShowcase() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Badge</h1>
        <p className="mt-2 text-muted-foreground">
          Etiquetas compactas para status, categorias e contagens. Renderiza como{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">span</code> por
          padrão, mas pode ser polimórfico via <code>render</code>.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{`import { Badge } from "@/components/ui/badge"`}</code>
        </pre>
      </header>

      <div className="flex flex-col gap-16">
        <Section title="Variantes" description="Seis variantes cobrindo status e tom.">
          <Example code={`<Badge>Padrão</Badge>\n<Badge variant="secondary">Secundário</Badge>\n<Badge variant="outline">Contornado</Badge>\n<Badge variant="destructive">Destrutivo</Badge>\n<Badge variant="ghost">Fantasma</Badge>\n<Badge variant="link">Link</Badge>`}>
            <Badge>Padrão</Badge>
            <Badge variant="secondary">Secundário</Badge>
            <Badge variant="outline">Contornado</Badge>
            <Badge variant="destructive">Destrutivo</Badge>
            <Badge variant="ghost">Fantasma</Badge>
            <Badge variant="link">Link</Badge>
          </Example>
        </Section>

        <Section
          title="Com ícones"
          description="Ícones alinhados via atributo data-icon."
        >
          <Example
            code={`<Badge>\n  <Check data-icon="inline-start" />\n  Confirmado\n</Badge>`}
          >
            <Badge>
              <Check data-icon="inline-start" />
              Confirmado
            </Badge>
            <Badge variant="secondary">
              <Sparkles data-icon="inline-start" />
              Novo
            </Badge>
            <Badge variant="outline">
              <Circle data-icon="inline-start" className="fill-current" />
              Online
            </Badge>
            <Badge variant="destructive">
              <TriangleAlert data-icon="inline-start" />
              Erro
            </Badge>
          </Example>
        </Section>

        <Section
          title="Contadores"
          description="Tamanho fixo ideal para números pequenos."
        >
          <Example code={`<Badge>3</Badge>\n<Badge variant="destructive">12</Badge>\n<Badge variant="secondary">99+</Badge>`}>
            <Badge>3</Badge>
            <Badge variant="destructive">12</Badge>
            <Badge variant="secondary">99+</Badge>
            <span className="relative inline-flex">
              <BellRing className="size-5 text-muted-foreground" />
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-4 min-w-4 px-1"
              >
                5
              </Badge>
            </span>
          </Example>
        </Section>

        <Section
          title="Como link"
          description="Use a prop render do base-ui para polimorfismo."
        >
          <Example code={`<Badge render={<a href="#tags" />}>#design</Badge>`}>
            <Badge render={<a href="#tags" />}>#design</Badge>
            <Badge variant="outline" render={<a href="#tags" />}>
              #typescript
            </Badge>
            <Badge variant="link" render={<a href="#tags" />}>
              #acessibilidade
            </Badge>
          </Example>
        </Section>

        <Section title="Props">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-2">Prop</th>
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">Padrão</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">variant</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    default · secondary · outline · destructive · ghost · link
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">default</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">render</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    ReactElement (polimórfico)
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">span</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  );
}
