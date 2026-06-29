import type { CV } from "./types";

// Placeholder usado enquanto o export oficial do LinkedIn não chega.
// Substituído automaticamente pelos dados reais quando os CSVs forem
// colocados em src/content/cv/raw/.

export const mockCv: CV = {
  profile: {
    firstName: "Wesley",
    lastName: "Xavier",
    headline: "Engenharia de Software — TRCX Soluções",
    summary:
      "Conteúdo placeholder. Será substituído pelo Summary do export oficial do LinkedIn.",
    location: "Brasil",
    websites: ["https://www.trcx.com.br"],
  },
  positions: [
    {
      company: "Belfort",
      title: "Engenheiro de Software",
      description:
        "Posição placeholder. Substituída automaticamente pelos dados reais quando o CSV chegar.",
      range: { start: { year: 2024, month: 1 } },
    },
  ],
  education: [
    {
      school: "—",
      degree: "—",
      range: { start: { year: 2020 }, end: { year: 2024 } },
    },
  ],
  courses: [
    { name: "Curso placeholder 1" },
    { name: "Curso placeholder 2" },
  ],
  certifications: [],
  skills: [
    { name: "TypeScript" },
    { name: "Next.js" },
    { name: "Node.js" },
  ],
  languages: [
    { name: "Português", proficiency: "Native or bilingual proficiency" },
    { name: "Inglês", proficiency: "Professional working proficiency" },
  ],
  projects: [
    {
      title: "TRCX Soluções",
      description: "Currículo online e vitrine de projetos.",
      url: "https://www.trcx.com.br",
      range: { start: { year: 2026, month: 6 } },
    },
  ],
  honors: [],
};
