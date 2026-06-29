import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/content/site";
import { hasLocale, type Locale } from "./dictionaries";

// Geração dinâmica da imagem Open Graph por locale.
// Saída: /<lang>/opengraph-image.png (1200×630)
//
// Doc: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE.ogImage.alt;

export function generateStaticParams() {
  return SITE.locales.map((lang) => ({ lang }));
}

async function fileToDataUri(relPath: string, mime: string): Promise<string> {
  // Satori (engine do next/og) só decodifica PNG/JPG/GIF/SVG — WebP não passa.
  // Versões PNG/JPG dos assets ficam em public/images/ ao lado dos WebPs.
  const buf = await readFile(join(process.cwd(), "public", relPath));
  return `data:${mime};base64,${buf.toString("base64")}`;
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : SITE.defaultLocale;

  const headline =
    locale === "pt"
      ? "Soluções digitais sob medida"
      : "Tailor-made digital solutions";
  const subline =
    locale === "pt"
      ? "Engenharia de software · arquitetura de sistemas"
      : "Software engineering · systems architecture";
  const tag = locale === "pt" ? "Portfólio técnico" : "Technical portfolio";

  const [logoHorizontal, logoVertical, photo] = await Promise.all([
    fileToDataUri("images/horizontal-logo.png", "image/png"),
    fileToDataUri("images/vertical-logo.png", "image/png"),
    fileToDataUri(
      "images/wesley-xavier/terno-preto-busto-sq.jpg",
      "image/jpeg",
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #f0f4ff 0%, #dde6ff 50%, #b8caff 100%)",
          position: "relative",
          fontFamily: "sans-serif",
          color: "#1a2342",
        }}
      >
        {/* Watermark logo */}
        <div
          style={{
            position: "absolute",
            right: -60,
            top: -40,
            opacity: 0.08,
            display: "flex",
          }}
        >
          <img src={logoVertical} width={520} height={593} alt="" />
        </div>

        {/* Photo to the right */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 320,
              height: 320,
              borderRadius: 20,
              overflow: "hidden",
              display: "flex",
              boxShadow: "0 24px 48px rgba(26, 35, 66, 0.18)",
              border: "4px solid rgba(255, 255, 255, 0.9)",
            }}
          >
            <img
              src={photo}
              width={320}
              height={320}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Text column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 80px",
            width: "65%",
            height: "100%",
            zIndex: 1,
          }}
        >
          <img src={logoHorizontal} width={180} height={51} alt="" />

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span
              style={{
                fontSize: 22,
                color: "#3b4d8a",
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
            <span
              style={{
                fontSize: 64,
                fontWeight: 800,
                lineHeight: 1.05,
                color: "#0f1a3a",
                letterSpacing: -1.5,
                maxWidth: 620,
              }}
            >
              Wesley Xavier
            </span>
            <span
              style={{
                fontSize: 36,
                fontWeight: 600,
                lineHeight: 1.2,
                color: "#1a2342",
                maxWidth: 620,
              }}
            >
              {headline}
            </span>
            <span
              style={{
                fontSize: 22,
                color: "#3b4d8a",
                maxWidth: 620,
              }}
            >
              {subline}
            </span>
          </div>

          <span
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: "#3b4d8a",
              letterSpacing: 1,
            }}
          >
            www.trcx.com.br
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
