import { BookOpen, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Course } from "@/content/cv/types";
import { formatMonthYear } from "@/lib/cv-format";
import type { Locale } from "@/app/[lang]/dictionaries";

export function CourseList({
  courses,
  locale,
}: {
  courses: Course[];
  locale: Locale;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {courses.map((c, idx) => (
        <li key={`${c.name}-${idx}`}>
          <Card
            size="sm"
            className="h-full hover:ring-primary/30 transition-all group/course"
          >
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div className="rounded-md bg-primary/10 text-primary p-1.5 group-hover/course:bg-primary group-hover/course:text-primary-foreground transition-colors">
                  <BookOpen className="size-3.5" />
                </div>
                {c.completedAt && (
                  <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                    <CheckCircle2 className="size-3 text-primary/70" />
                    {formatMonthYear(c.completedAt, locale)}
                  </span>
                )}
              </div>
              <CardTitle className="text-sm">{c.name}</CardTitle>
            </CardHeader>
            {c.description && (
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                  {c.description}
                </p>
              </CardContent>
            )}
          </Card>
        </li>
      ))}
    </ul>
  );
}
