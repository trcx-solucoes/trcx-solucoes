"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

const LIMITE = 280;

export default function TextareaShowcase() {
  const [bio, setBio] = useState("");

  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Textarea</h1>
        <p className="mt-2 text-muted-foreground">
          Campo de texto multi-linha. Usa{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            field-sizing: content
          </code>{" "}
          para crescer automaticamente com o conteúdo.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{`import { Textarea } from "@/components/ui/textarea"`}</code>
        </pre>
      </header>

      <div className="flex flex-col gap-16">
        <Section title="Básico">
          <Example
            code={`<Textarea placeholder="Escreva aqui..." />`}
          >
            <Textarea
              placeholder="Escreva sua mensagem aqui..."
              className="max-w-xl"
            />
          </Example>
        </Section>

        <Section
          title="Com label e apoio"
          description="Padrão para formulários."
        >
          <Example
            code={`<div className="grid max-w-xl gap-1.5">\n  <Label htmlFor="bio">Biografia</Label>\n  <Textarea id="bio" rows={4} />\n  <p className="text-xs text-muted-foreground">Conte um pouco sobre você.</p>\n</div>`}
          >
            <div className="grid max-w-xl gap-1.5">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea id="bio" rows={4} />
              <p className="text-xs text-muted-foreground">
                Conte um pouco sobre você. Será exibido no seu perfil.
              </p>
            </div>
          </Example>
        </Section>

        <Section
          title="Com contador"
          description="Controle externo para aplicar limite de caracteres."
        >
          <Example
            code={`const [bio, setBio] = useState("")\n\n<Textarea\n  value={bio}\n  onChange={(e) => setBio(e.target.value)}\n  maxLength={280}\n/>`}
          >
            <div className="grid max-w-xl gap-1.5">
              <Label htmlFor="bio-counter">Sobre você</Label>
              <Textarea
                id="bio-counter"
                rows={4}
                maxLength={LIMITE}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Até 280 caracteres..."
              />
              <div className="flex justify-end text-xs text-muted-foreground">
                {bio.length} / {LIMITE}
              </div>
            </div>
          </Example>
        </Section>

        <Section
          title="Altura"
          description="rows define a altura inicial; field-sizing-content expande."
        >
          <Example label="rows={2}">
            <Textarea rows={2} className="max-w-xl" defaultValue="Duas linhas." />
          </Example>
          <div className="mt-4">
            <Example label="rows={6}">
              <Textarea
                rows={6}
                className="max-w-xl"
                defaultValue={
                  "Seis linhas.\n\nVocê pode continuar digitando e ela cresce\nautomaticamente com o conteúdo."
                }
              />
            </Example>
          </div>
        </Section>

        <Section title="Estados">
          <Example label="Desabilitado">
            <Textarea
              disabled
              className="max-w-xl"
              defaultValue="Conteúdo travado"
            />
          </Example>
          <div className="mt-4">
            <Example label="Somente leitura">
              <Textarea
                readOnly
                className="max-w-xl"
                defaultValue="Este conteúdo não pode ser editado, mas pode ser selecionado e copiado."
              />
            </Example>
          </div>
          <div className="mt-4">
            <Example label="Inválido">
              <div className="grid max-w-xl gap-1.5">
                <Textarea aria-invalid defaultValue="abc" />
                <p className="text-xs text-destructive">
                  Descreva com pelo menos 20 caracteres.
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
                  <td className="px-4 py-2 font-mono text-xs">rows</td>
                  <td className="px-4 py-2 font-mono text-xs">number</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">maxLength</td>
                  <td className="px-4 py-2 font-mono text-xs">number</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">disabled</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">readOnly</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Aceita todas as props de{" "}
            <code className="rounded bg-muted px-1 py-0.5">
              React.ComponentProps&lt;&quot;textarea&quot;&gt;
            </code>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
