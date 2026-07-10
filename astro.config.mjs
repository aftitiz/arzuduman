import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// NOT: `site` gerçek domain ile değiştirilmeli (content.json → site.url ile aynı olmalı).
// Sitemap ve canonical/OG mutlak URL'leri bu değere göre üretilir.
export default defineConfig({
  site: 'https://www.arzuduman.com',
  integrations: [sitemap()],
});
