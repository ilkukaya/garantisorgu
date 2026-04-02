import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://garantisorgu.com',
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'monthly',
      priority: 0.8,
    }),
  ],
  output: 'static',
});
