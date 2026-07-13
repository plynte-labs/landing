import { JSON_LD_GRAPH, SITE } from '@/data/seo';
import type { Locale } from '@/i18n/ui';

interface NewsStructuredDataOptions {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  locale: Locale;
  slug: string;
  heroImage?: string;
}

function absoluteUrl(path: string): string {
  return path.startsWith('http://') || path.startsWith('https://') ? path : `${SITE}${path}`;
}

export function getNewsStructuredData(options: NewsStructuredDataOptions): Record<string, unknown> {
  const { title, description, pubDate, updatedDate, locale, slug, heroImage } = options;
  const pageUrl = `${SITE}${locale === 'en' ? `/en/news/${slug}` : `/news/${slug}`}`;
  const datePublished = pubDate.toISOString().slice(0, 10);
  const dateModified = (updatedDate ?? pubDate).toISOString().slice(0, 10);
  const graph = [...JSON_LD_GRAPH['@graph']];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...graph,
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: title,
        description,
        url: pageUrl,
        inLanguage: locale === 'es' ? 'es-MX' : 'en-US',
        datePublished,
        dateModified,
        author: { '@id': `${SITE}/#organization` },
        publisher: { '@id': `${SITE}/#organization` },
        ...(heroImage ? { image: absoluteUrl(heroImage) } : {}),
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
            name: locale === 'es' ? 'Novedades' : 'News',
            item: `${SITE}${locale === 'en' ? '/en/news' : '/news'}`,
          },
          { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
        ],
      },
    ],
  };
}
