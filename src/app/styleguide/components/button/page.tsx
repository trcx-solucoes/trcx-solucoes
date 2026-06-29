"use client";

import { ArrowRight, Check, Loader2, Mail, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function ButtonShowcase() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Button</h1>
        <p className="mt-2 text-muted-foreground">
          Aciona ações — envia formulários, abre diálogos, navega. Construído sobre{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">@base-ui/react</code>.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{`import { Button } from "@/components/ui/button"`}</code>
        </pre>
      </header>

      <div className="flex flex-col gap-16">
        <Section
          title="Variantes"
          description="Seis variantes de estilo cobrindo as intenções mais comuns."
        >
          <Example code={`<Button>Padrão</Button>\n<Button variant="secondary">Secundário</Button>\n<Button variant="outline">Contornado</Button>\n<Button variant="ghost">Fantasma</Button>\n<Button variant="destructive">Destrutivo</Button>\n<Button variant="link">Link</Button>`}>
            <Button>Padrão</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="outline">Contornado</Button>
            <Button variant="ghost">Fantasma</Button>
            <Button variant="destructive">Destrutivo</Button>
            <Button variant="link">Link</Button>
          </Example>
        </Section>

        <Section
          title="Tamanhos"
          description="Do compacto (xs) ao grande (lg), mais variantes só de ícone."
        >
          <Example
            label="Tamanhos de texto"
            code={`<Button size="xs">xs</Button>\n<Button size="sm">sm</Button>\n<Button size="default">padrão</Button>\n<Button size="lg">lg</Button>`}
          >
            <Button size="xs">xs</Button>
            <Button size="sm">sm</Button>
            <Button size="default">padrão</Button>
            <Button size="lg">lg</Button>
          </Example>
          <div className="mt-4">
            <Example
              label="Tamanhos de ícone"
              code={`<Button size="icon-xs"><Plus /></Button>\n<Button size="icon-sm"><Plus /></Button>\n<Button size="icon"><Plus /></Button>\n<Button size="icon-lg"><Plus /></Button>`}
            >
              <Button size="icon-xs" aria-label="Adicionar">
                <Plus />
              </Button>
              <Button size="icon-sm" aria-label="Adicionar">
                <Plus />
              </Button>
              <Button size="icon" aria-label="Adicionar">
                <Plus />
              </Button>
              <Button size="icon-lg" aria-label="Adicionar">
                <Plus />
              </Button>
            </Example>
          </div>
        </Section>

        <Section
          title="Com ícones"
          description="Ícones alinhados ao início ou fim por meio de atributos data-slot."
        >
          <Example
            code={`<Button>\n  <Mail data-icon="inline-start" />\n  Enviar email\n</Button>\n<Button variant="secondary">\n  Continuar\n  <ArrowRight data-icon="inline-end" />\n</Button>`}
          >
            <Button>
              <Mail data-icon="inline-start" />
              Enviar email
            </Button>
            <Button variant="secondary">
              Continuar
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button variant="outline">
              <Check data-icon="inline-start" />
              Confirmar
            </Button>
            <Button variant="destructive">
              <Trash2 data-icon="inline-start" />
              Excluir
            </Button>
          </Example>
        </Section>

        <Section
          title="Estados"
          description="Foco (Tab), desabilitado e carregando."
        >
          <Example
            label="Desabilitado"
            code={`<Button disabled>Desabilitado</Button>\n<Button variant="secondary" disabled>Desabilitado</Button>`}
          >
            <Button disabled>Desabilitado</Button>
            <Button variant="secondary" disabled>
              Desabilitado
            </Button>
            <Button variant="outline" disabled>
              Desabilitado
            </Button>
          </Example>
          <div className="mt-4">
            <Example
              label="Carregando"
              code={`<Button disabled>\n  <Loader2 data-icon="inline-start" className="animate-spin" />\n  Processando...\n</Button>`}
            >
              <Button disabled>
                <Loader2 data-icon="inline-start" className="animate-spin" />
                Processando...
              </Button>
              <Button variant="secondary" disabled>
                <Loader2 data-icon="inline-start" className="animate-spin" />
                Salvando...
              </Button>
            </Example>
          </div>
          <div className="mt-4">
            <Example
              label="Inválido (aria-invalid)"
              code={`<Button aria-invalid>Verifique</Button>`}
            >
              <Button aria-invalid>Verifique</Button>
              <Button variant="outline" aria-invalid>
                Verifique
              </Button>
            </Example>
          </div>
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
                    default · secondary · outline · ghost · destructive · link
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">default</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">size</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    xs · sm · default · lg · icon · icon-xs · icon-sm · icon-lg
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">default</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">disabled</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                  <td className="px-4 py-2 font-mono text-xs">false</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">render</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    ReactElement (base-ui)
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">—</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Aceita todas as props de{" "}
            <code className="rounded bg-muted px-1 py-0.5">@base-ui/react/button</code>.
          </p>
        </Section>

        <Section
          title="Acessibilidade"
          description="Comportamento herdado do @base-ui/react/button."
        >
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Focável por teclado (Tab) com anel de foco visível.</li>
            <li>Enter/Espaço acionam o botão.</li>
            <li>
              Use <code className="rounded bg-muted px-1">aria-label</code> em botões
              apenas com ícone.
            </li>
            <li>
              Em botões que disparam requisições, prefira{" "}
              <code className="rounded bg-muted px-1">disabled</code> enquanto estiver
              carregando para evitar cliques duplicados.
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
