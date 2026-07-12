import sharp from 'sharp';

// Bu script iki iş yapar:
//   1) Hero kadrajını (1:1) arzu.jpg'den üretir (JPG fallback).
//   2) Hem hero hem Hakkımda portresi için WebP + AVIF eşleniklerini, o an
//      YAYINDA OLAN JPG dosyalarından üretir. Component'ler <picture> ile modern
//      formatı sunup JPG'yi yedek tutar (bkz. Hero.astro / About.astro).
//
// ÖNEMLİ NOT: arzu-portrait.jpg ELLE seçiliyor (bkz. commit cdea484 — arzu.jpg'den
// türetilen 4:5 kadraj yerine elle kırpılmış bir kare kullanıldı). Bu yüzden
// portrenin JPG'sini burada YENİDEN ÜRETMİYORUZ; yalnızca webp/avif eşleniklerini
// çıkarıyoruz. Portreyi değiştirmek istersen arzu-portrait.jpg'yi elle güncelle,
// sonra bu script'i çalıştır — modern formatlar tazelenir.
// (Referans 4:5 kadraj, arzu.jpg'den: extract {left:200,top:200,width:1000,height:1250}, resize 900.)

const heroRegion = { left: 0, top: 160, width: 1200, height: 1200 };

// 1) Hero kadrajı (1:1) — arzu.jpg'den JPG fallback (LCP elementi).
await sharp('public/images/arzu.jpg')
  .extract(heroRegion)
  .sharpen({ sigma: 0.6 })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/images/arzu-hero.jpg');

// 2) Modern format eşlenikleri (WebP + AVIF) — yayındaki JPG'lerden birebir.
for (const base of ['arzu-hero', 'arzu-portrait']) {
  const src = `public/images/${base}.jpg`;
  await sharp(src).webp({ quality: 82 }).toFile(`public/images/${base}.webp`);
  await sharp(src).avif({ quality: 55, effort: 4 }).toFile(`public/images/${base}.avif`);
  const m = await sharp(src).metadata();
  console.log(`${base}: ${m.width}x${m.height} → webp + avif`);
}
