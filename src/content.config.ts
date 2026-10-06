import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Kolekcja "articles" — artykuły SEO / poradniki zakupowe (Markdown).
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Główna fraza SEO, na którą pozycjonujemy artykuł. */
    seoKeyword: z.string(),
    tags: z.array(z.string()),
    readTime: z.string().optional(),
  }),
});

export const collections = { articles };
