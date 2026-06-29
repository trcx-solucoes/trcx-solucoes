"use client";

import { useSyncExternalStore } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ThemeId =
  // Simples (uma família de cor)
  | "azul"
  | "laranja"
  | "teal"
  | "verde"
  | "roxo"
  | "magenta"
  | "vermelho"
  | "amarelo"
  // Vibrantes
  | "sunset"
  | "oceano"
  | "floresta"
  | "vaporwave"
  | "midnight"
  | "cyberpunk"
  // Conservadores
  | "corporativo"
  | "executivo"
  | "classico"
  // Tecnológicos
  | "cobalto"
  | "matrix"
  | "atom"
  // Zen
  | "nordico"
  | "sakura"
  | "salvia";

type ThemeDef = {
  id: ThemeId;
  label: string;
  description: string;
  swatches: [string, string, string, string, string];
};

const SIMPLE_THEMES: ThemeDef[] = [
  {
    id: "azul",
    label: "Azul",
    description: "Padrão · confiável e profissional",
    swatches: ["#e2f2fc", "#90caf9", "#43a5f4", "#1876d3", "#0d47a1"],
  },
  {
    id: "laranja",
    label: "Laranja",
    description: "Energético e caloroso",
    swatches: ["#fef3e1", "#fecd80", "#fea727", "#f57d01", "#e65001"],
  },
  {
    id: "teal",
    label: "Teal",
    description: "Fresco e contemporâneo",
    swatches: ["#e0f7fa", "#81deeb", "#27c7da", "#0196a7", "#006165"],
  },
  {
    id: "verde",
    label: "Verde",
    description: "Natural e acolhedor",
    swatches: ["#e8f4e8", "#a5d6a7", "#66b86a", "#398f3c", "#1b5f21"],
  },
  {
    id: "roxo",
    label: "Roxo",
    description: "Criativo e sofisticado",
    swatches: ["#f2e5f4", "#ce92d9", "#aa47bd", "#7b1fa2", "#4a158d"],
  },
  {
    id: "magenta",
    label: "Magenta",
    description: "Ousado e moderno",
    swatches: ["#fde5ec", "#f48fb1", "#ed417a", "#c2185b", "#890f4f"],
  },
  {
    id: "vermelho",
    label: "Vermelho",
    description: "Apaixonado e urgente",
    swatches: ["#ffebee", "#ef9a9a", "#ee5351", "#d32e2e", "#b71d1d"],
  },
  {
    id: "amarelo",
    label: "Amarelo",
    description: "Otimista e vibrante",
    swatches: ["#fffce6", "#fef59c", "#feef58", "#fac02c", "#f57f17"],
  },
];

const VIBRANT_THEMES: ThemeDef[] = [
  {
    id: "sunset",
    label: "Sunset",
    description: "Magenta + Laranja",
    swatches: ["#f48fb1", "#ed417a", "#c2185b", "#f57d01", "#fea727"],
  },
  {
    id: "oceano",
    label: "Oceano",
    description: "Teal + Azul profundo",
    swatches: ["#27c7da", "#0196a7", "#1876d3", "#0d47a1", "#006165"],
  },
  {
    id: "floresta",
    label: "Floresta",
    description: "Verde + Dourado",
    swatches: ["#a5d6a7", "#66b86a", "#398f3c", "#fac02c", "#f57f17"],
  },
  {
    id: "vaporwave",
    label: "Vaporwave",
    description: "Magenta + Roxo + Ciano",
    swatches: ["#ed417a", "#c2185b", "#7b1fa2", "#aa47bd", "#27c7da"],
  },
  {
    id: "midnight",
    label: "Midnight",
    description: "Índigo + Azul elétrico",
    swatches: ["#a89ef0", "#6c55d8", "#4a2fb5", "#1876d3", "#0d47a1"],
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    description: "Amarelo + Magenta + Ciano",
    swatches: ["#feef58", "#fac02c", "#f57f17", "#ed417a", "#27c7da"],
  },
];

const CONSERVATIVE_THEMES: ThemeDef[] = [
  {
    id: "corporativo",
    label: "Corporativo",
    description: "Navy + Aço",
    swatches: ["#e3ebf5", "#93a8c4", "#3c65a0", "#0d47a1", "#0a2850"],
  },
  {
    id: "executivo",
    label: "Executivo",
    description: "Grafite + Dourado",
    swatches: ["#eceff1", "#b0bec5", "#607d8b", "#37474f", "#c09a3e"],
  },
  {
    id: "classico",
    label: "Clássico",
    description: "Bordô + Bege",
    swatches: ["#f5e8ea", "#c99094", "#a8484f", "#8b2635", "#d4b895"],
  },
];

