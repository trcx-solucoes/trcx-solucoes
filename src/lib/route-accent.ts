// Mapa de rota → cor accent. Cada página wrappa seu conteúdo em
// <div data-accent={accent}> e o CSS redefine --primary pra essa cor.
// Header e footer ficam fora do wrapper = mantêm a paleta neutral.

export type Accent = "indigo" | "emerald" | "amber" | "violet" | "rose";

export const ROUTE_ACCENT = {
  home: "indigo",
  experiencia: "emerald",
  formacao: "amber",
  projetos: "violet",
  contato: "rose",
} as const satisfies Record<string, Accent>;

export type RouteName = keyof typeof ROUTE_ACCENT;
