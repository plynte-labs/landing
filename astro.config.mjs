import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  site: 'https://plynte.com',
  output: 'static',
  trailingSlash: 'ignore',
  // No build-time image optimization needed (assets are served as-is from
  // /public), so skip the sharp-backed service entirely.
  image: { service: passthroughImageService() },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-MX', en: 'en-US' },
      },
      changefreq: 'weekly',
      priority: 1.0,
      filter: (page) => !page.includes('/404'),
      // Strip trailing slashes so <loc>/alternates match the page rel=canonical.
      serialize(item) {
        const strip = (u) => u.replace(/\/$/, '');
        item.url = strip(item.url);
        if (item.links) item.links = item.links.map((l) => ({ ...l, url: strip(l.url) }));
        return item;
      },
    }),
  ],
  vite: {
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
  },
});
