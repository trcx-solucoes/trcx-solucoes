"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Lock, Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.69.41.35.78 1.05.78 2.11v3.13c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "success"; email: string };

export default function LoginExample() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(true);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !senha) return;

    setStatus({ kind: "loading" });
    await new Promise((r) => setTimeout(r, 1200));

    if (email === "erro@teste.com") {
      setStatus({
        kind: "error",
        message: "Email ou senha inválidos. Verifique e tente novamente.",
      });
      return;
    }
    setStatus({ kind: "success", email });
  }

  const loading = status.kind === "loading";
  const emailInvalido = status.kind === "error";

  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Login</h1>
        <p className="mt-2 text-muted-foreground">
          Composição funcional usando Card, Input, Label, Checkbox, Button,
          Alert e Separator. Tente{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            erro@teste.com
          </code>{" "}
          para ver o estado de erro.
        </p>
      </header>

      <div className="flex flex-col gap-16">
        <Section title="Preview">
          <div className="flex min-h-[560px] items-center justify-center rounded-xl border bg-muted/40 p-8">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Lock className="size-5" />
                </div>
                <CardTitle className="text-xl">Acesse sua conta</CardTitle>
                <CardDescription>
                  Bem-vindo de volta ao Template Inicial.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {status.kind === "success" ? (
                  <Alert>
                    <CheckCircle2 className="text-[color:var(--success)]" />
                    <AlertDescription>
                      Autenticado como{" "}
                      <span className="font-medium text-foreground">
                        {status.email}
                      </span>
                      . (Exemplo — nada foi enviado.)
                    </AlertDescription>
                  </Alert>
                ) : (
                  <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    {status.kind === "error" && (
                      <Alert variant="destructive">
                        <AlertDescription>{status.message}</AlertDescription>
                      </Alert>
                    )}

                    <div className="grid gap-1.5">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          autoComplete="email"
                          required
                          disabled={loading}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="voce@empresa.com"
                          aria-invalid={emailInvalido || undefined}
                          className="pl-8"
                        />
                      </div>
                    </div>

                    <div className="grid gap-1.5">
                      <div className="flex items-baseline justify-between">
                        <Label htmlFor="login-senha">Senha</Label>
                        <a
                          href="#esqueci"
                          className="text-xs text-primary hover:underline"
                        >
                          Esqueci minha senha
                        </a>
                      </div>
                      <Input
                        id="login-senha"
                        type="password"
                        autoComplete="current-password"
                        required
                        disabled={loading}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="••••••••"
                        aria-invalid={emailInvalido || undefined}
                      />
                    </div>

                    <Label>
                      <Checkbox
                        checked={lembrar}
                        onCheckedChange={(v) => setLembrar(v === true)}
                        disabled={loading}
                      />
                      Lembrar-me neste dispositivo
                    </Label>

                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? (
                        <>
                          <Loader2
                            data-icon="inline-start"
                            className="animate-spin"
                          />
                          Entrando...
                        </>
                      ) : (
                        "Entrar"
                      )}
                    </Button>

                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <Separator className="flex-1" />
                      <span>Ou continue com</span>
                      <Separator className="flex-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={loading}
                      >
                        <GoogleIcon className="size-4" />
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={loading}
                      >
                        <GithubIcon className="size-4" />
                        GitHub
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>

              <CardFooter className="justify-center text-xs text-muted-foreground">
                Ainda não tem uma conta?{" "}
                <a
                  href="#cadastro"
                  className="ml-1 font-medium text-primary hover:underline"
                >
                  Criar conta
                </a>
              </CardFooter>
            </Card>
          </div>
          {status.kind !== "idle" && (
            <div className="mt-3 flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStatus({ kind: "idle" });
                  setEmail("");
                  setSenha("");
                }}
              >
                Resetar exemplo
              </Button>
            </div>
          )}
        </Section>

        <Section
          title="Componentes usados"
          description="Cada peça deste exemplo vem direto do sistema de design."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                nome: "Card",
                uso: "Contêiner do formulário (Header, Content, Footer).",
              },
              { nome: "Input", uso: "Campos de email e senha." },
              { nome: "Label", uso: "Rótulos acessíveis e checkbox envolvido." },
              { nome: "Checkbox", uso: "Opção “Lembrar-me”." },
              {
                nome: "Button",
                uso: "Submit principal + providers sociais (variant outline).",
              },
              {
                nome: "Separator",
                uso: "Divisor com o texto “Ou continue com”.",
              },
              {
                nome: "Alert",
                uso: "Feedback de erro de autenticação e sucesso.",
              },
            ].map((c) => (
              <div
                key={c.nome}
                className="flex flex-col gap-1 rounded-lg border bg-card p-3"
              >
                <span className="font-mono text-sm font-medium">{c.nome}</span>
                <span className="text-xs text-muted-foreground">{c.uso}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Padrões aplicados"
          description="Boas práticas refletidas neste exemplo."
        >
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            <li>
              <span className="text-foreground">Autocomplete:</span>{" "}
              <code className="rounded bg-muted px-1">email</code> e{" "}
              <code className="rounded bg-muted px-1">current-password</code>{" "}
              ajudam gerenciadores de senha.
            </li>
            <li>
              <span className="text-foreground">Estado de carregamento:</span>{" "}
              campos e botões ficam{" "}
              <code className="rounded bg-muted px-1">disabled</code> enquanto a
              requisição roda — evita cliques duplicados.
            </li>
            <li>
              <span className="text-foreground">Erro inline:</span> usa{" "}
              <code className="rounded bg-muted px-1">
                Alert variant=&quot;destructive&quot;
              </code>{" "}
              + <code className="rounded bg-muted px-1">aria-invalid</code> nos
              campos para anunciar falha a leitores de tela.
            </li>
            <li>
              <span className="text-foreground">Hierarquia visual:</span> botão
              primário de largura total, providers sociais secundários em grade
              de 2 colunas.
            </li>
            <li>
              <span className="text-foreground">Link de recuperação:</span>{" "}
              posicionado ao lado do rótulo da senha, padrão reconhecido pelos
              usuários.
            </li>
            <li>
              <span className="text-foreground">Tema reativo:</span> o ícone do
              logotipo, o botão primário e o foco usam{" "}
              <code className="rounded bg-muted px-1">--primary</code> — trocar
              o tema no seletor muda o visual do exemplo em tempo real.
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
