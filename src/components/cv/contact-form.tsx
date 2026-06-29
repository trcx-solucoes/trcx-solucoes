"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CONTACT_FORM_TO } from "@/content/contact";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Form = Dictionary["contact"]["form"];
type Status = "idle" | "submitting" | "success" | "error";

function buildMailto(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const body = `${data.name} <${data.email}>\n\n${data.message}`;
  const params = new URLSearchParams({
    subject: `[trcx.com.br] ${data.subject}`,
    body,
  });
  return `mailto:${CONTACT_FORM_TO}?${params.toString()}`;
}

export function ContactForm({ dict }: { dict: Form }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Captura o form antes do await — depois do await, e.currentTarget pode
    // virar null (React libera a referência ao SyntheticEvent), e .reset()
    // disparava TypeError que era interpretado como falha de rede.
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""), // honeypot
    };

    setStatus("submitting");
    setErrorMsg(null);

    let res: Response;
    try {
      res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // Sem rede → fallback mailto:
      window.location.href = buildMailto(data);
      setStatus("idle");
      return;
    }

    if (res.ok) {
      form.reset();
      setStatus("success");
      return;
    }

    // Resend não configurado → fallback mailto:
    if (res.status === 503) {
      window.location.href = buildMailto(data);
      setStatus("idle");
      return;
    }

    const payload = await res.json().catch(() => ({}));
    setErrorMsg(payload?.error ?? dict.errorGeneric);
    setStatus("error");
  }

  if (status === "success") {
    return (
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="flex items-start gap-3 py-6">
          <CheckCircle2 className="size-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm">{dict.success}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{dict.heading}</CardTitle>
        <p className="text-sm text-muted-foreground">{dict.description}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute -left-[9999px] size-0 opacity-0"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">{dict.name}</Label>
              <Input
                id="name"
                name="name"
                required
                maxLength={100}
                placeholder={dict.namePlaceholder}
                disabled={status === "submitting"}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">{dict.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder={dict.emailPlaceholder}
                disabled={status === "submitting"}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="subject">{dict.subject}</Label>
            <Input
              id="subject"
              name="subject"
              required
              maxLength={200}
              placeholder={dict.subjectPlaceholder}
              disabled={status === "submitting"}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="message">{dict.message}</Label>
            <Textarea
              id="message"
              name="message"
              required
              maxLength={5000}
              rows={6}
              placeholder={dict.messagePlaceholder}
              disabled={status === "submitting"}
            />
          </div>

          {status === "error" && errorMsg && (
            <p className="text-sm text-destructive">{errorMsg}</p>
          )}

          <Button
            type="submit"
            disabled={status === "submitting"}
            className="w-fit"
          >
            <Send className="size-3.5" />
            {status === "submitting" ? dict.submitting : dict.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
