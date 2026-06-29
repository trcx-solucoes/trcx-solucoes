import { ViewTransition, type ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LOCALES,
  getDictionary,
  hasLocale,
} from "./dictionaries";
import { SiteHeader } from "@/components/cv/site-header";
import { SiteFooter } from "@/components/cv/site-footer";
import {
  PersonSchema,
  ProfessionalServiceSchema,
  WebSiteSchema,
} from "@/components/seo/structured-data";
import { pageMetadata } from "@/lib/page-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata({ lang, path: "" });
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen flex flex-col">
      <PersonSchema lang={lang} />
      <ProfessionalServiceSchema lang={lang} />
      <WebSiteSchema lang={lang} />
      <SiteHeader lang={lang} dict={dict} />
      <ViewTransition
        enter={{
          "nav-forward": "nav-forward",
          "nav-back": "nav-back",
          default: "none",
        }}
        exit={{
          "nav-forward": "nav-forward",
          "nav-back": "nav-back",
          default: "none",
        }}
        default="none"
      >
        <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-10">
          {children}
        </main>
      </ViewTransition>
      <SiteFooter lang={lang} />
    </div>
  );
}
