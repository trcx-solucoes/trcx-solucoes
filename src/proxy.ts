import { NextResponse, type NextRequest } from "next/server";

// Next 16 renomeou middleware → proxy.
// Doc: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md
//
// Redireciona qualquer path sem prefixo de locale para o locale preferido
// (Accept-Language → fallback 'pt'). Mantém o styleguide e a API fora do i18n.

const LOCALES = ["pt", "en"] as const;
const DEFAULT_LOCALE: (typeof LOCALES)[number] = "pt";

function detectLocale(req: NextRequest): (typeof LOCALES)[number] {
  const header = req.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const tag = part.trim().split(";")[0].toLowerCase();
    const short = tag.split("-")[0] as (typeof LOCALES)[number];
    if ((LOCALES as readonly string[]).includes(short)) return short;
  }
  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Exclui rotas internas, API, styleguide e qualquer arquivo estático (com ponto).
  matcher: ["/((?!_next|api|styleguide|favicon.ico|.*\\..*).*)"],
};
