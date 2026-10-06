// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://majsterkuj.vercel.app',
  // Astro 7: endpointy /api/* działają jako funkcje serverless na Vercel,
  // a strony pozostają statyczne (output "static" = domyślny, dawny "hybrid").
  adapter: vercel(),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
