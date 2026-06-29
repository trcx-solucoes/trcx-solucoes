import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { CV } from "./types";
import { buildCv, parseLearning, type RawCsvSources } from "./parse";
import { mockCv } from "./mock";

// Server-only. Lê os CSVs do export do LinkedIn em src/content/cv/raw/ e
// devolve o CV parseado. Cai pro mock se nenhum CSV estiver presente.

const RAW_DIR = join(process.cwd(), "src/content/cv/raw");

const FILES: Record<keyof RawCsvSources, string> = {
  profile: "Profile.csv",
  positions: "Positions.csv",
  education: "Education.csv",
  courses: "Courses.csv",
  certifications: "Certifications.csv",
  skills: "Skills.csv",
  languages: "Languages.csv",
  projects: "Projects.csv",
  honors: "Honors.csv",
};

function readIfExists(filename: string): string | undefined {
  const path = join(RAW_DIR, filename);
  return existsSync(path) ? readFileSync(path, "utf8") : undefined;
}

function loadSources(): RawCsvSources {
  const sources: RawCsvSources = {};
  let foundAny = false;
  for (const [key, filename] of Object.entries(FILES) as [
    keyof RawCsvSources,
    string,
  ][]) {
    const text = readIfExists(filename);
    if (text !== undefined) {
      sources[key] = text;
      foundAny = true;
    }
  }
  return foundAny ? sources : {};
}

let cached: CV | null = null;

export function getCv(): CV {
  if (cached) return cached;
  const sources = loadSources();
  if (Object.keys(sources).length === 0) {
    cached = mockCv;
    return cached;
  }
  const cv = buildCv(sources);

  // Learning.csv (LinkedIn Learning) é uma fonte alternativa de cursos
  // quando o export não trouxe Courses.csv (que é raro em perfis novos).
  if (cv.courses.length === 0) {
    const learning = readIfExists("Learning.csv");
    if (learning) cv.courses = parseLearning(learning);
  }
  cached = cv;
  return cached;
}
