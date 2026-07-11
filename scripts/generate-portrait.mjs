import sharp from 'sharp';

const aboutRegion = { left: 200, top: 200, width: 1000, height: 1250 };
const heroRegion = { left: 0, top: 160, width: 1200, height: 1200 };

// Fotoğraf değişirse bu iki bloğu yeni yüz konumuna göre güncelle.
await sharp('public/images/arzu.jpg')
  .extract(aboutRegion)
  .resize({ width: 900 })
  .sharpen({ sigma: 0.6 })
  .jpeg({ quality: 80, mozjpeg: true })
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
