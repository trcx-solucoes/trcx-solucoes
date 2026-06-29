"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
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

export default function CheckboxShowcase() {
  const [aceito, setAceito] = useState(false);
  const [notif, setNotif] = useState<{ checked: boolean; indeterminate: boolean }>({
    checked: false,
    indeterminate: true,
  });

  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Checkbox</h1>
        <p className="mt-2 text-muted-foreground">
          Seleção binária (ou tri-estado com indeterminado). Construído sobre{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            @base-ui/react/checkbox
          </code>
          .
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{`import { Checkbox } from "@/components/ui/checkbox"`}</code>
        </pre>
      </header>

      <div className="flex flex-col gap-16">
        <Section title="Básico" description="Uncontrolled com defaultChecked.">
          <Example
            code={`<Label>\n  <Checkbox /> Aceito os termos\n</Label>`}
          >
            <Label>
              <Checkbox />
              Aceito os termos de uso
            </Label>
            <Label>
              <Checkbox defaultChecked />
              Receber novidades (marcado por padrão)
            </Label>
          </Example>
        </Section>

        <Section
          title="Controlado"
          description="Use checked + onCheckedChange para controle externo."
        >
          <Example
            code={`const [aceito, setAceito] = useState(false)\n\n<Label>\n  <Checkbox checked={aceito} onCheckedChange={setAceito} />\n  Aceito os termos\n</Label>`}
          >
            <Label>
              <Checkbox
                checked={aceito}
                onCheckedChange={(v) => setAceito(v === true)}
              />
              Aceito os termos — valor:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                {String(aceito)}
              </code>
            </Label>
          </Example>
        </Section>

        <Section
          title="Indeterminado"
          description="Estado tri-state — útil em árvores de seleção."
        >
          <Example
            code={`<Checkbox indeterminate checked={false} />`}
          >
            <Label>
              <Checkbox
                indeterminate={notif.indeterminate}
                checked={notif.checked}
                onCheckedChange={(v) =>
                  setNotif({ checked: v === true, indeterminate: false })
                }
              />
              Todas as notificações — estado:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                {notif.indeterminate
                  ? "indeterminate"
                  : String(notif.checked)}
              </code>
            </Label>
            <div className="flex flex-col gap-1 pl-6 text-sm">
              <Label>
                <Checkbox defaultChecked />
                Email
              </Label>
              <Label>
                <Checkbox />
                SMS
              </Label>
              <Label>
                <Checkbox />
                Push
              </Label>
            </div>
          </Example>
        </Section>

        <Section title="Estados" description="Desabilitado e inválido.">
          <Example label="Desabilitado">
            <Label>
              <Checkbox disabled />
              Opção desabilitada
            </Label>
            <Label>
              <Checkbox disabled defaultChecked />
              Opção marcada e desabilitada
            </Label>
          </Example>
          <div className="mt-4">
            <Example label="Inválido (aria-invalid)">
              <div className="flex flex-col gap-1">
                <Label>
                  <Checkbox aria-invalid />
                  Você precisa aceitar os termos para continuar
                </Label>
                <p className="text-xs text-destructive">
                  Campo obrigatório.
                </p>
              </div>
            </Example>
          </div>
        </Section>

        <Section title="Grupo de opções">
          <Example
            code={`<fieldset className="grid gap-2">\n  <legend className="text-sm font-medium">Selecione interesses</legend>\n  <Label><Checkbox /> Design</Label>\n  <Label><Checkbox /> Engenharia</Label>\n  <Label><Checkbox /> Produto</Label>\n</fieldset>`}
          >
            <fieldset className="grid gap-2">
              <legend className="mb-1 text-sm font-medium">
                Selecione seus interesses
              </legend>
              <Label>
                <Checkbox defaultChecked />
                Design
              </Label>
              <Label>
                <Checkbox />
                Engenharia
              </Label>
              <Label>
                <Checkbox defaultChecked />
                Produto
              </Label>
              <Label>
                <Checkbox />
                Marketing
              </Label>
            </fieldset>
          </Example>
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
                  <td className="px-4 py-2 font-mono text-xs">checked</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">defaultChecked</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">indeterminate</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">onCheckedChange</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    (checked, eventDetails) =&gt; void
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">disabled</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">required</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  );
}
