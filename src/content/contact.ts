import type { Locale } from "@/app/[lang]/dictionaries";

// Registry central dos canais de contato. Localizado por idioma — os textos
// (label/hint/mensagem padrão) trocam conforme o locale ativo.

export type ContactChannelKey =
  | "email"
  | "whatsapp"
  | "telegram"
  | "linkedin"
  | "github"
  | "instagram"
  | "x"
  | "youtube"
  | "website";

export type ContactChannel = {
  key: ContactChannelKey;
  /** Texto principal exibido (ex.: "wesley@trcx.com.br" ou "@trcx"). */
  label: string;
  /** URL completa do destino (mailto:, https://wa.me/..., https://linkedin.com/...). */
  href: string;
  /** Texto pequeno abaixo do label (ex.: "Resposta em até 24h"). */
  hint?: string;
};

const WHATSAPP_NUMBER = "5511914045769";

const WHATSAPP_MESSAGE: Record<Locale, string> = {
  pt: "Olá Wesley, estou entrando em contato a partir do site www.trcx.com.br e gostaria de conversar sobre um projeto.",
  en: "Hi Wesley, I'm reaching out through the website www.trcx.com.br and would like to discuss a project.",
};

const HINTS: Record<ContactChannelKey, Record<Locale, string>> = {
  email: { pt: "Resposta em até 24h", en: "Reply within 24h" },
  whatsapp: { pt: "Resposta direta", en: "Direct reply" },
  telegram: { pt: "Mensagem direta", en: "Direct message" },
  linkedin: { pt: "Rede profissional", en: "Professional network" },
  github: { pt: "Código aberto", en: "Open source" },
  instagram: { pt: "Bastidores", en: "Behind the scenes" },
  x: { pt: "Atualizações", en: "Updates" },
  youtube: { pt: "Vídeos", en: "Videos" },
  website: { pt: "Site institucional", en: "Institutional site" },
};

function whatsappHref(locale: Locale): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE[locale])}`;
}

export function getContactChannels(locale: Locale): ContactChannel[] {
  const channels: ContactChannel[] = [
    {
      key: "email",
      label: "wesley@trcx.com.br",
      href: "mailto:wesley@trcx.com.br",
      hint: HINTS.email[locale],
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      href: whatsappHref(locale),
      hint: HINTS.whatsapp[locale],
    },
    {
      key: "telegram",
      label: "@wesleytrcx",
      href: "https://t.me/wesleytrcx",
      hint: HINTS.telegram[locale],
    },
    {
      key: "linkedin",
      label: "linkedin.com/in/trcx",
      href: "https://www.linkedin.com/in/trcx/",
      hint: HINTS.linkedin[locale],
    },
    {
      key: "github",
      label: "github.com/wtrcx",
      href: "https://github.com/wtrcx",
      hint: HINTS.github[locale],
    },
    {
      key: "instagram",
      label: "@trcx.solucoes",
      href: "https://www.instagram.com/trcx.solucoes/",
      hint: locale === "pt" ? "Instagram corporativo" : "Corporate Instagram",
    },
    {
      key: "instagram",
      label: "@w.trcx",
      href: "https://www.instagram.com/w.trcx",
      hint: locale === "pt" ? "Instagram pessoal" : "Personal Instagram",
    },
    {
      key: "x",
      label: "@wesleytrcx",
      href: "https://x.com/wesleytrcx",
      hint: HINTS.x[locale],
    },
    // Preencher quando confirmados:
    // { key: "instagram", label: "@<handle>",                href: "https://instagram.com/<handle>",       hint: HINTS.instagram[locale] },
    // { key: "x",         label: "@<handle>",                href: "https://x.com/<handle>",               hint: HINTS.x[locale] },
    // { key: "youtube",   label: "@<handle>",                href: "https://youtube.com/@<handle>",        hint: HINTS.youtube[locale] },
  ];
  return channels;
}

/** Endereço pra onde o formulário envia (usado pelo /api/contact). */
export const CONTACT_FORM_TO = "wesley@trcx.com.br";
