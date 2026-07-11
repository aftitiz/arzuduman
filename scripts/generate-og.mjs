import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const W = 1200;
const H = 630;

// Portre dairesi — og.svg'deki <g transform="translate(1028,315)"> ve r=136 ile aynı.
const CX = 1028;
const CY = 315;
const R = 136;
const RIM = 5;

const svg = readFileSync('public/images/og.svg');
const base = sharp(svg, { density: 200 }).resize(W, H, { fit: 'contain', background: '#F6F0E6' });

const D = R * 2;
const RD = D + RIM * 2;

const circleMask = Buffer.from(
  `<svg width="${D}" height="${D}"><circle cx="${R}" cy="${R}" r="${R}" fill="#fff"/></svg>`,
);
const whiteRing = Buffer.from(
  `<svg width="${RD}" height="${RD}"><circle cx="${RD / 2}" cy="${RD / 2}" r="${RD / 2}" fill="#FBF7F0"/></svg>`,
);

const FACE_LEFT = 0.2;
const FACE_TOP = 0.125;
const FACE_SIZE = 0.8;
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

const framed = await sharp(whiteRing)
  .composite([{ input: photoCircle, top: RIM, left: RIM }])
  .png()
  .toBuffer();

const png = await base
  .composite([{ input: framed, top: Math.round(CY - RD / 2), left: Math.round(CX - RD / 2) }])
  .png({ quality: 90 })
  .toBuffer();

writeFileSync('public/images/og.png', png);
console.log(`og.png yazıldı: ${png.length} bayt (${W}x${H}, gerçek portre ile)`);
