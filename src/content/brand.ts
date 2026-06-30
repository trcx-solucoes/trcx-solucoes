// Configuração central da marca TRCX Soluções.
// Tudo que dependeria do logo/identidade visual fica aqui pra ser ajustado em
// um lugar só quando os assets finais chegarem.

export const brand = {
  name: "TRCX Soluções",
  tagline: {
    pt: "Engenharia de software e arquitetura de sistemas.",
    en: "Software engineering and systems architecture.",
  },
  logo: {
    horizontal: "/images/horizontal-logo.webp",
    horizontalNegative: "/images/horizontal-logo-negative.webp",
    vertical: "/images/vertical-logo.webp",
    verticalNegative: "/images/vertical-logo-negative.webp",
  },
  hero: {
    // Gradiente derivado de --primary via color-mix — segue o accent da rota
    // (data-accent no wrapper da página redefine --primary).
    gradient:
      "bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_5%,white)_0%,color-mix(in_oklab,var(--primary)_12%,white)_50%,color-mix(in_oklab,var(--primary)_22%,white)_100%)]",
    gradientAccent:
      "bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklab,var(--primary)_30%,transparent)_0%,transparent_60%)]",
  },
};
