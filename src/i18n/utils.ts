import { ui, defaultLocale, type Locale } from '@/i18n/ui';

export { defaultLocale, type Locale };

/** Derive the active locale from a URL pathname (/en/* -> 'en', else 'es'). */
export function getLocale(url: URL): Locale {
  return url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'es';
}

/**
 * Build-time translator. Mirrors the old runtime t(): walks the nested dict by
 * dot-path and returns the raw key on a miss (same fallback semantics).
 */
export function useTranslations(locale: Locale) {
  return function t(key: string): string {
    const value = key
      .split('.')
      .reduce<unknown>((obj, part) => (obj && typeof obj === 'object' ? (obj as Record<string, unknown>)[part] : undefined), ui[locale]);
    return typeof value === 'string' ? value : key;
  };
}

/** Prefix an in-site path with the locale segment ('es' -> '/', 'en' -> '/en'). */
export function localizePath(path: string, locale: Locale): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return locale === 'en' ? `/en${clean}` : clean || '/';
}

/**
 * Cross-locale alternates for a content entry. Includes the sibling locale only
 * when a same-slug translation actually exists, so hreflang never points at a
 * 404. Content pages share a slug stem across locales (folder-per-locale).
 */
export function contentAlternates(opts: {
  collection: string;
  slug: string;
  locale: Locale;
  siblingExists: boolean;
}): Partial<Record<Locale, string>> {
  const { collection, slug, locale, siblingExists } = opts;
  const path = (l: Locale) => (l === 'es' ? `/${collection}/${slug}` : `/en/${collection}/${slug}`);
  const result: Partial<Record<Locale, string>> = { [locale]: path(locale) };
  if (siblingExists) {
    const other: Locale = locale === 'es' ? 'en' : 'es';
    result[other] = path(other);
  }
  return result;
}

/**
 * Given the current pathname, compute the equivalent path in each locale.
 * Used for hreflang alternates and the language switcher.
 */
export function localeAlternates(pathname: string): Record<Locale, string> {
  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  const esPath = isEn ? pathname.replace(/^\/en/, '') || '/' : pathname || '/';
  const enRaw = isEn ? pathname : `/en${pathname === '/' ? '' : pathname}`;
  return {
    es: esPath || '/',
    en: enRaw || '/en',
  };
}
