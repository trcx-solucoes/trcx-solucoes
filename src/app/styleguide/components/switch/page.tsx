"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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

export default function SwitchShowcase() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Switch</h1>
        <p className="mt-2 text-muted-foreground">
          Alternador binário — efeito imediato, sem necessidade de salvar.
          Construído sobre{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            @base-ui/react/switch
          </code>
          .
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{`import { Switch } from "@/components/ui/switch"`}</code>
        </pre>
      </header>

      <div className="flex flex-col gap-16">
        <Section title="Básico" description="Com label descritivo.">
          <Example
            code={`<Label>\n  <Switch /> Notificações por email\n</Label>`}
          >
            <Label>
              <Switch />
              Notificações por email
            </Label>
            <Label>
              <Switch defaultChecked />
              Modo escuro automático
            </Label>
          </Example>
        </Section>

        <Section
          title="Controlado"
          description="checked + onCheckedChange para controle externo."
        >
          <Example
            code={`const [enabled, setEnabled] = useState(true)\n\n<Switch checked={enabled} onCheckedChange={setEnabled} />`}
          >
            <Label>
              <Switch
                checked={enabled}
                onCheckedChange={(v) => setEnabled(v === true)}
              />
              Sincronização automática — valor:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                {String(enabled)}
              </code>
            </Label>
          </Example>
        </Section>

        <Section title="Tamanhos" description='default e sm.'>
          <Example code={`<Switch size="sm" />\n<Switch size="default" />`}>
            <Label>
              <Switch size="sm" defaultChecked />
              Small
            </Label>
            <Label>
              <Switch size="default" defaultChecked />
              Default
            </Label>
          </Example>
        </Section>

        <Section title="Estados">
          <Example label="Desabilitado">
            <Label>
              <Switch disabled />
              Off e desabilitado
            </Label>
            <Label>
              <Switch disabled defaultChecked />
              On e desabilitado
            </Label>
          </Example>
          <div className="mt-4">
            <Example label="Inválido">
              <Label>
                <Switch aria-invalid />
                Campo inválido
              </Label>
            </Example>
          </div>
        </Section>

        <Section
          title="Lista de preferências"
          description="Padrão comum em telas de configurações."
        >
          <Example>
            <div className="grid max-w-md divide-y">
              {[
                {
                  titulo: "Notificações push",
                  desc: "Alertas em tempo real no seu dispositivo.",
                  on: true,
                },
                {
                  titulo: "Emails semanais",
                  desc: "Um resumo todas as segundas pela manhã.",
                  on: false,
                },
                {
                  titulo: "Análises de uso",
                  desc: "Nos ajude a melhorar o produto (anônimo).",
                  on: true,
                },
              ].map((p) => (
                <div
                  key={p.titulo}
                  className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{p.titulo}</span>
                    <span className="text-xs text-muted-foreground">
                      {p.desc}
                    </span>
                  </div>
                  <Switch defaultChecked={p.on} />
                </div>
              ))}
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
                  <td className="px-4 py-2 font-mono text-xs">size</td>
                  <td className="px-4 py-2 font-mono text-xs">sm · default</td>
                  <td className="px-4 py-2 font-mono text-xs">default</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">checked</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                  <td className="px-4 py-2 font-mono text-xs">—</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">defaultChecked</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                  <td className="px-4 py-2 font-mono text-xs">false</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">onCheckedChange</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    (checked, eventDetails) =&gt; void
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">—</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">disabled</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                  <td className="px-4 py-2 font-mono text-xs">false</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  );
}
