import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Network } from "lucide-react";
import { ContactChannels } from "@/components/cv/contact-channels";
import { ContactForm } from "@/components/cv/contact-form";
import { BreadcrumbSchema } from "@/components/seo/structured-data";
import { getContactChannels } from "@/content/contact";
import { getCv } from "@/content/cv";
import { pageMetadata } from "@/lib/page-metadata";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/contato",
    title: dict.contact.title,
    description: dict.contact.description,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const channels = getContactChannels(lang);
  const { profile } = getCv();
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();

  return (
    <div className="flex flex-col gap-10">
      <BreadcrumbSchema
        lang={lang}
        steps={[
          { label: dict.nav.home, path: "" },
          { label: dict.contact.title, path: "/contato" },
        ]}
      />
      <header className="reveal-on-scroll flex items-start gap-5">
        <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden ring-2 ring-primary/30 shrink-0">
          <Image
            src="/images/wesley-xavier/polo-sorrindo.webp"
            alt={fullName}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            {dict.contact.title}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            {lang === "pt" ? "Vamos conversar." : "Let's talk."}
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
            {dict.contact.description}
          </p>
        </div>
      </header>

      {channels.length > 0 && (
        <section className="reveal-on-scroll flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary inline-flex items-center gap-2">
            <Network className="size-4" />
            {dict.contact.channels}
          </h2>
          <ContactChannels channels={channels} />
        </section>
      )}

      <section className="reveal-on-scroll">
        <ContactForm dict={dict.contact.form} />
      </section>
    </div>
  );
}

