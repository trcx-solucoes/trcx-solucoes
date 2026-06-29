"use client";

import { Separator } from "@/components/ui/separator";

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
      <div className="rounded-lg border bg-card p-6">{children}</div>
      {code && (
        <pre className="overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

export default function SeparatorShowcase() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Separator</h1>
        <p className="mt-2 text-muted-foreground">
          Divisor visual entre elementos. Renderiza um{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            &lt;hr&gt;
          </code>{" "}
          horizontal ou vertical via{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            @base-ui/react/separator
          </code>
          .
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{`import { Separator } from "@/components/ui/separator"`}</code>
        </pre>
      </header>

      <div className="flex flex-col gap-16">
        <Section title="Horizontal" description="Padrão — divide blocos verticais.">
          <Example
            code={`<div>\n  <h4>Título da seção</h4>\n  <p className="text-muted-foreground">Subtítulo.</p>\n</div>\n<Separator />\n<div>Conteúdo abaixo</div>`}
          >
            <div className="flex flex-col gap-3">
              <div>
                <h4 className="font-medium">Relatório mensal</h4>
                <p className="text-sm text-muted-foreground">
                  Agregado de todas as métricas.
                </p>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">
                Conteúdo principal abaixo da divisão.
              </p>
            </div>
          </Example>
        </Section>

        <Section
          title="Vertical"
          description='orientation="vertical" divide conteúdo em linha.'
        >
          <Example
            code={`<div className="flex h-6 items-center gap-2">\n  <span>Posts</span>\n  <Separator orientation="vertical" />\n  <span>Comentários</span>\n</div>`}
          >
            <div className="flex h-6 items-center gap-3 text-sm">
              <span>Posts</span>
              <Separator orientation="vertical" />
              <span>Comentários</span>
              <Separator orientation="vertical" />
              <span>Seguidores</span>
            </div>
          </Example>
        </Section>

        <Section
          title="Em cards e listas"
          description="Útil para dividir blocos relacionados."
        >
          <Example>
            <div className="max-w-md rounded-lg border bg-background p-4">
              <h4 className="font-medium">Assinatura</h4>
              <p className="text-sm text-muted-foreground">Plano Pro · ativa</p>
              <Separator className="my-3" />
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Próxima cobrança</span>
                  <span>20/05/2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor</span>
                  <span>R$ 49,00</span>
                </div>
              </div>
              <Separator className="my-3" />
              <button className="text-sm text-primary hover:underline">
                Gerenciar assinatura
              </button>
            </div>
          </Example>
        </Section>

        <Section
          title="Com rótulo"
          description='Combine com texto para criar um "ou" divisor.'
        >
          <Example
            code={`<div className="flex items-center gap-3 text-xs text-muted-foreground">\n  <Separator className="flex-1" />\n  <span>OU</span>\n  <Separator className="flex-1" />\n</div>`}
          >
            <div className="max-w-sm">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Separator className="flex-1" />
                <span>OU</span>
                <Separator className="flex-1" />
              </div>
            </div>
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
                  <td className="px-4 py-2 font-mono text-xs">orientation</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    horizontal · vertical
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">horizontal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Define automaticamente{" "}
            <code className="rounded bg-muted px-1 py-0.5">
              role=&quot;separator&quot;
            </code>{" "}
            e <code>aria-orientation</code>.
          </p>
        </Section>
      </div>
    </div>
  );
}
