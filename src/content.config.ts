import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const localizedCopy = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  desc: z.string(),
});

// Structured project data + localized name/desc per locale. Reconciles the old
// orgData.ts fields with the longer ecosystem.<key> marketing copy.
const projects = defineCollection({
  loader: file('src/content/projects.json'),
  schema: z.object({
    key: z.string(),
    status: z.enum(['live', 'coming-soon']),
    github: z.string().url().optional(),
    website: z.string().url().optional(),
    tech: z.array(z.string()),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    name: z.string(),
    copy: z.object({ es: localizedCopy, en: localizedCopy }),
  }),
});

const pillars = defineCollection({
  loader: file('src/content/pillars.json'),
  schema: z.object({
    key: z.string(),
    icon: z.string(),
    order: z.number().default(0),
    copy: z.object({
      es: z.object({ title: z.string(), desc: z.string() }),
      en: z.object({ title: z.string(), desc: z.string() }),
    }),
  }),
});

const docFrontmatter = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  locale: z.enum(['es', 'en']),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  order: z.number().default(0),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: docFrontmatter,
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: docFrontmatter.extend({
    author: z.string().default('Plynte Labs'),
    heroImage: z.string().optional(),
  }),
});

export const collections = { projects, pillars, docs, news };
