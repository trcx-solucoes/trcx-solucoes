"use client";

import { Skeleton } from "@/components/ui/skeleton";

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

export default function SkeletonShowcase() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Skeleton</h1>
        <p className="mt-2 text-muted-foreground">
          Placeholder animado para estados de carregamento. Sinaliza a estrutura
          do conteúdo que está chegando, evitando layout shift.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{`import { Skeleton } from "@/components/ui/skeleton"`}</code>
        </pre>
      </header>

      <div className="flex flex-col gap-16">
        <Section title="Formas básicas" description="Defina dimensões via className.">
          <Example
            code={`<Skeleton className="h-4 w-40" />\n<Skeleton className="size-10 rounded-full" />`}
          >
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-12 w-full max-w-md" />
              <Skeleton className="size-12 rounded-full" />
            </div>
          </Example>
        </Section>

        <Section
          title="Linhas de texto"
          description="Simule parágrafos com várias linhas."
        >
          <Example>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full max-w-md" />
              <Skeleton className="h-4 w-full max-w-lg" />
              <Skeleton className="h-4 w-3/4 max-w-md" />
            </div>
          </Example>
        </Section>

        <Section
          title="Avatar + texto"
          description="Padrão comum em lista de comentários / usuários."
        >
          <Example
            code={`<div className="flex items-center gap-3">\n  <Skeleton className="size-10 rounded-full" />\n  <div className="flex-1 space-y-2">\n    <Skeleton className="h-4 w-32" />\n    <Skeleton className="h-3 w-48" />\n  </div>\n</div>`}
          >
            <div className="flex flex-col gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="size-10 shrink-0 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              ))}
            </div>
          </Example>
        </Section>

        <Section title="Card" description="Pré-visualização de um card completo.">
          <Example>
            <div className="max-w-sm space-y-3 rounded-xl border p-4">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </Example>
        </Section>

        <Section
          title="Tabela"
          description="Linhas de uma tabela carregando."
        >
          <Example>
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    {["Nome", "Email", "Função"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2 text-left text-xs font-medium text-muted-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[0, 1, 2, 3].map((i) => (
                    <tr key={i}>
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-28" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-48" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-20" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Example>
        </Section>

        <Section
          title="Diretrizes"
          description="Boas práticas de uso."
        >
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>
              Combine as dimensões do Skeleton com as do conteúdo real para
              evitar reflow ao carregar.
            </li>
            <li>
              Para cargas rápidas (&lt; 300ms), prefira spinner pequeno ou nenhum
              feedback.
            </li>
            <li>
              Renderize no máximo algumas linhas — skeletons demais aumentam a
              sensação de lentidão.
            </li>
            <li>
              Use <code className="rounded bg-muted px-1">role=&quot;status&quot;</code>{" "}
              em um wrapper para anunciar &quot;carregando&quot; a leitores de
              tela.
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
