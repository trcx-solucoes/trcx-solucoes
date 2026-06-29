"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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

export default function LabelShowcase() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Label</h1>
        <p className="mt-2 text-muted-foreground">
          Rótulo acessível para controles de formulário. Herda estados de
          disabled dos irmãos via <code>peer</code> do Tailwind.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{`import { Label } from "@/components/ui/label"`}</code>
        </pre>
      </header>

      <div className="flex flex-col gap-16">
        <Section
          title="Com Input"
          description="Vinculação explícita via htmlFor + id."
        >
          <Example
            code={`<div className="grid max-w-sm gap-1.5">\n  <Label htmlFor="nome">Nome completo</Label>\n  <Input id="nome" placeholder="João da Silva" />\n</div>`}
          >
            <div className="grid max-w-sm gap-1.5">
              <Label htmlFor="nome">Nome completo</Label>
              <Input id="nome" placeholder="João da Silva" />
            </div>
          </Example>
        </Section>

        <Section
          title="Encapsulando o controle"
          description="Também funciona envolvendo o controle (sem htmlFor)."
        >
          <Example
            code={`<Label>\n  <Checkbox /> Aceito os termos de uso\n</Label>`}
          >
            <Label>
              <Checkbox />
              Aceito os termos de uso
            </Label>
            <Label>
              <Switch />
              Receber emails promocionais
            </Label>
          </Example>
        </Section>

        <Section
          title="Com texto de apoio"
          description="Use um parágrafo pequeno abaixo do controle."
        >
          <Example
            code={`<div className="grid max-w-sm gap-1.5">\n  <Label htmlFor="email-lbl">Email</Label>\n  <Input id="email-lbl" type="email" />\n  <p className="text-xs text-muted-foreground">\n    Nunca compartilharemos seu email.\n  </p>\n</div>`}
          >
            <div className="grid max-w-sm gap-1.5">
              <Label htmlFor="email-lbl">Email</Label>
              <Input id="email-lbl" type="email" placeholder="voce@empresa.com" />
              <p className="text-xs text-muted-foreground">
                Nunca compartilharemos seu email.
              </p>
            </div>
          </Example>
        </Section>

        <Section
          title="Estado desabilitado"
          description="O Label fica opaco quando o peer está disabled."
        >
          <Example
            code={`<div className="grid max-w-sm gap-1.5">\n  <Input id="campo" className="peer" disabled />\n  <Label htmlFor="campo">Rótulo</Label>\n</div>`}
          >
            <div className="grid max-w-sm gap-1.5">
              <Input id="campo-dis" className="peer" disabled placeholder="..." />
              <Label htmlFor="campo-dis">
                Rótulo (fica opaco quando o input está disabled)
              </Label>
            </div>
          </Example>
        </Section>

        <Section
          title="Obrigatório"
          description="Marque campos obrigatórios com um asterisco."
        >
          <Example
            code={`<Label>\n  Email <span className="text-destructive">*</span>\n</Label>`}
          >
            <div className="grid max-w-sm gap-1.5">
              <Label htmlFor="email-req">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input id="email-req" type="email" required />
            </div>
          </Example>
        </Section>

        <Section
          title="Acessibilidade"
          description="Padrões recomendados."
        >
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>
              Sempre vincule um Label a cada controle via{" "}
              <code className="rounded bg-muted px-1">htmlFor</code> ou
              envolvendo-o diretamente.
            </li>
            <li>
              Clique no Label foca / alterna o controle associado — essencial em
              checkboxes e switches.
            </li>
            <li>
              Não use apenas <code className="rounded bg-muted px-1">placeholder</code>{" "}
              como rótulo — ele some ao digitar.
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
