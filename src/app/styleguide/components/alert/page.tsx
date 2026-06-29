"use client";

import {
  CheckCircle2,
  CircleAlert,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

export default function AlertShowcase() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Alert</h1>
        <p className="mt-2 text-muted-foreground">
          Mensagem de atenção embutida no fluxo da página. Use um ícone no início
          para indicar a intenção.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{`import {\n  Alert,\n  AlertAction,\n  AlertDescription,\n  AlertTitle,\n} from "@/components/ui/alert"`}</code>
        </pre>
      </header>

      <div className="flex flex-col gap-16">
        <Section
          title="Variantes"
          description="Duas variantes base: default e destructive."
        >
          <Example
            code={`<Alert>\n  <Info />\n  <AlertTitle>Nota</AlertTitle>\n  <AlertDescription>Mensagem informativa.</AlertDescription>\n</Alert>\n\n<Alert variant="destructive">\n  <CircleAlert />\n  <AlertTitle>Erro</AlertTitle>\n  <AlertDescription>Algo deu errado.</AlertDescription>\n</Alert>`}
          >
            <Alert>
              <Info />
              <AlertTitle>Atualização disponível</AlertTitle>
              <AlertDescription>
                Uma nova versão do sistema já pode ser instalada.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <CircleAlert />
              <AlertTitle>Falha ao salvar</AlertTitle>
              <AlertDescription>
                Não foi possível persistir as alterações. Tente novamente.
              </AlertDescription>
            </Alert>
          </Example>
        </Section>

        <Section
          title="Intenções semânticas"
          description="Combine a variante default com ícones e cores dos tokens semânticos."
        >
          <Example
            code={`<Alert>\n  <CheckCircle2 className="text-[color:var(--success)]" />\n  <AlertTitle>Sucesso</AlertTitle>\n  <AlertDescription>Operação concluída.</AlertDescription>\n</Alert>`}
          >
            <Alert>
              <CheckCircle2 className="text-[color:var(--success)]" />
              <AlertTitle>Sucesso</AlertTitle>
              <AlertDescription>
                Seus dados foram salvos com êxito.
              </AlertDescription>
            </Alert>
            <Alert>
              <TriangleAlert className="text-[color:var(--warning)]" />
              <AlertTitle>Atenção</AlertTitle>
              <AlertDescription>
                Esta ação não poderá ser desfeita.
              </AlertDescription>
            </Alert>
            <Alert>
              <Info className="text-[color:var(--info)]" />
              <AlertTitle>Informação</AlertTitle>
              <AlertDescription>
                Você pode desativar esta notificação nas preferências.
              </AlertDescription>
            </Alert>
          </Example>
        </Section>

        <Section
          title="Com action"
          description="AlertAction posiciona um elemento no canto superior direito."
        >
          <Example
            code={`<Alert>\n  <Info />\n  <AlertTitle>Nova mensagem</AlertTitle>\n  <AlertDescription>Você tem 3 mensagens não lidas.</AlertDescription>\n  <AlertAction>\n    <Button variant="ghost" size="icon-sm" aria-label="Fechar">\n      <X />\n    </Button>\n  </AlertAction>\n</Alert>`}
          >
            <Alert>
              <Info />
              <AlertTitle>Nova mensagem</AlertTitle>
              <AlertDescription>
                Você tem 3 mensagens não lidas na caixa de entrada.
              </AlertDescription>
              <AlertAction>
                <Button variant="ghost" size="icon-sm" aria-label="Fechar">
                  <X />
                </Button>
              </AlertAction>
            </Alert>
          </Example>
        </Section>

        <Section
          title="Só descrição"
          description="Omita AlertTitle quando a mensagem for curta."
        >
          <Example
            code={`<Alert>\n  <Info />\n  <AlertDescription>Sessão expira em 5 minutos.</AlertDescription>\n</Alert>`}
          >
            <Alert>
              <Info />
              <AlertDescription>
                Sessão expira em 5 minutos. Salve seu trabalho.
              </AlertDescription>
            </Alert>
          </Example>
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
                  <td className="px-4 py-2 font-mono text-xs">Alert</td>
                  <td className="px-4 py-2">
                    Raiz com <code>role=&quot;alert&quot;</code>; aceita{" "}
                    <code>variant</code> (<code>default</code> ou{" "}
                    <code>destructive</code>).
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">AlertTitle</td>
                  <td className="px-4 py-2">Título curto.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">AlertDescription</td>
                  <td className="px-4 py-2">Texto da mensagem.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">AlertAction</td>
                  <td className="px-4 py-2">
                    Slot no canto superior direito (ex.: botão fechar).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          title="Acessibilidade"
          description="Comportamento de leitura e foco."
        >
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>
              Alert tem <code className="rounded bg-muted px-1">role=&quot;alert&quot;</code> —
              leitores de tela anunciam imediatamente.
            </li>
            <li>
              Ícones são decorativos. Use texto claro em{" "}
              <code className="rounded bg-muted px-1">AlertTitle</code>.
            </li>
            <li>
              Para alertas temporários (toast), use um componente dedicado — este é
              embutido, não dispensável por padrão.
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
