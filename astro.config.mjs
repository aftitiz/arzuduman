import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// NOT: `site` gerçek domain ile değiştirilmeli (content.json → site.url ile aynı olmalı).
// Sitemap ve canonical/OG mutlak URL'leri bu değere göre üretilir.
export default defineConfig({
  site: 'https://www.arzuduman.com',
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      // Ana sayfaya en yüksek öncelik; diğer sayfalar daha düşük.
      serialize(item) {
        if (item.url === 'https://www.arzuduman.com/') {
          item.priority = 1.0;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
});
