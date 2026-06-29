import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DateRange } from "@/content/cv/types";
import { formatRange } from "@/lib/cv-format";
import type { Locale } from "@/app/[lang]/dictionaries";

export type TimelineItem = {
  title: string;
  subtitle?: string;
  range: DateRange;
  description?: string;
};

export function Timeline({
  items,
  locale,
  presentLabel,
  icon: Icon,
}: {
  items: TimelineItem[];
  locale: Locale;
  presentLabel: string;
  icon?: LucideIcon;
}) {
  return (
    <ol className="relative flex flex-col gap-4">
      <div
        aria-hidden
        className="absolute left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-primary/40 via-primary/10 to-transparent"
      />
      {items.map((item, idx) => (
        <li key={`${item.title}-${idx}`} className="relative pl-12">
          <div className="absolute left-0 top-3 size-9 rounded-full bg-card ring-2 ring-primary/30 flex items-center justify-center text-primary">
            {Icon ? (
              <Icon className="size-4" />
            ) : (
              <span className="size-2 rounded-full bg-primary" />
            )}
          </div>
          <Card className="hover:ring-primary/30 transition-all">
            <CardHeader>
              <p className="text-xs text-primary uppercase tracking-wide font-semibold">
                {formatRange(item.range, locale, presentLabel)}
              </p>
              <CardTitle className="text-base">{item.title}</CardTitle>
              {item.subtitle && (
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              )}
            </CardHeader>
            {item.description && (
              <CardContent>
                <p className="text-sm whitespace-pre-line leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            )}
          </Card>
        </li>
      ))}
    </ol>
  );
}
