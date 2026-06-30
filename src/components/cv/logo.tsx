import Image from "next/image";
import { brand } from "@/content/brand";

// Wrapper com aspect-ratio CSS travado. Resolve a distorção que acontecia
// quando Next/Image fica num flex column (align-items: stretch padrão
// esticava a largura e quebrava a proporção).

const DIMENSIONS = {
  horizontal: { w: 1275, h: 360 },
  horizontalNegative: { w: 1275, h: 360 },
  vertical: { w: 640, h: 729 },
  verticalNegative: { w: 640, h: 729 },
} as const;

type Variant = keyof typeof DIMENSIONS;

export function Logo({
  variant = "horizontal",
  height,
  priority = false,
  className,
  alt = brand.name,
}: {
  variant?: Variant;
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
        className="size-full object-contain"
      />
    </span>
  );
}
