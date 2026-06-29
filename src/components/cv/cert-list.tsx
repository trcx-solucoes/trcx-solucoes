import { Award, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Certification } from "@/content/cv/types";
import { formatMonthYear } from "@/lib/cv-format";
import type { Locale } from "@/app/[lang]/dictionaries";

export function CertList({
  certifications,
  locale,
}: {
  certifications: Certification[];
  locale: Locale;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {certifications.map((c, idx) => (
        <li key={`${c.name}-${idx}`}>
          <Card
            size="sm"
            className="h-full hover:ring-primary/30 transition-all group/cert"
          >
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <Badge
                  variant="secondary"
                  className="gap-1.5 pl-1.5 group-hover/cert:bg-primary/10 group-hover/cert:text-primary transition-colors"
                >
                  <Award className="size-3" />
                  {c.authority}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatMonthYear(c.range.start, locale)}
                </span>
              </div>
              <CardTitle className="text-sm">
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors inline-flex items-start gap-1.5"
                  >
                    <span>{c.name}</span>
                    <ExternalLink className="size-3 mt-0.5 opacity-50 group-hover/cert:opacity-100 transition-opacity shrink-0" />
                  </a>
                ) : (
                  c.name
                )}
              </CardTitle>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
}
