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
    // Gradiente do hero. Tons claros pra dar respiro contra o logo escuro.
    gradient:
      "bg-[linear-gradient(135deg,var(--primary-50)_0%,var(--primary-100)_30%,var(--primary-200)_100%)]",
    gradientAccent:
      "bg-[radial-gradient(ellipse_at_top_right,var(--primary-300)_0%,transparent_60%)]",
  },
};
