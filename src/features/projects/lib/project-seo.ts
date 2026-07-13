import { SITE } from '@/data/seo';
import type { Locale } from '@/i18n/ui';
import type { ProjectEntry } from '@/features/projects/types';
import { getProjectPath } from '@/features/projects/lib/project-path';

function absoluteUrl(path: string): string {
  return path.startsWith('http://') || path.startsWith('https://') ? path : `${SITE}${path}`;
}

export function getProjectStructuredData(project: ProjectEntry, locale: Locale): Record<string, unknown> {
  const copy = project.data.copy[locale];
  const pageUrl = `${SITE}${getProjectPath(project.id, locale)}`;
  const references = [project.data.github, project.data.website].filter((url): url is string => Boolean(url));
  const firstImage = project.data.media[0];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${pageUrl}#software`,
        name: copy.name ?? project.data.name,
        description: copy.desc,
        url: pageUrl,
        inLanguage: locale === 'es' ? 'es-MX' : 'en-US',
        author: { '@id': `${SITE}/#organization` },
        keywords: project.data.tech.join(', '),
        ...(references.length > 0 ? { sameAs: references } : {}),
        ...(firstImage ? { image: absoluteUrl(firstImage.src) } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: locale === 'es' ? 'Inicio' : 'Home',
            item: locale === 'es' ? SITE : `${SITE}/en`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: copy.name ?? project.data.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
