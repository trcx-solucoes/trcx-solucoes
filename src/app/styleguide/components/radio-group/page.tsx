"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

export default function RadioGroupShowcase() {
  const [plano, setPlano] = useState<string>("pro");

  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Radio Group</h1>
        <p className="mt-2 text-muted-foreground">
          Seleção única entre várias opções mutuamente exclusivas. Construído
          sobre <code className="rounded bg-muted px-1 py-0.5 text-xs">@base-ui/react</code>.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{`import {\n  RadioGroup,\n  RadioGroupItem,\n} from "@/components/ui/radio-group"`}</code>
        </pre>
      </header>

      <div className="flex flex-col gap-16">
        <Section title="Básico" description="Três opções com defaultValue.">
          <Example
            code={`<RadioGroup defaultValue="confortavel">\n  <label className="flex items-center gap-3 text-sm">\n    <RadioGroupItem value="padrao" /> Espaçamento padrão\n  </label>\n  <label className="flex items-center gap-3 text-sm">\n    <RadioGroupItem value="confortavel" /> Espaçamento confortável\n  </label>\n  <label className="flex items-center gap-3 text-sm">\n    <RadioGroupItem value="compacto" /> Espaçamento compacto\n  </label>\n</RadioGroup>`}
          >
            <RadioGroup defaultValue="confortavel" className="max-w-sm">
              <label className="flex items-center gap-3 text-sm">
                <RadioGroupItem value="padrao" />
                Espaçamento padrão
              </label>
              <label className="flex items-center gap-3 text-sm">
                <RadioGroupItem value="confortavel" />
                Espaçamento confortável
              </label>
              <label className="flex items-center gap-3 text-sm">
                <RadioGroupItem value="compacto" />
                Espaçamento compacto
              </label>
            </RadioGroup>
          </Example>
        </Section>

        <Section
          title="Controlado"
          description="Usando value e onValueChange para controlar o estado externo."
        >
          <Example
            code={`const [plano, setPlano] = useState("pro")\n\n<RadioGroup value={plano} onValueChange={setPlano}>\n  <label><RadioGroupItem value="free" /> Grátis</label>\n  <label><RadioGroupItem value="pro" /> Pro</label>\n  <label><RadioGroupItem value="enterprise" /> Enterprise</label>\n</RadioGroup>`}
          >
            <RadioGroup
              value={plano}
              onValueChange={(v) => setPlano(String(v))}
              className="max-w-sm"
            >
              {[
                { v: "free", label: "Grátis", desc: "Para projetos pessoais" },
                { v: "pro", label: "Pro", desc: "Para times pequenos" },
                {
                  v: "enterprise",
                  label: "Enterprise",
                  desc: "Recursos avançados e suporte",
                },
              ].map((o) => (
                <label
                  key={o.v}
                  className="flex cursor-pointer items-start gap-3 rounded-md border p-3 hover:bg-muted/50 has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary/5"
                >
                  <RadioGroupItem value={o.v} className="mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{o.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {o.desc}
                    </span>
                  </div>
                </label>
              ))}
            </RadioGroup>
            <div className="mt-4 text-xs text-muted-foreground">
              Valor selecionado:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
                {plano}
              </code>
            </div>
          </Example>
        </Section>

        <Section
          title="Estados"
          description="Desabilitado individual, grupo inteiro desabilitado e aria-invalid."
        >
          <Example label="Item desabilitado">
            <RadioGroup defaultValue="b" className="max-w-sm">
              <label className="flex items-center gap-3 text-sm">
                <RadioGroupItem value="a" />
                Opção A
              </label>
              <label className="flex items-center gap-3 text-sm opacity-70">
                <RadioGroupItem value="b" disabled />
                Opção B (desabilitada)
              </label>
              <label className="flex items-center gap-3 text-sm">
                <RadioGroupItem value="c" />
                Opção C
              </label>
            </RadioGroup>
          </Example>
          <div className="mt-4">
            <Example label="Grupo inteiro desabilitado">
              <RadioGroup defaultValue="a" disabled className="max-w-sm">
                <label className="flex items-center gap-3 text-sm">
                  <RadioGroupItem value="a" />
                  Opção A
                </label>
                <label className="flex items-center gap-3 text-sm">
                  <RadioGroupItem value="b" />
                  Opção B
                </label>
              </RadioGroup>
            </Example>
          </div>
          <div className="mt-4">
            <Example label="Erro de validação (aria-invalid)">
              <RadioGroup aria-invalid className="max-w-sm">
                <label className="flex items-center gap-3 text-sm">
                  <RadioGroupItem value="a" aria-invalid />
                  Opção A
                </label>
                <label className="flex items-center gap-3 text-sm">
                  <RadioGroupItem value="b" aria-invalid />
                  Opção B
                </label>
              </RadioGroup>
              <p className="mt-2 text-xs text-destructive">
                Selecione uma opção para continuar.
              </p>
            </Example>
          </div>
        </Section>

        <Section title="Props">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-2">Componente</th>
                  <th className="px-4 py-2">Prop</th>
                  <th className="px-4 py-2">Tipo</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">RadioGroup</td>
                  <td className="px-4 py-2 font-mono text-xs">defaultValue</td>
                  <td className="px-4 py-2 font-mono text-xs">string</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">RadioGroup</td>
                  <td className="px-4 py-2 font-mono text-xs">value</td>
                  <td className="px-4 py-2 font-mono text-xs">string</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">RadioGroup</td>
                  <td className="px-4 py-2 font-mono text-xs">onValueChange</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    (value: string) =&gt; void
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">RadioGroup</td>
                  <td className="px-4 py-2 font-mono text-xs">disabled</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">RadioGroupItem</td>
                  <td className="px-4 py-2 font-mono text-xs">value</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    string (obrigatório)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">RadioGroupItem</td>
                  <td className="px-4 py-2 font-mono text-xs">disabled</td>
                  <td className="px-4 py-2 font-mono text-xs">boolean</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          title="Acessibilidade"
          description="Navegação por teclado provida pelo base-ui."
        >
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>
              Setas (↑ ↓ ← →) movem o foco e selecionam dentro do grupo.
            </li>
            <li>
              Tab entra/sai do grupo; apenas o item selecionado é focável por
              padrão.
            </li>
            <li>
              Sempre envolva <code className="rounded bg-muted px-1">RadioGroupItem</code>{" "}
              com uma <code>label</code> ou use <code>aria-labelledby</code>.
            </li>
            <li>
              Forneça um label para o grupo inteiro (ex.: com{" "}
              <code className="rounded bg-muted px-1">&lt;legend&gt;</code> ou{" "}
              <code>aria-label</code>).
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
