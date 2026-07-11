// Sitedeki portreleri ham fotoğraftan (public/images/arzu.jpg) türetir:
//   • arzu-portrait.jpg  → Hakkımda bölümü (4:5 kemer çerçeve)
//   • arzu-hero.jpg      → Hero bölümü (1:1 daire; kemerle aynı ölçek/çerçeve)
// İki kadraj da aynı yatay alanı (x 200..1200) paylaşır; böylece daire ile
// kemer aynı yakınlıkta görünür. Fotoğraf değişince yeniden çalıştır:
//   node scripts/generate-portrait.mjs
import sharp from 'sharp';

// Geniş 4:5 kadraj (Hakkımda) — yüz + gövde + ortam.
const aboutRegion = { left: 200, top: 200, width: 1000, height: 1250 };
// Kare kadraj (Hero) — kemerle aynı yatay alan ve ölçek, üstten biraz kısa.
const heroRegion = { left: 200, top: 225, width: 1000, height: 1000 };

// Fotoğraf değişirse bu iki bloğu yeni yüz konumuna göre güncelle.
await sharp('public/images/arzu.jpg')
  .extract(aboutRegion)
  .sharpen({ sigma: 0.6 })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/images/arzu-portrait.jpg');

await sharp('public/images/arzu.jpg')
  .extract(heroRegion)
  .sharpen({ sigma: 0.6 })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/images/arzu-hero.jpg');

const a = await sharp('public/images/arzu-portrait.jpg').metadata();
const h = await sharp('public/images/arzu-hero.jpg').metadata();
console.log(`arzu-portrait.jpg (Hakkımda 4:5): ${a.width}x${a.height}`);
console.log(`arzu-hero.jpg (Hero 1:1): ${h.width}x${h.height}`);
