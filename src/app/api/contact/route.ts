import { Resend } from "resend";
import { CONTACT_FORM_TO } from "@/content/contact";

// Variáveis de ambiente esperadas (em .env.local, nunca commitado):
//   RESEND_API_KEY=re_xxx
//   RESEND_FROM=contato@trcx.com.br    (domínio precisa estar verificado na Resend)
//   CONTACT_TO=wesley@trcx.com.br      (opcional — fallback é CONTACT_FORM_TO)

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot — bots tendem a preencher este campo invisível. */
  website?: unknown;
};

const MAX_NAME = 100;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function bad(message: string, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return bad("Invalid JSON");
  }

  // Honeypot: se o bot preencheu, finge que deu certo e descarta.
  if (typeof body.website === "string" && body.website.length > 0) {
    return Response.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > MAX_NAME) return bad("Nome inválido");
  if (!email || !isEmail(email)) return bad("E-mail inválido");
  if (!subject || subject.length > MAX_SUBJECT) return bad("Assunto inválido");
  if (!message || message.length > MAX_MESSAGE) return bad("Mensagem inválida");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.CONTACT_TO || CONTACT_FORM_TO;

  if (!apiKey || !from) {
    const missing = [!apiKey && "RESEND_API_KEY", !from && "RESEND_FROM"]
      .filter(Boolean)
      .join(", ");
    console.warn(`[contact] envs ausentes: ${missing}`);
    return Response.json(
      { ok: false, error: "not-configured", missing },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[trcx.com.br] ${subject}`,
      text: `${name} <${email}>\n\n${message}`,
    });
    if (error) return bad(error.message ?? "send-failed", 502);
    return Response.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "send-failed";
    return bad(msg, 502);
  }
}