const TECH_THEMES: ThemeDef[] = [
  {
    id: "cobalto",
    label: "Cobalto",
    description: "Cobalto + Carvão",
    swatches: ["#dbe9ff", "#83a8ff", "#3370ff", "#0053ff", "#1a1a1a"],
  },
  {
    id: "matrix",
    label: "Matrix",
    description: "Verde neon + Terminal",
    swatches: ["#e0f8e8", "#7dd99e", "#00c853", "#008f39", "#1a1a1a"],
  },
  {
    id: "atom",
    label: "Atom",
    description: "Índigo + Ciano",
    swatches: ["#e9e8fe", "#a8a6f2", "#6366f1", "#4338ca", "#06b6d4"],
  },
];

const ZEN_THEMES: ThemeDef[] = [
  {
    id: "nordico",
    label: "Nórdico",
    description: "Azul nórdico suave",
    swatches: ["#e5edf5", "#a3b8cc", "#81a1c1", "#5e81ac", "#3b5a7d"],
  },
  {
    id: "sakura",
    label: "Sakura",
    description: "Rosa pastel + Menta",
    swatches: ["#fbe4eb", "#efa6b7", "#d87093", "#a8d8c4", "#6eb7a0"],
  },
  {
    id: "salvia",
    label: "Sálvia",
    description: "Verde sálvia + Bege",
    swatches: ["#ecf1e5", "#b5c8a3", "#87a96b", "#5c7c45", "#d4c59a"],
  },
];

const ALL_THEMES: ThemeDef[] = [
  ...SIMPLE_THEMES,
  ...VIBRANT_THEMES,
  ...CONSERVATIVE_THEMES,
  ...TECH_THEMES,
  ...ZEN_THEMES,
];
const THEME_IDS = new Set<ThemeId>(ALL_THEMES.map((t) => t.id));

const GROUPS: { title: string; themes: ThemeDef[] }[] = [
  { title: "Simples", themes: SIMPLE_THEMES },
  { title: "Vibrantes", themes: VIBRANT_THEMES },
  { title: "Conservadores", themes: CONSERVATIVE_THEMES },
  { title: "Tecnológicos", themes: TECH_THEMES },
  { title: "Zen", themes: ZEN_THEMES },
];

const STORAGE_KEY = "theme";
const DEFAULT_THEME: ThemeId = "azul";

function isThemeId(value: string | null): value is ThemeId {
  return value != null && THEME_IDS.has(value as ThemeId);
}

function applyTheme(id: ThemeId) {
  if (id === DEFAULT_THEME) {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", id);
  }
}

function readTheme(): ThemeId {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const attr = document.documentElement.getAttribute("data-theme");
  if (isThemeId(attr)) return attr;
  return DEFAULT_THEME;
}

function subscribeTheme(callback: () => void) {
  if (typeof document === "undefined") return () => {};
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getServerSnapshot(): ThemeId {
  return DEFAULT_THEME;
}

// Hydrate the saved theme into the DOM as early as possible on the client.
if (typeof document !== "undefined") {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isThemeId(stored) && stored !== readTheme()) {
      applyTheme(stored);
    }
  } catch {
    // localStorage may be unavailable (privacy mode); ignore.
  }
}

export function ThemeSelector() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    readTheme,
    getServerSnapshot
  );

  function handleChange(value: ThemeId | null) {
    if (!value) return;
    applyTheme(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore persistence failures
    }
  }

  const current = ALL_THEMES.find((t) => t.id === theme) ?? ALL_THEMES[0];

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">Tema</label>
      <Select value={theme} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue>
            <div className="flex items-center gap-2">
              <ThemeSwatches swatches={current.swatches} size="sm" />
              <span className="truncate">{current.label}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {GROUPS.map((group, idx) => (
            <div key={group.title}>
              {idx > 0 && <SelectSeparator />}
              <SelectGroup>
                <SelectLabel>{group.title}</SelectLabel>
                {group.themes.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    <ThemeItemContent
                      label={t.label}
                      description={t.description}
                      swatches={t.swatches}
                    />
                  </SelectItem>
                ))}
              </SelectGroup>
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function ThemeItemContent({
  label,
  description,
  swatches,
}: {
  label: string;
  description: string;
  swatches: [string, string, string, string, string];
}) {
  return (
    <div className="flex flex-1 flex-col gap-1 py-0.5 whitespace-normal">
      <span className="text-sm font-medium leading-tight">{label}</span>
      <span className="text-[11px] leading-tight text-muted-foreground">
        {description}
      </span>
      <ThemeSwatches swatches={swatches} size="md" />
    </div>
  );
}

function ThemeSwatches({
  swatches,
  size,
}: {
  swatches: [string, string, string, string, string];
  size: "sm" | "md";
}) {
  const cls = size === "sm" ? "size-3" : "size-3.5";
  return (
    <div className="flex gap-0.5">
      {swatches.map((hex, i) => (
        <span
          key={`${hex}-${i}`}
          className={`${cls} rounded-sm border border-border/40`}
          style={{ backgroundColor: hex }}
        />
      ))}
    </div>
  );
}
