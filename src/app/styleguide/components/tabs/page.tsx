"use client";

import { BarChart3, Settings, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function TabsShowcase() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Tabs</h1>
        <p className="mt-2 text-muted-foreground">
          Alterna entre painéis de conteúdo relacionados. Construído sobre{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            @base-ui/react/tabs
          </code>
          .
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{`import {\n  Tabs,\n  TabsContent,\n  TabsList,\n  TabsTrigger,\n} from "@/components/ui/tabs"`}</code>
        </pre>
      </header>

      <div className="flex flex-col gap-16">
        <Section title="Básico" description="Variante default — botões em caixa.">
          <Example
            code={`<Tabs defaultValue="conta">\n  <TabsList>\n    <TabsTrigger value="conta">Conta</TabsTrigger>\n    <TabsTrigger value="senha">Senha</TabsTrigger>\n  </TabsList>\n  <TabsContent value="conta">...</TabsContent>\n  <TabsContent value="senha">...</TabsContent>\n</Tabs>`}
          >
            <Tabs defaultValue="conta" className="max-w-md">
              <TabsList>
                <TabsTrigger value="conta">Conta</TabsTrigger>
                <TabsTrigger value="senha">Senha</TabsTrigger>
                <TabsTrigger value="cobranca">Cobrança</TabsTrigger>
              </TabsList>
              <TabsContent value="conta" className="mt-4">
                <p className="text-muted-foreground">
                  Edite seu nome, email e preferências de exibição.
                </p>
              </TabsContent>
              <TabsContent value="senha" className="mt-4">
                <p className="text-muted-foreground">
                  Altere sua senha e habilite autenticação em dois fatores.
                </p>
              </TabsContent>
              <TabsContent value="cobranca" className="mt-4">
                <p className="text-muted-foreground">
                  Gerencie forma de pagamento e histórico de faturas.
                </p>
              </TabsContent>
            </Tabs>
          </Example>
        </Section>

        <Section
          title='Variante "line"'
          description="Mais minimalista — sublinhado na aba ativa."
        >
          <Example
            code={`<TabsList variant="line">\n  <TabsTrigger value="geral">Geral</TabsTrigger>\n  <TabsTrigger value="seguranca">Segurança</TabsTrigger>\n</TabsList>`}
          >
            <Tabs defaultValue="geral" className="max-w-md">
              <TabsList variant="line">
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="seguranca">Segurança</TabsTrigger>
                <TabsTrigger value="avancado">Avançado</TabsTrigger>
              </TabsList>
              <TabsContent value="geral" className="mt-4">
                <p className="text-muted-foreground">
                  Preferências gerais do aplicativo.
                </p>
              </TabsContent>
              <TabsContent value="seguranca" className="mt-4">
                <p className="text-muted-foreground">
                  Sessões ativas e dispositivos conectados.
                </p>
              </TabsContent>
              <TabsContent value="avancado" className="mt-4">
                <p className="text-muted-foreground">
                  Opções de desenvolvedor e flags experimentais.
                </p>
              </TabsContent>
            </Tabs>
          </Example>
        </Section>

        <Section
          title="Com ícones"
          description="Ícones ficam à esquerda do texto."
        >
          <Example>
            <Tabs defaultValue="perfil" className="max-w-md">
              <TabsList>
                <TabsTrigger value="perfil">
                  <User data-icon="inline-start" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="metricas">
                  <BarChart3 data-icon="inline-start" />
                  Métricas
                </TabsTrigger>
                <TabsTrigger value="config">
                  <Settings data-icon="inline-start" />
                  Configurações
                </TabsTrigger>
              </TabsList>
              <TabsContent value="perfil" className="mt-4">
                <p className="text-muted-foreground">Seu perfil público.</p>
              </TabsContent>
              <TabsContent value="metricas" className="mt-4">
                <p className="text-muted-foreground">
                  Gráficos de uso e engajamento.
                </p>
              </TabsContent>
              <TabsContent value="config" className="mt-4">
                <p className="text-muted-foreground">Configurações da conta.</p>
              </TabsContent>
            </Tabs>
          </Example>
        </Section>

        <Section
          title="Orientação vertical"
          description='orientation="vertical" coloca a lista à esquerda.'
        >
          <Example
            code={`<Tabs orientation="vertical" defaultValue="a">\n  <TabsList>\n    <TabsTrigger value="a">Aba A</TabsTrigger>\n    ...\n  </TabsList>\n  <TabsContent value="a">...</TabsContent>\n</Tabs>`}
          >
            <Tabs
              orientation="vertical"
              defaultValue="a"
              className="min-h-40 w-full"
            >
              <TabsList>
                <TabsTrigger value="a">Aba A</TabsTrigger>
                <TabsTrigger value="b">Aba B</TabsTrigger>
                <TabsTrigger value="c">Aba C</TabsTrigger>
              </TabsList>
              <TabsContent value="a" className="p-4">
                <p className="text-muted-foreground">Conteúdo da aba A.</p>
              </TabsContent>
              <TabsContent value="b" className="p-4">
                <p className="text-muted-foreground">Conteúdo da aba B.</p>
              </TabsContent>
              <TabsContent value="c" className="p-4">
                <p className="text-muted-foreground">Conteúdo da aba C.</p>
              </TabsContent>
            </Tabs>
          </Example>
        </Section>

        <Section title="Com aba desabilitada">
          <Example>
            <Tabs defaultValue="livre" className="max-w-md">
              <TabsList>
                <TabsTrigger value="livre">Grátis</TabsTrigger>
                <TabsTrigger value="pro">Pro</TabsTrigger>
                <TabsTrigger value="enterprise" disabled>
                  Enterprise (em breve)
                </TabsTrigger>
              </TabsList>
              <TabsContent value="livre" className="mt-4">
                <p className="text-muted-foreground">
                  Uso pessoal com limites básicos.
                </p>
              </TabsContent>
              <TabsContent value="pro" className="mt-4">
                <p className="text-muted-foreground">
                  Mais recursos para times pequenos.
                </p>
              </TabsContent>
            </Tabs>
          </Example>
        </Section>

        <Section title="Subcomponentes">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-2">Componente</th>
                  <th className="px-4 py-2">Props</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">Tabs</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    value, defaultValue, onValueChange, orientation
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">TabsList</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    variant (default · line)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">TabsTrigger</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    value (obrigatório), disabled
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">TabsContent</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    value (obrigatório)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          title="Acessibilidade"
          description="Navegação por teclado automática via base-ui."
        >
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>← → alternam entre abas (horizontal); ↑ ↓ no modo vertical.</li>
            <li>Home / End saltam para a primeira / última aba.</li>
            <li>Apenas a aba ativa fica no Tab order; o painel ativo é focável.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
