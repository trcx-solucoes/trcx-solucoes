// Padrão de i18n recomendado pelo guide do Next 16
// (node_modules/next/dist/docs/01-app/02-guides/internationalization.md).
// Lazy import por locale; só o dicionário pedido vai pro bundle do server.

import type pt from "./dictionaries/pt.json";

const dictionaries = {
  pt: () => import("./dictionaries/pt.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof pt;

export const LOCALES = Object.keys(dictionaries) as Locale[];
export const DEFAULT_LOCALE: Locale = "pt";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]() as Promise<Dictionary>;
