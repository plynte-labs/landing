import type { Locale } from '@/i18n/ui';
import { localizePath } from '@/i18n/utils';

export function getProjectPath(slug: string, locale: Locale): string {
  return localizePath(`/projects/${slug}`, locale);
}

export function getProjectAlternates(slug: string): Record<Locale, string> {
  return {
    es: getProjectPath(slug, 'es'),
    en: getProjectPath(slug, 'en'),
  };
}
