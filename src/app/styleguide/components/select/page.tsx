"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <div className="flex flex-wrap items-start gap-4 rounded-lg border bg-card p-6">
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

export default function SelectShowcase() {
  const [fruta, setFruta] = useState<string | null>("maca");

  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Select</h1>
        <p className="mt-2 text-muted-foreground">
          Combobox para escolher um valor em uma lista. Construído sobre{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">@base-ui/react</code>.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{`import {\n  Select,\n  SelectContent,\n  SelectGroup,\n  SelectItem,\n  SelectLabel,\n  SelectSeparator,\n  SelectTrigger,\n  SelectValue,\n} from "@/components/ui/select"`}</code>
        </pre>
      </header>

      <div className="flex flex-col gap-16">
        <Section title="Básico" description="Uma lista simples com placeholder.">
          <Example
            code={`<Select>\n  <SelectTrigger className="w-48">\n    <SelectValue placeholder="Selecione uma fruta" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="maca">Maçã</SelectItem>\n    <SelectItem value="banana">Banana</SelectItem>\n    <SelectItem value="laranja">Laranja</SelectItem>\n  </SelectContent>\n</Select>`}
          >
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecione uma fruta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maca">Maçã</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="laranja">Laranja</SelectItem>
                <SelectItem value="uva">Uva</SelectItem>
                <SelectItem value="pera">Pera</SelectItem>
              </SelectContent>
            </Select>
          </Example>
        </Section>

        <Section
          title="Controlado"
          description="Use value + onValueChange para gerenciar o estado externamente."
        >
          <Example
            code={`const [fruta, setFruta] = useState("maca")\n\n<Select value={fruta} onValueChange={setFruta}>\n  <SelectTrigger>\n    <SelectValue />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="maca">Maçã</SelectItem>\n    <SelectItem value="banana">Banana</SelectItem>\n  </SelectContent>\n</Select>`}
          >
            <div className="flex flex-col gap-2">
              <Select
                value={fruta ?? undefined}
                onValueChange={(v) => setFruta(v == null ? null : String(v))}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maca">Maçã</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="laranja">Laranja</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-xs text-muted-foreground">
                Valor:{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
                  {fruta ?? "null"}
                </code>
              </div>
            </div>
          </Example>
        </Section>

        <Section
          title="Tamanhos"
          description='SelectTrigger aceita size="sm" ou "default".'
        >
          <Example
            code={`<SelectTrigger size="sm">...\n<SelectTrigger size="default">...`}
          >
            <Select>
              <SelectTrigger size="sm" className="w-40">
                <SelectValue placeholder="Small" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Opção A</SelectItem>
                <SelectItem value="b">Opção B</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger size="default" className="w-40">
                <SelectValue placeholder="Padrão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Opção A</SelectItem>
                <SelectItem value="b">Opção B</SelectItem>
              </SelectContent>
            </Select>
          </Example>
        </Section>

        <Section
          title="Com grupos e separadores"
          description="Agrupe itens relacionados usando SelectGroup e SelectLabel."
        >
          <Example
            code={`<SelectContent>\n  <SelectGroup>\n    <SelectLabel>Frutas</SelectLabel>\n    <SelectItem value="maca">Maçã</SelectItem>\n    <SelectItem value="banana">Banana</SelectItem>\n  </SelectGroup>\n  <SelectSeparator />\n  <SelectGroup>\n    <SelectLabel>Legumes</SelectLabel>\n    <SelectItem value="cenoura">Cenoura</SelectItem>\n    <SelectItem value="batata">Batata</SelectItem>\n  </SelectGroup>\n</SelectContent>`}
          >
            <Select>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Selecione um alimento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Frutas</SelectLabel>
                  <SelectItem value="maca">Maçã</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="laranja">Laranja</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Legumes</SelectLabel>
                  <SelectItem value="cenoura">Cenoura</SelectItem>
                  <SelectItem value="batata">Batata</SelectItem>
                  <SelectItem value="brocolis">Brócolis</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Example>
        </Section>

        <Section
          title="Estados"
          description="Desabilitado, item desabilitado e aria-invalid."
        >
          <Example label="Select desabilitado">
            <Select disabled defaultValue="a">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Opção A</SelectItem>
              </SelectContent>
            </Select>
          </Example>
          <div className="mt-4">
            <Example label="Item desabilitado">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Grátis</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="enterprise" disabled>
                    Enterprise (em breve)
                  </SelectItem>
                </SelectContent>
              </Select>
            </Example>
          </div>
          <div className="mt-4">
            <Example label="Erro de validação (aria-invalid)">
              <Select>
                <SelectTrigger aria-invalid className="w-48">
                  <SelectValue placeholder="Campo obrigatório" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Opção A</SelectItem>
                  <SelectItem value="b">Opção B</SelectItem>
                </SelectContent>
              </Select>
            </Example>
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
                  <td className="px-4 py-2 font-mono text-xs">Select</td>
                  <td className="px-4 py-2">
                    Raiz controlada (<code>value</code>, <code>onValueChange</code>).
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">SelectTrigger</td>
                  <td className="px-4 py-2">
                    Botão que abre o popup; aceita <code>size</code> (<code>sm</code>,{" "}
                    <code>default</code>).
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">SelectValue</td>
                  <td className="px-4 py-2">
                    Exibe o valor atual ou o <code>placeholder</code>.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">SelectContent</td>
                  <td className="px-4 py-2">
                    Popup posicionado; aceita <code>side</code>, <code>align</code>,{" "}
                    <code>sideOffset</code>.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">SelectItem</td>
                  <td className="px-4 py-2">
                    Opção selecionável; aceita <code>disabled</code>.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">SelectGroup</td>
                  <td className="px-4 py-2">Agrupa itens relacionados.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">SelectLabel</td>
                  <td className="px-4 py-2">Rótulo não selecionável do grupo.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">SelectSeparator</td>
                  <td className="px-4 py-2">Linha divisória entre grupos.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          title="Acessibilidade"
          description="Comportamento herdado do base-ui."
        >
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Enter / Espaço / ↓ abrem o popup quando o trigger está focado.</li>
            <li>Setas navegam pelos itens; digitar filtra por prefixo.</li>
            <li>Esc fecha o popup e devolve o foco ao trigger.</li>
            <li>
              Sempre vincule um <code className="rounded bg-muted px-1">&lt;label&gt;</code> ao
              trigger ou forneça <code>aria-label</code>.
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
