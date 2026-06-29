"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <div className="flex flex-col gap-3 rounded-lg border bg-card p-6">
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

export default function InputShowcase() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Input</h1>
        <p className="mt-2 text-muted-foreground">
          Campo de entrada de texto de uma linha. Construído sobre{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            @base-ui/react/input
          </code>
          .
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{`import { Input } from "@/components/ui/input"`}</code>
        </pre>
      </header>

      <div className="flex flex-col gap-16">
        <Section title="Básico" description="Com e sem placeholder.">
          <Example
            code={`<Input placeholder="Email" type="email" />`}
          >
            <Input placeholder="Seu email" type="email" className="max-w-sm" />
            <Input defaultValue="admin@empresa.com" className="max-w-sm" />
          </Example>
        </Section>

        <Section
          title="Com label"
          description="Vincule o Label via htmlFor + id."
        >
          <Example
            code={`<div className="grid max-w-sm gap-1.5">\n  <Label htmlFor="email">Email</Label>\n  <Input id="email" type="email" placeholder="voce@empresa.com" />\n</div>`}
          >
            <div className="grid max-w-sm gap-1.5">
              <Label htmlFor="email-input">Email</Label>
              <Input
                id="email-input"
                type="email"
                placeholder="voce@empresa.com"
              />
            </div>
          </Example>
        </Section>

        <Section
          title="Tipos"
          description="type aceita todos os valores HTML padrão."
        >
          <Example
            code={`<Input type="text" />\n<Input type="email" />\n<Input type="password" />\n<Input type="number" />\n<Input type="tel" />\n<Input type="url" />\n<Input type="search" />`}
          >
            <div className="grid max-w-sm gap-3">
              <Input type="text" placeholder="text" />
              <Input type="email" placeholder="email@exemplo.com" />
              <Input type="password" placeholder="••••••••" />
              <Input type="number" placeholder="42" />
              <Input type="tel" placeholder="(11) 99999-9999" />
              <Input type="url" placeholder="https://exemplo.com" />
              <Input type="date" />
              <Input type="file" />
            </div>
          </Example>
        </Section>

        <Section
          title="Com ícone"
          description="Componha o ícone em um wrapper relativo."
        >
          <Example
            code={`<div className="relative max-w-sm">\n  <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />\n  <Input className="pl-8" placeholder="Buscar..." />\n</div>`}
          >
            <div className="relative max-w-sm">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-8" placeholder="Buscar..." />
            </div>
          </Example>
        </Section>

        <Section title="Estados" description="Desabilitado, somente leitura e inválido.">
          <Example label="Desabilitado">
            <Input placeholder="Desabilitado" disabled className="max-w-sm" />
          </Example>
          <div className="mt-4">
            <Example label="Somente leitura">
              <Input
                defaultValue="Não editável"
                readOnly
                className="max-w-sm"
              />
            </Example>
          </div>
          <div className="mt-4">
            <Example label="Inválido (aria-invalid)">
              <div className="grid max-w-sm gap-1.5">
                <Label htmlFor="email-invalid">Email</Label>
                <Input
                  id="email-invalid"
                  type="email"
                  defaultValue="invalido"
                  aria-invalid
                />
                <p className="text-xs text-destructive">
                  Digite um email válido.
                </p>
              </div>
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
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">type</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    HTMLInputTypeAttribute
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">disabled</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">readOnly</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">aria-invalid</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Aceita todas as props de{" "}
            <code className="rounded bg-muted px-1 py-0.5">
              React.ComponentProps&lt;&quot;input&quot;&gt;
            </code>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
