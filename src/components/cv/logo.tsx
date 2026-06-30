import Image from "next/image";
import { brand } from "@/content/brand";

// Wrapper com aspect-ratio CSS travado. Resolve a distorção que acontecia
// quando Next/Image fica num flex column (align-items: stretch padrão
// esticava a largura e quebrava a proporção).
//
// Quando darkVariant é fornecido, ambas as variantes são renderizadas e o CSS
// (.dark) decide qual mostrar. Sem flash, sem JS, sem hydration mismatch.

const DIMENSIONS = {
  horizontal: { w: 1275, h: 360 },
  horizontalNegative: { w: 1275, h: 360 },
  vertical: { w: 640, h: 729 },
  verticalNegative: { w: 640, h: 729 },
} as const;

type Variant = keyof typeof DIMENSIONS;

export function Logo({
  variant = "horizontal",
  darkVariant,
  height,
  priority = false,
  className,
  alt = brand.name,
}: {
  variant?: Variant;
  /** Se setado, esta variant é usada quando o tema é dark. */
  darkVariant?: Variant;
  /** Altura em px. Largura é calculada via aspect-ratio. */
  height: number;
  priority?: boolean;
  className?: string;
  alt?: string;
}) {
  const { w, h } = DIMENSIONS[variant];

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        height,
        aspectRatio: `${w} / ${h}`,
        flexShrink: 0,
      }}
    >
      <Image
        src={brand.logo[variant]}
        alt={alt}
        width={w}
        height={h}
        priority={priority}
        className={
          darkVariant
            ? "size-full object-contain block dark:hidden"
            : "size-full object-contain"
        }
      />
      {darkVariant && (
        <Image
          src={brand.logo[darkVariant]}
          alt=""
          width={DIMENSIONS[darkVariant].w}
          height={DIMENSIONS[darkVariant].h}
          priority={priority}
          className="size-full object-contain hidden dark:block"
          aria-hidden
        />
      )}
    </span>
  );
}
