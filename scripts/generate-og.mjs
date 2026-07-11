// OG görselini üretir: public/images/og.svg tasarımını PNG'ye render eder ve
// sağdaki portre dairesine gerçek fotoğrafı (public/images/arzu.jpg) yerleştirir.
// Fotoğraf ya da metin değişince yeniden çalıştır:  node scripts/generate-og.mjs
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const W = 1200;
const H = 630;

// Portre dairesi — og.svg'deki <g transform="translate(1028,315)"> ve r=136 ile aynı.
const CX = 1028;
const CY = 315;
const R = 136; // fotoğraf yarıçapı
const RIM = 5; // beyaz kenar kalınlığı (px)

// 1) Arka plan: og.svg tasarımını render et (metin + gradyanlar + glow halka).
const svg = readFileSync('public/images/og.svg');
const base = sharp(svg, { density: 200 }).resize(W, H, { fit: 'contain', background: '#F6F0E6' });

// 2) Fotoğrafı yüz + omuz kadrajıyla kare kırp, daireye maskeleyip beyaz kenar ekle.
const D = R * 2; // fotoğraf çapı
const RD = D + RIM * 2; // beyaz halka dahil toplam çap

const circleMask = Buffer.from(
  `<svg width="${D}" height="${D}"><circle cx="${R}" cy="${R}" r="${R}" fill="#fff"/></svg>`,
);
const whiteRing = Buffer.from(
  `<svg width="${RD}" height="${RD}"><circle cx="${RD / 2}" cy="${RD / 2}" r="${RD / 2}" fill="#FBF7F0"/></svg>`,
);

// Yüz+omuz kadrajı — kaynak çözünürlükten bağımsız olsun diye oranlarla tanımlı.
// (Fotoğraf boyutu değişse de aynı kadrajı korur.)
const FACE_LEFT = 0.2; // sol kenar (genişliğin oranı)
const FACE_TOP = 0.125; // üst kenar (yüksekliğin oranı)
const FACE_SIZE = 0.8; // kare kadraj kenarı (genişliğin oranı)
const meta = await sharp('public/images/arzu.jpg').metadata();
const cropSize = Math.round(meta.width * FACE_SIZE);
const photoCircle = await sharp('public/images/arzu.jpg')
  .extract({
    left: Math.round(meta.width * FACE_LEFT),
    top: Math.round(meta.height * FACE_TOP),
    width: cropSize,
    height: cropSize,
  })
  .resize(D, D)
  .composite([{ input: circleMask, blend: 'dest-in' }])
  .png()
  .toBuffer();

// Fotoğrafı beyaz halkanın ortasına yerleştir.
const framed = await sharp(whiteRing)
  .composite([{ input: photoCircle, top: RIM, left: RIM }])
  .png()
  .toBuffer();

// 3) Çerçeveli portreyi arka planın portre dairesinin merkezine bindir.
const png = await base
  .composite([{ input: framed, top: Math.round(CY - RD / 2), left: Math.round(CX - RD / 2) }])
  .png({ quality: 90 })
  .toBuffer();

writeFileSync('public/images/og.png', png);
console.log(`og.png yazıldı: ${png.length} bayt (${W}x${H}, gerçek portre ile)`);
