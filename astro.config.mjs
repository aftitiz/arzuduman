import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// NOT: `site` gerçek domain ile değiştirilmeli (content.json → site.url ile aynı olmalı).
// Sitemap ve canonical/OG mutlak URL'leri bu değere göre üretilir.
export default defineConfig({
  site: 'https://www.arzuduman.com',
  vite: {
    build: {
      // KRİTİK: CSS küçültücü (esbuild) medya sorgularını modern "aralık" sözdizimine
      // (ör. `@media (width <= 880px)`) çevirmesin diye eski tarayıcıları hedefliyoruz.
      // O sözdizimini yalnızca Safari 16.4+ (Mart 2023) destekler; daha eski iOS Safari
      // ve uygulama-içi WebView'lerde (WhatsApp/Instagram tarayıcısı vb.) TÜM mobil medya
      // sorguları yok sayılır → sayfa mobilde masaüstü düzeninde "bozuk" görünür.
      // Eski hedef, uyumlu `@media (max-width: 880px)` çıktısını garanti eder.
      cssTarget: ['safari13', 'ios13', 'chrome80', 'firefox72', 'edge88'],
    },
  },
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
