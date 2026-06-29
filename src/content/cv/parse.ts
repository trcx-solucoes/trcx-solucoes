import type {
  CV,
  Certification,
  Course,
  DateRange,
  Education,
  Honor,
  Language,
  MonthYear,
  Position,
  Profile,
  Project,
  Skill,
} from "./types";

// Parser do export do LinkedIn. CSVs usam delimitador vírgula, aspas duplas
// para escapar campos com vírgula/quebra de linha, e "" para escapar aspas.

type Row = Record<string, string>;

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

export function parseCsv(text: string): Row[] {
  const rows = parseCsvRows(text);
  if (rows.length === 0) return [];
  const [header, ...body] = rows;
  return body
    .filter((r) => r.some((cell) => cell.length > 0))
    .map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  const src = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += c;
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

export function parseMonthYear(raw: string): MonthYear | undefined {
  const s = raw.trim();
  if (!s) return undefined;
  const monthYear = s.match(/^([A-Za-z]{3})\s+(\d{4})$/);
  if (monthYear) {
    const m = MONTHS[monthYear[1].toLowerCase()];
    const y = Number(monthYear[2]);
    if (m && Number.isFinite(y)) return { year: y, month: m };
  }
  const yearOnly = s.match(/^(\d{4})$/);
  if (yearOnly) return { year: Number(yearOnly[1]) };
  return undefined;
}

function range(start: string, end: string): DateRange {
  const s = parseMonthYear(start);
  if (!s) {
    // Sem início, ainda assim um intervalo válido pode vir só com fim
    const e = parseMonthYear(end);
    if (e) return { start: e };
    return { start: { year: 0 } };
  }
  return { start: s, end: parseMonthYear(end) };
}

const pick = (r: Row, ...keys: string[]): string => {
  for (const k of keys) {
    if (r[k] !== undefined && r[k] !== "") return r[k];
  }
  return "";
};

export function parseProfile(text: string): Profile {
  const rows = parseCsv(text);
  const r = rows[0] ?? {};
  // Formato real do LinkedIn: "[COMPANY:http://a.com] [PERSONAL:http://b.com]"
  // Múltiplos pares separados por espaço, cada um envolvido em colchetes.
  const websites = Array.from(
    pick(r, "Websites").matchAll(/\[[A-Z_]+:([^\]]+)\]/g),
    (m) => m[1].trim(),
  );
  return {
    firstName: pick(r, "First Name"),
    lastName: pick(r, "Last Name"),
    headline: pick(r, "Headline"),
    summary: pick(r, "Summary"),
    industry: pick(r, "Industry") || undefined,
    location: pick(r, "Geo Location", "Address") || undefined,
    websites,
  };
}

export function parsePositions(text: string): Position[] {
  return parseCsv(text).map<Position>((r) => ({
    company: pick(r, "Company Name"),
    title: pick(r, "Title"),
    description: pick(r, "Description"),
    location: pick(r, "Location") || undefined,
    range: range(pick(r, "Started On"), pick(r, "Finished On")),
  }));
}

export function parseEducation(text: string): Education[] {
  return parseCsv(text).map<Education>((r) => ({
    school: pick(r, "School Name"),
    degree: pick(r, "Degree Name") || undefined,
    notes: pick(r, "Notes") || undefined,
    activities: pick(r, "Activities") || undefined,
    range: range(pick(r, "Start Date"), pick(r, "End Date")),
  }));
}

export function parseCourses(text: string): Course[] {
  return parseCsv(text).map<Course>((r) => ({
    name: pick(r, "Name"),
    code: pick(r, "Number") || undefined,
  }));
}

// Learning.csv usa colunas próprias e mistura cursos, learning paths e vídeos.
// Filtramos pra "Course" + concluído (Content Completed At preenchido).
export function parseLearning(text: string): Course[] {
  return parseCsv(text)
    .filter((r) => {
      const type = pick(r, "Content Type");
      const completed = pick(r, "Content Completed At (if completed)");
      return type === "Course" && completed && completed !== "N/A";
    })
    .map<Course>((r) => {
      const completedRaw = pick(r, "Content Completed At (if completed)");
      const iso = completedRaw.match(/^(\d{4})-(\d{2})-/);
      return {
        name: pick(r, "Content Title"),
        description: pick(r, "Content Description") || undefined,
        contentType: pick(r, "Content Type") || undefined,
        completedAt: iso
          ? { year: Number(iso[1]), month: Number(iso[2]) }
          : undefined,
      };
    })
    .sort((a, b) => {
      const av = a.completedAt
        ? a.completedAt.year * 12 + (a.completedAt.month ?? 0)
        : 0;
      const bv = b.completedAt
        ? b.completedAt.year * 12 + (b.completedAt.month ?? 0)
        : 0;
      return bv - av;
    });
}

export function parseCertifications(text: string): Certification[] {
  return parseCsv(text).map<Certification>((r) => ({
    name: pick(r, "Name"),
    authority: pick(r, "Authority"),
    url: pick(r, "Url") || undefined,
    licenseNumber: pick(r, "License Number") || undefined,
    range: range(pick(r, "Started On"), pick(r, "Finished On")),
  }));
}

export function parseSkills(text: string): Skill[] {
  return parseCsv(text).map<Skill>((r) => ({ name: pick(r, "Name") }));
}

export function parseLanguages(text: string): Language[] {
  return parseCsv(text).map<Language>((r) => ({
    name: pick(r, "Name"),
    proficiency: pick(r, "Proficiency") || undefined,
  }));
}

export function parseProjects(text: string): Project[] {
  return parseCsv(text).map<Project>((r) => ({
    title: pick(r, "Title"),
    description: pick(r, "Description"),
    url: pick(r, "Url") || undefined,
    range: range(pick(r, "Started On"), pick(r, "Finished On")),
  }));
}

export function parseHonors(text: string): Honor[] {
  return parseCsv(text).map<Honor>((r) => ({
    title: pick(r, "Title"),
    description: pick(r, "Description") || undefined,
    issuer: pick(r, "Issuer") || undefined,
    issuedOn: parseMonthYear(pick(r, "Issued On")),
  }));
}

export type RawCsvSources = {
  profile?: string;
  positions?: string;
  education?: string;
  courses?: string;
  certifications?: string;
  skills?: string;
  languages?: string;
  projects?: string;
  honors?: string;
};

export function buildCv(sources: RawCsvSources): CV {
  return {
    profile: sources.profile
      ? parseProfile(sources.profile)
      : { firstName: "", lastName: "", headline: "", summary: "", websites: [] },
    positions: sources.positions ? parsePositions(sources.positions) : [],
    education: sources.education ? parseEducation(sources.education) : [],
    courses: sources.courses ? parseCourses(sources.courses) : [],
    certifications: sources.certifications
      ? parseCertifications(sources.certifications)
      : [],
    skills: sources.skills ? parseSkills(sources.skills) : [],
    languages: sources.languages ? parseLanguages(sources.languages) : [],
    projects: sources.projects ? parseProjects(sources.projects) : [],
    honors: sources.honors ? parseHonors(sources.honors) : [],
  };
}
