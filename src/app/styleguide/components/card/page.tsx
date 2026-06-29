"use client";

import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <div className="rounded-lg border bg-muted/40 p-6">{children}</div>
      {code && (
        <pre className="overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

export default function CardShowcase() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Card</h1>
        <p className="mt-2 text-muted-foreground">
          Contêiner para agrupar conteúdo relacionado. Composição flexível com
          header, content, footer e action.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{`import {\n  Card,\n  CardAction,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from "@/components/ui/card"`}</code>
        </pre>
      </header>

      <div className="flex flex-col gap-16">
        <Section title="Básico" description="Apenas título e conteúdo.">
          <Example
            code={`<Card className="max-w-md">\n  <CardHeader>\n    <CardTitle>Relatório mensal</CardTitle>\n    <CardDescription>Resumo das métricas do período.</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p className="text-muted-foreground">Conteúdo do card.</p>\n  </CardContent>\n</Card>`}
          >
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle>Relatório mensal</CardTitle>
                <CardDescription>
                  Resumo das métricas do período.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  15.328 visitas · 2.104 conversões · 12% a mais que o mês
                  anterior.
                </p>
              </CardContent>
            </Card>
          </Example>
        </Section>

        <Section
          title="Com action no header"
          description="Use CardAction para posicionar botões ou menus no canto superior direito."
        >
          <Example
            code={`<Card className="max-w-md">\n  <CardHeader>\n    <CardTitle>Projeto Atlas</CardTitle>\n    <CardDescription>Em andamento</CardDescription>\n    <CardAction>\n      <Button variant="ghost" size="icon-sm">\n        <MoreHorizontal />\n      </Button>\n    </CardAction>\n  </CardHeader>\n  <CardContent>\n    <Badge variant="secondary">Em revisão</Badge>\n  </CardContent>\n</Card>`}
          >
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle>Projeto Atlas</CardTitle>
                <CardDescription>Em andamento</CardDescription>
                <CardAction>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Mais opções"
                  >
                    <MoreHorizontal />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Em revisão</Badge>
              </CardContent>
            </Card>
          </Example>
        </Section>

        <Section
          title="Com footer"
          description="CardFooter tem borda superior e fundo sutil para ações."
        >
          <Example
            code={`<Card className="max-w-md">\n  <CardHeader>\n    <CardTitle>Convite pendente</CardTitle>\n    <CardDescription>Expira em 24 horas.</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Você foi convidado para editar este documento.</p>\n  </CardContent>\n  <CardFooter className="justify-end gap-2">\n    <Button variant="outline" size="sm">Recusar</Button>\n    <Button size="sm">Aceitar</Button>\n  </CardFooter>\n</Card>`}
          >
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle>Convite pendente</CardTitle>
                <CardDescription>Expira em 24 horas.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Você foi convidado para editar este documento como colaborador.
                </p>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="outline" size="sm">
                  Recusar
                </Button>
                <Button size="sm">Aceitar</Button>
              </CardFooter>
            </Card>
          </Example>
        </Section>

        <Section
          title="Tamanhos"
          description='O Card suporta size="sm" para ocupar menos espaço vertical.'
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Example label='size="default"'>
              <Card>
                <CardHeader>
                  <CardTitle>Padrão</CardTitle>
                  <CardDescription>Espaçamento completo.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Conteúdo com respiros maiores.
                  </p>
                </CardContent>
              </Card>
            </Example>
            <Example label='size="sm"'>
              <Card size="sm">
                <CardHeader>
                  <CardTitle>Compacto</CardTitle>
                  <CardDescription>Espaçamento reduzido.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Conteúdo com respiros menores.
                  </p>
                </CardContent>
              </Card>
            </Example>
          </div>
        </Section>

        <Section title="Grade de cards">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              { title: "Receita", value: "R$ 48.230", delta: "+12%" },
              { title: "Usuários", value: "1.284", delta: "+3%" },
              { title: "Churn", value: "2,1%", delta: "-0,4%" },
            ].map((m) => (
              <Card key={m.title}>
                <CardHeader>
                  <CardDescription>{m.title}</CardDescription>
                  <CardTitle className="text-2xl font-semibold">
                    {m.value}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">{m.delta}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Subcomponentes">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-2">Componente</th>
                  <th className="px-4 py-2">Função</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">Card</td>
                  <td className="px-4 py-2">
                    Contêiner raiz; aceita <code>size</code> (<code>default</code> ou{" "}
                    <code>sm</code>).
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">CardHeader</td>
                  <td className="px-4 py-2">Agrupa título, descrição e action.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">CardTitle</td>
                  <td className="px-4 py-2">Título principal.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">CardDescription</td>
                  <td className="px-4 py-2">Subtítulo discreto.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">CardAction</td>
                  <td className="px-4 py-2">Slot para ações no canto do header.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">CardContent</td>
                  <td className="px-4 py-2">Corpo principal.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">CardFooter</td>
                  <td className="px-4 py-2">Rodapé com borda e fundo sutil.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  );
}
