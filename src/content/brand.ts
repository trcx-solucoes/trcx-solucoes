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
    // Gradiente cinza derivado de --foreground (logo black). Independente do
    // accent da rota — o tom institucional preto/cinza fica constante no hero.
    gradient:
      "bg-[linear-gradient(135deg,color-mix(in_oklab,var(--foreground)_4%,var(--background))_0%,color-mix(in_oklab,var(--foreground)_9%,var(--background))_50%,color-mix(in_oklab,var(--foreground)_15%,var(--background))_100%)]",
    // Toque sutil do accent da rota como brilho radial — mantém um sinal de cor
    // sem virar wallpaper inteiro.
    gradientAccent:
      "bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklab,var(--primary)_18%,transparent)_0%,transparent_55%)]",
  },
};
