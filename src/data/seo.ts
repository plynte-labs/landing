import type { Locale } from '@/i18n/ui';

export const SITE = 'https://plynte.com';
// Literal-space asset filename — every OG/JSON-LD ref uses %20; preserve exactly.
export const OG_IMAGE = `${SITE}/plynte%20logo2.png`;

export const STATIC_META = {
  keywords:
    'open source, software, AI, audio, productivity, tools, MIT, Whisper, Ollama, Tauri, TypeScript, Python, local-first, streaming, artists, streamers',
  author: 'Plynte Labs',
  themeColor: '#0b0e11',
  geoRegion: 'MX',
  geoPlacename: 'Mexico',
  ogImageW: '1000',
  ogImageH: '1000',
  siteName: 'Plynte Labs',
} as const;

export const OG_LOCALE: Record<Locale, string> = {
  es: 'es_MX',
  en: 'en_US',
};

// Locale-invariant schema.org graph — ported verbatim from index.html.
export const JSON_LD_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://plynte.com/#organization',
      name: 'Plynte Labs',
      alternateName: 'Plynte',
      url: 'https://plynte.com',
      logo: 'https://plynte.com/plynte%20logo2.png',
      description:
        'An open-source software laboratory dedicated to engineering high-performance productivity tooling and localized AI-driven audio infrastructure under the MIT license.',
      foundingDate: '2026',
      sameAs: ['https://github.com/plynte-labs'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://plynte.com/#website',
      url: 'https://plynte.com',
      name: 'Plynte Labs',
      publisher: { '@id': 'https://plynte.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Brick.draw',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Desktop',
      description:
        'Lightweight desktop creative tool inspired by Paint and Photoshop, with local Sloppy API integration for Stable Diffusion XL image enhancement.',
      author: { '@id': 'https://plynte.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'LiveAudio',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Desktop',
      description:
        'Real-time audio capture and transcription integration for OBS Studio with Whisper-powered speech recognition.',
      author: { '@id': 'https://plynte.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'OpenCohost',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Desktop',
      description:
        'Local voice assistant for streamers using Python, Ollama, and YouTube/Twitch integrations.',
      author: { '@id': 'https://plynte.com/#organization' },
    },
  ],
} as const;
