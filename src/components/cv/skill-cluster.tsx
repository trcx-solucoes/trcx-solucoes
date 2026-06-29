import { Badge } from "@/components/ui/badge";
import type { Skill } from "@/content/cv/types";

export function SkillCluster({ skills }: { skills: Skill[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((s, idx) => (
        <Badge key={`${s.name}-${idx}`} variant="outline">
          {s.name}
        </Badge>
      ))}
    </div>
  );
}
