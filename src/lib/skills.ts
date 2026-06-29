import type { Skill } from "@/content/cv/types";

export type SkillCategory =
  | "cloud"
  | "backend"
  | "frontend"
  | "database"
  | "devops"
  | "language"
  | "other";

const RULES: { category: SkillCategory; match: RegExp }[] = [
  { category: "cloud", match: /^(kubernetes|gke|aws|azure|gcp|google kubernetes engine)$/i },
  {
    category: "devops",
    match: /^(docker|git|github|service mesh|istio|ci\/cd|jenkins|terraform)$/i,
  },
  {
    category: "database",
    match: /^(postgresql|microsoft sql server|sql|sql server|mysql|redis|mongodb|oracle)$/i,
  },
  {
    category: "backend",
    match: /^(node\.?js|express\.?js|spring|spring boot|spring mvc|spring security|spring data|spring framework|\.net framework|api|interface de programação de aplicativos.*|c#|java|javascript|js|python)$/i,
  },
  {
    category: "frontend",
    match: /^(next\.?js|react\.?js|html|css|tailwind|typescript)$/i,
  },
  {
    category: "language",
    match: /^(portuguese|english|inglês|português|espanhol|spanish)$/i,
  },
];

export function categorizeSkill(name: string): SkillCategory {
  for (const r of RULES) if (r.match.test(name)) return r.category;
  return "other";
}

export type SkillGroup = { category: SkillCategory; items: Skill[] };

const ORDER: SkillCategory[] = [
  "frontend",
  "backend",
  "database",
  "cloud",
  "devops",
  "language",
  "other",
];

export function groupSkills(skills: Skill[]): SkillGroup[] {
  const map = new Map<SkillCategory, Skill[]>();
  for (const s of skills) {
    const cat = categorizeSkill(s.name);
    const list = map.get(cat) ?? [];
    list.push(s);
    map.set(cat, list);
  }
  return ORDER
    .map((c) => ({ category: c, items: map.get(c) ?? [] }))
    .filter((g) => g.items.length > 0);
}

export const CATEGORY_LABEL: Record<SkillCategory, { pt: string; en: string }> =
  {
    frontend: { pt: "Frontend", en: "Frontend" },
    backend: { pt: "Backend", en: "Backend" },
    database: { pt: "Banco de dados", en: "Database" },
    cloud: { pt: "Cloud & Orquestração", en: "Cloud & Orchestration" },
    devops: { pt: "DevOps", en: "DevOps" },
    language: { pt: "Idiomas", en: "Languages" },
    other: { pt: "Outros", en: "Other" },
  };

// Skills "office/básicas" que poluem o portfólio técnico. Filtra do display
// principal mas mantém no JSON exportado caso queira mostrar em algum lugar.
const NOISE = /^(microsoft (word|excel|outlook|powerpoint|office)|word|outlook|powerpoint|excel (basic|intermédiário|intermediário|básico|basico)?|informatica basica|access control|windows 7|security|gestão de segurança|planejamento empresarial|telecomunicações)$/i;

export function isTechnical(name: string): boolean {
  return !NOISE.test(name);
}
