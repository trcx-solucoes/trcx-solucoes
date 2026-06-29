// Tipos do CV. Alinhados às colunas dos CSVs do export oficial do LinkedIn
// (Configurações → Privacidade de dados → Obter uma cópia dos seus dados).
//
// Datas no LinkedIn vêm como "MMM YYYY" ("Jan 2020"), "YYYY" ou vazias
// (vazio = atual/em andamento). Representamos como { year, month? } pra evitar
// timezone e refletir a precisão real.

export type MonthYear = {
  year: number;
  /** 1–12. Ausente quando o LinkedIn só fornece o ano. */
  month?: number;
};

export type DateRange = {
  start: MonthYear;
  /** Ausente = em andamento. */
  end?: MonthYear;
};

export type Profile = {
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  industry?: string;
  location?: string;
  websites: string[];
};

export type Position = {
  company: string;
  title: string;
  description: string;
  location?: string;
  range: DateRange;
};

export type Education = {
  school: string;
  degree?: string;
  notes?: string;
  activities?: string;
  range: DateRange;
};

export type Course = {
  name: string;
  /** Código do curso (coluna "Number" do Courses.csv). */
  code?: string;
  /** Descrição (Learning.csv). */
  description?: string;
  /** Tipo do conteúdo no Learning.csv: "Course", "Learning Path", etc. */
  contentType?: string;
  /** Data de conclusão (Learning.csv). */
  completedAt?: MonthYear;
};

export type Certification = {
  name: string;
  authority: string;
  url?: string;
  licenseNumber?: string;
  range: DateRange;
};

export type Skill = {
  name: string;
};

export type Language = {
  name: string;
  proficiency?: string;
};

export type Project = {
  title: string;
  description: string;
  url?: string;
  range: DateRange;
};

export type Honor = {
  title: string;
  description?: string;
  issuer?: string;
  issuedOn?: MonthYear;
};

export type CV = {
  profile: Profile;
  positions: Position[];
  education: Education[];
  courses: Course[];
  certifications: Certification[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
  honors: Honor[];
};
