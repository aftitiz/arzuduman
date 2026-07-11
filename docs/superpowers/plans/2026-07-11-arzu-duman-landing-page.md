# Arzu Duman — Klinik Psikolog Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Claude Design'daki "Arzu Duman — Uzman Klinik Psikolog" tasarımını, içeriği `content.json`'dan okuyan, SEO'ya uygun bir Astro statik sitesine birebir dönüştürmek.

**Architecture:** Astro SSG. `src/data/content.json` tek doğruluk kaynağı; Astro build sırasında okur ve içeriği HTML'e gömer (SEO). Görsel bölümler `.astro` bileşenleri; etkileşimli parçalar (randevu sihirbazı, akordeon, scroll-reveal, orb, mıknatıs butonlar) bileşen içi vanilla `<script>` blokları. Randevu formu backend'siz; onayda WhatsApp/mailto linki üretir.

**Tech Stack:** Astro 4+, `@astrojs/sitemap`, Google Fonts (Cormorant Garamond + Manrope), vanilla JS/CSS. Node 18+.

## Global Constraints

- Dil: `<html lang="tr">`, tüm arayüz metni Türkçe.
- Tek `<h1>` (hero); bölümler `h2`, kartlar `h3`.
- İçerik SADECE `content.json`'dan; bileşenlerde hardcode metin yok (yapısal etiketler hariç).
- Renk paleti (tasarım token'ları): zemin `#0E1A16`, footer `#0B1512`, koyu metin `#1B2621`; accent `#C4834F`/`#D69A6A`/`#E7B183`/`#E4B486`/`#B0763F`/`#D0A377`; krem `#F1EBDE`/`#F3EEE4`/`#ECE5D7`/`#FBF7EE`/`#F6F1E7`; yeşil `#7A9E8E`/`#A8C4B0`; nötr `#B9C3BA`/`#C6CFC7`/`#8E9A90`/`#55605A`/`#2E3630`.
- Fontlar: `Cormorant Garamond` (başlık/vurgu), `Manrope` (gövde).
- `@media (prefers-reduced-motion: reduce)` animasyonları susturur.
- Mobil kırılım `< 860px`: nav linkleri gizli + alt sticky CTA.
- Görsel kaynak (birebir port için): Claude Design projesi `9407968e-b4df-4f39-b129-4c246d542a22` / `Arzu Duman - Klinik Psikolog.dc.html`; token & içerik özeti spec §4–§5.
- Commit mesajı sonu: `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

---

## File Structure

```
package.json               # Astro + @astrojs/sitemap; scripts: dev/build/preview
astro.config.mjs           # site: <domain>, integrations: [sitemap()]
.gitignore                 # node_modules, dist, .astro
src/
  data/content.json        # TÜM içerik (tek kaynak)
  data/content.ts          # content.json'u tipli import eden yardımcı (opsiyonel, JSON import)
  styles/global.css        # reset, tokens, keyframes, shimmer-accent, hover/focus, reduced-motion
  layouts/BaseLayout.astro # <head>: SEO meta, OG/Twitter, JSON-LD (Psychologist+FAQPage), font preconnect, progress bar
  components/
    Nav.astro
    Hero.astro
    Manifesto.astro
    About.astro
    Specialties.astro
    Process.astro
    Testimonials.astro
    Booking.astro
    Faq.astro
    Footer.astro
    MobileCta.astro
    Reveal.astro           # paylaşılan scroll-reveal client script (bir kez basılır)
  pages/index.astro        # content.json → bölümleri dizer
public/
  robots.txt
  favicon.svg
  images/portrait.svg      # portre yer tutucu
  images/og.svg            # OG yer tutucu (build'de png beklenir; svg geçici)
```

Her `.astro` bileşeni tek bölümden sorumlu. Etkileşim, ilgili bileşenin `<script>` bloğunda yaşar (Astro bunları bundle'lar). `Reveal.astro` scroll-reveal + growing-line + progress bar + mobil algılama gibi sayfa-genel davranışları TEK yerde toplar.

---

## Task 1: Astro iskeleti + global stiller

**Files:**
- Create: `package.json`, `astro.config.mjs`, `.gitignore`
- Create: `src/styles/global.css`
- Create: `src/pages/index.astro` (geçici boş kabuk)

**Interfaces:**
- Produces: çalışan `npm run dev` / `npm run build`; `global.css` içinde `:root` token'ları, keyframe'ler, `.shimmer-accent`, buton/kart hover sınıfları.

- [ ] **Step 1: package.json oluştur**

```json
{
  "name": "arzuduman",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^4.16.0",
    "@astrojs/sitemap": "^3.2.0"
  }
}
```

- [ ] **Step 2: astro.config.mjs oluştur**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// site: gerçek domain ile değiştirilecek (content.json.site.url ile aynı olmalı)
export default defineConfig({
  site: 'https://www.arzuduman.com',
  integrations: [sitemap()],
});
```

- [ ] **Step 3: .gitignore oluştur**

```
node_modules/
dist/
.astro/
.DS_Store
*.log
```

- [ ] **Step 4: src/styles/global.css oluştur**

Tasarımın `<helmet>` bloğundaki reset + keyframe'leri + `.shimmer-accent` + reduced-motion kuralını taşı, ek olarak yeniden kullanılabilir hover/focus sınıfları ekle:

```css
:root{
  --bg:#0E1A16; --bg-footer:#0B1512; --ink:#1B2621;
  --accent:#C4834F; --accent-2:#D69A6A; --accent-3:#E7B183; --accent-4:#E4B486;
  --paper-1:#F1EBDE; --paper-2:#F3EEE4; --paper-3:#ECE5D7; --paper-4:#FBF7EE; --paper-5:#F6F1E7;
}
*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{margin:0;font-family:'Manrope',-apple-system,system-ui,sans-serif;background:var(--bg);color:var(--ink);-webkit-font-smoothing:antialiased;}
a{color:var(--accent);text-decoration:none;}
a:hover{color:var(--accent-2);}
::selection{background:var(--accent-2);color:var(--bg);}
@keyframes breathe{0%,100%{transform:scale(1);opacity:.62}50%{transform:scale(1.14);opacity:1}}
@keyframes breatheRing{0%,100%{transform:scale(1);opacity:.45}50%{transform:scale(1.24);opacity:.85}}
@keyframes drift1{0%,100%{transform:translate(0,0)}50%{transform:translate(64px,-44px)}}
@keyframes drift2{0%,100%{transform:translate(0,0)}50%{transform:translate(-54px,54px)}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(7px)}}
@keyframes shimmer{0%{background-position:180% center}100%{background-position:-80% center}}
@keyframes dropIn{from{opacity:0;transform:translateY(-46px)}to{opacity:1;transform:translateY(0)}}
.shimmer-accent{background:linear-gradient(100deg,#D69A6A 0%,#D69A6A 40%,#F1D2AC 50%,#D69A6A 60%,#D69A6A 100%);background-size:220% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;animation:shimmer 7s ease-in-out infinite;}
/* hover yardımcıları (design'daki style-hover karşılıkları) */
.btn-accent{background:var(--accent-2);color:#14231C;transition:background .25s ease;}
.btn-accent:hover{background:var(--accent-3);}
.card-lift{transition:transform .4s cubic-bezier(.2,.7,.2,1),box-shadow .4s ease,border-color .4s ease;}
.card-lift:hover{transform:translateY(-8px);box-shadow:0 28px 56px rgba(27,38,33,.13);border-color:rgba(196,131,79,.4);}
@media (prefers-reduced-motion:reduce){*{animation-duration:.001ms!important;animation-iteration-count:1!important;}}
```

- [ ] **Step 5: geçici index.astro**

```astro
---
import '../styles/global.css';
---
<html lang="tr"><head><meta charset="utf-8"><title>Arzu Duman</title></head>
<body><main style="min-height:100vh;color:#F1EBDE;display:grid;place-items:center">iskelet çalışıyor</main></body></html>
```

- [ ] **Step 6: bağımlılıkları kur ve build doğrula**

Run: `npm install && npm run build`
Expected: `dist/index.html` üretilir, hata yok.

- [ ] **Step 7: Commit**

```bash
git add package.json astro.config.mjs .gitignore src/styles/global.css src/pages/index.astro
git commit -m "feat: Astro iskeleti ve global stil token'ları"
```

---

## Task 2: content.json — tüm içerik

**Files:**
- Create: `src/data/content.json`

**Interfaces:**
- Produces: `content` nesnesi; şema spec §4. Tüm Türkçe metin tasarımdan birebir.

- [ ] **Step 1: content.json'u spec §4 şemasıyla, aşağıdaki VERBATİM içerikle doldur**

Kritik dizilerin gerçek içeriği (tasarımın DCLogic'inden birebir):

`about.paragraphs`:
1. "Yetişkinlerle çalışan bir uzman klinik psikoloğum. Terapiyi, size bir şeyi "tamir eden" değil; kendi kaynaklarınızı yeniden fark ettiğiniz, birlikte yürüdüğümüz bir alan olarak görüyorum. İlk seansa gelirken hissedilen tedirginliği çok iyi biliyorum — bu yüzden süreci baştan sona şeffaf ve sakin tutuyorum."
2. "Bilişsel Davranışçı Terapi (BDT) ve şema terapi temelli, bütüncül bir yaklaşım kullanıyorum. Hazır bir reçete sunmuyorum; yöntemi sizin hikâyenize uyarlıyorum."

`about.credentials`: ["Uzman Klinik Psikolog — Klinik Psikoloji Yüksek Lisansı", "Bilişsel Davranışçı Terapi (BDT) ve Şema Terapi eğitimleri", "Yalnızca yetişkin danışanlarla, bireysel terapi odağında çalışma"]

`about.values`: ["Gizlilik", "Yargısız dinleme", "Empati", "Şeffaf süreç"]

`specialties` (7 — `no` otomatik `01..07`, `title`, `desc`):
1. Kaygı & Anksiyete — "Sürekli tetikte hissetme, endişe döngüleri ve "ya olmazsa" düşünceleriyle çalışma."
2. İlişki & Çift Problemleri — "İletişim tıkanıklıkları, güven, sınırlar ve tekrarlayan çatışma kalıpları."
3. İş Stresi & Tükenmişlik — "Sınır koyamama, sürekli yorgunluk ve anlam kaybıyla baş etme."
4. Özgüven & Kişisel Gelişim — "Öz-değer ve "yeterince iyi değilim" inancını birlikte dönüştürme."
5. Panik Atak & Fobiler — "Panik ataklarını anlamlandırma, beden tepkilerini yönetme ve kaçınmayı azaltma."
6. Öfke & Duygu Düzenleme — "Duyguları bastırmadan ya da patlamadan, sağlıklı biçimde ifade edebilme."
7. Travma & Kayıp / Yas — "Zorlayıcı deneyimler ve kayıpların ardından güvenli bir iyileşme alanı."

`process` (4 — `n`, `title`, `tag`, `desc`):
1. "1" · Ücretsiz Ön Görüşme · 15 DAKİKA · "Kısa bir görüntülü ya da telefon görüşmesiyle tanışırız. Ne yaşadığınızı anlatır, sorularınızı sorarsınız. Hiçbir yükümlülük yok."
2. "2" · Değerlendirme & Plan · İLK SEANS · "İlk seansta hikâyenizi daha derinlemesine dinler, hedeflerinizi netleştiririz. Size özel bir yol haritası birlikte belirlenir."
3. "3" · Düzenli Seanslar · HAFTALIK · 50 DK · "Genellikle haftada bir, 50 dakikalık seanslarla ilerleriz. Her seans güvenli, gizli ve tamamen size ayrılmış bir alandır."
4. "4" · İlerleme & Kapanış · SÜRECİN SONU · "Değişimi birlikte gözlemler, kazanımlarınızı pekiştiririz. Hazır hissettiğinizde süreci sağlıklı bir kapanışla tamamlarız."

`testimonials` (3 — `quote`, `initials`, `meta`):
1. "İlk seansa gelene kadar aylarca erteledim. Keşke daha önce başlasaydım — daha ilk görüşmede yargılanmadığımı hissettim." · E.K. · "34 · Kaygı"
2. "Tükenmişliğin normal olduğunu sanıyordum. Birlikte sınır koymayı ve kendime alan açmayı öğrendim." · M.T. · "41 · İş stresi"
3. "Eşimle aynı dili konuşamıyorduk. Bu süreç bize birbirimizi yeniden duymayı öğretti." · S.A. · "38 · İlişki"

`faqs` (6 — `q`, `a`):
1. "Bir seans ne kadar sürüyor?" — "Standart bir seans 50 dakikadır. Genellikle haftada bir görüşürüz, ancak sıklığı ihtiyacınıza göre birlikte belirleriz."
2. "Online mı yüz yüze mi çalışıyorsunuz?" — "Her ikisi de mümkün. Görüntülü online seanslar yüz yüze kadar etkili ve daha esnektir; dilerseniz ofiste yüz yüze de görüşebiliriz."
3. "Görüştüklerimiz gizli kalıyor mu?" — "Kesinlikle. Paylaştığınız her şey mesleki etik ve KVKK kapsamında tam gizlilikle korunur. Yasal zorunluluklar dışında hiçbir bilgi paylaşılmaz."
4. "İlk kez terapiye geleceğim, ne beklemeliyim?" — "Tedirginlik çok doğal. İlk görüşmede sizi bir şeye zorlamam; sadece tanışır, rahat hissettiğiniz kadar paylaşırsınız. Süreci sizin hızınızda kurgularız."
5. "Randevu iptal / erteleme politikası nedir?" — "Randevunuzu en az 24 saat öncesinden haber vererek ücretsiz erteleyebilir veya iptal edebilirsiniz. Bu süreden sonra seans ücreti geçerli olabilir."
6. "Terapi ne kadar sürer?" — "Bu tamamen size ve hedeflerinize bağlı. Bazı konular birkaç seansta ilerlerken bazıları daha uzun sürebilir. Beklentileri en baştan şeffafça konuşuruz."

`booking.perks`: ["Tamamen ücretsiz ve yükümlülüksüz", "Görüntülü veya telefonla, size uygun şekilde", "Genellikle 48 saat içinde dönüş"]
`booking.formats`: [{id:"online",icon:"💻",title:"Online görüşme",desc:"Görüntülü, evinizin rahatlığında"},{id:"yuzyuze",icon:"🪴",title:"Yüz yüze",desc:"Samsun ofisinde"}]
`booking.timeSlots`: ["10:00","11:00","12:00","14:00","15:00","16:00"]
`booking.confirmLine`: "En kısa sürede (genellikle 48 saat içinde) sizinle iletişime geçip görüşmeyi kesinleştireceğim."
`booking.kvkkNote`: "Bilgileriniz KVKK kapsamında yalnızca randevu için kullanılır ve üçüncü kişilerle paylaşılmaz."

`site`, `nav`, `hero`, `manifesto`, `footer` alanları spec §4 şemasına göre, hero/manifesto/footer metinleri tasarımdan (spec §5 & görsel kaynak). Placeholder alanlar (`site.url`, `contact.email/phone*/whatsapp`, portrait/og görselleri) net değerlerle işaretlenir.

- [ ] **Step 2: JSON geçerliliğini doğrula**

Run: `node -e "const c=require('./src/data/content.json'); console.log(c.specialties.length, c.faqs.length, c.process.length, c.testimonials.length)"`
Expected: `7 6 4 3`

- [ ] **Step 3: Commit**

```bash
git add src/data/content.json
git commit -m "feat: content.json — tüm landing page içeriği"
```

---

## Task 3: BaseLayout (SEO/`<head>`) + index kabuğu

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `content.site`, `content.faqs` (JSON-LD FAQPage için).
- Produces: `<slot />` içine bölümlerin girdiği tam `<html>` kabuğu; `data-progress` scroll çubuğu; SEO meta + JSON-LD.

- [ ] **Step 1: BaseLayout.astro yaz**

`Astro.props`'tan `site` ve `faqs` al. `<head>`'e ekle:
- `<meta charset>`, viewport, `<title>{site.title}</title>`, `<meta name="description" content={site.description}>`
- `<link rel="canonical" href={site.url}>`, `<meta name="theme-color" content="#0E1A16">`, favicon
- Open Graph: `og:type=website`, `og:title`, `og:description`, `og:url`, `og:image={site.url+site.ogImage}`, `og:locale=tr_TR`
- Twitter: `summary_large_image`, title/description/image
- Font preconnect + `Cormorant Garamond`+`Manrope` stylesheet (design'daki link)
- `import '../styles/global.css'`
- İki `<script type="application/ld+json" set:html={JSON.stringify(...)}>`:
  1. `Psychologist` (@context schema.org, name, description, url, telephone, email, image, `address` PostalAddress Samsun TR, `areaServed`, `openingHoursSpecification` Mo–Fr 10:00–19:00, priceRange)
  2. `FAQPage` — `mainEntity` = `faqs.map(f => ({"@type":"Question", name:f.q, acceptedAnswer:{"@type":"Answer", text:f.a}}))`

`<body>` içine tasarımdaki progress bar + `<slot />`.

- [ ] **Step 2: index.astro'yu BaseLayout kullanacak şekilde güncelle (bölümler sonra eklenecek)**

```astro
---
import content from '../data/content.json';
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout site={content.site} faqs={content.faqs}>
  <main id="top">
    <!-- bölümler Task 4–8'de eklenecek -->
  </main>
</BaseLayout>
```

- [ ] **Step 3: build + head doğrula**

Run: `npm run build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); console.log(/FAQPage/.test(h), /Psychologist/.test(h), /og:title/.test(h))"`
Expected: `true true true`

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro src/pages/index.astro
git commit -m "feat: BaseLayout — SEO meta, OG, JSON-LD (Psychologist + FAQPage)"
```

---

## Task 4: Nav + Hero + paylaşılan etkileşim scripti

**Files:**
- Create: `src/components/Nav.astro`, `src/components/Hero.astro`, `src/components/Reveal.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `content.nav`, `content.hero`, `content.site`.
- Produces: `Reveal.astro` — sayfada bir kez basılan, `[data-reveal]`/`[data-grow]`/`[data-progress]`/mobil (`<860px`) davranışlarını + hero orb/spotlight/magnet'i kuran global script.

- [ ] **Step 1: Nav.astro** — tasarımdaki fixed pill nav'ı port et; logo/linkler/CTA `content.nav`'dan. Linkler `.desktop-only` sınıfıyla (mobilde `display:none` via `@media(max-width:859px)` in global.css veya scoped style).

- [ ] **Step 2: Hero.astro** — tasarımdaki `<header data-hero>` bloğunu port et: drift blob'ları, nefes orb'u (`data-breath` başlangıç: `hero.orbWords[0]`), spotlight (`data-spotlight`), `dropIn` animasyonlu eyebrow/başlık/subtitle/CTA'lar. Başlık satırları `hero.headline` dizisinden; accent kelime `.shimmer-accent`. Primary CTA `data-magnet`. Trust işaretleri `hero.trust`. Scroll hint.

- [ ] **Step 3: Reveal.astro** — tasarımın DCLogic `componentDidMount` mantığını tek bir client `<script>`'e taşı:
  - progress bar (scroll yüzdesi)
  - hero spotlight (pointermove/leave)
  - `[data-magnet]` mıknatıs
  - `[data-breath]` kelime döngüsü (`hero.orbWords`, 4 sn) — kelimeler `data-words` attribute'undan okunur
  - `[data-reveal]` IntersectionObserver (opacity/translateY, `data-reveal-delay`)
  - `[data-grow]` scaleY IntersectionObserver
  - mobil algılama: `<860px` → `<body>`'ye `.is-mobile` sınıfı (nav linkleri + sticky CTA CSS ile buna bağlanır)

- [ ] **Step 4: index.astro'ya Nav, Hero, Reveal ekle** (Reveal en sonda, bir kez).

- [ ] **Step 5: dev'de görsel doğrula**

Run: `npm run build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); console.log(/data-hero/.test(h) && /shimmer-accent/.test(h))"`
Expected: `true`
Ek: `npm run dev` → tarayıcıda hero tasarıma eşleşiyor, orb "nefes al/ver" döngüsü ve scroll çubuğu çalışıyor.

- [ ] **Step 6: Commit**

```bash
git add src/components/Nav.astro src/components/Hero.astro src/components/Reveal.astro src/pages/index.astro
git commit -m "feat: Nav, Hero ve paylaşılan scroll/etkileşim scripti"
```

---

## Task 5: Manifesto + About + Specialties

**Files:**
- Create: `src/components/Manifesto.astro`, `src/components/About.astro`, `src/components/Specialties.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `content.manifesto`, `content.about`, `content.specialties`.

- [ ] **Step 1: Manifesto.astro** — `#F3EEE4` zemin, ortalanmış; eyebrow + büyük serif quote (`quoteAccent` italik/renkli). `data-reveal`.

- [ ] **Step 2: About.astro** — `#hakkimda`; sol portre (`about.portrait.src`/`alt`, `<img loading="lazy">`, tasarımın yuvarlatılmış çerçevesi), sağ metin: eyebrow, `h2`, `about.paragraphs`, `about.credentials` (✦ liste, `sc-for` yerine `.map`), `about.values` çipleri.

- [ ] **Step 3: Specialties.astro** — `#uzmanlik`; başlık bloğu + `repeat(auto-fit,minmax(300px,1fr))` grid; `specialties.map((s,i)=>...)` kartlar: `no` = `String(i+1).padStart(2,'0')`, `title` (`h3`), `desc`; kartlarda `.card-lift` + `data-reveal` (`data-reveal-delay` = `(i%3)*80`).

- [ ] **Step 4: index.astro'ya üç bölümü sırayla ekle.**

- [ ] **Step 5: build doğrula**

Run: `npm run build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); const n=(h.match(/id=\"uzmanlik\"/g)||[]).length; console.log(n===1, /Kaygı & Anksiyete/.test(h), /Travma & Kayıp/.test(h))"`
Expected: `true true true`

- [ ] **Step 6: Commit**

```bash
git add src/components/Manifesto.astro src/components/About.astro src/components/Specialties.astro src/pages/index.astro
git commit -m "feat: Manifesto, Hakkımda ve Uzmanlık bölümleri"
```

---

## Task 6: Process + Testimonials

**Files:**
- Create: `src/components/Process.astro`, `src/components/Testimonials.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `content.process`, `content.testimonials`.

- [ ] **Step 1: Process.astro** — `#surec`, koyu zemin; başlık bloğu; `process.map(st=>...)`: sol dikey ray (numaralı daire + `data-grow` büyüyen çizgi), sağ içerik (`h3` title + `tag` rozeti + `desc`). Son adımda çizgi opsiyonel.

- [ ] **Step 2: Testimonials.astro** — `#deneyimler`, `#ECE5D7` zemin; ortalanmış başlık; grid kartlar: büyük tırnak, serif `blockquote`, `initials` rozeti + `meta`. Gizlilik dipnotu (tasarımdaki sabit metin `content.testimonials` yanında ya da bileşende). `data-reveal-delay` = `i*90`.

- [ ] **Step 3: index.astro'ya ekle.**

- [ ] **Step 4: build doğrula**

Run: `npm run build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); console.log(/id=\"surec\"/.test(h), /data-grow/.test(h), /id=\"deneyimler\"/.test(h))"`
Expected: `true true true`

- [ ] **Step 5: Commit**

```bash
git add src/components/Process.astro src/components/Testimonials.astro src/pages/index.astro
git commit -m "feat: Süreç ve Deneyimler bölümleri"
```

---

## Task 7: Booking sihirbazı (dinamik takvim + WhatsApp/mailto)

**Files:**
- Create: `src/components/Booking.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `content.booking`, `content.site.contact` (whatsapp, email).
- Produces: `#randevu`; istemci `<script>` içinde durum makinesi.

- [ ] **Step 1: Booking.astro işaretlemesi** — sol sütun (eyebrow/başlık/subtitle/`perks`), sağ kart. Kart içinde 5 durum bölümü tek DOM'da render edilir; JS aktif adımı `hidden` ile yönetir (server-render'da Adım 1 görünür, SEO nötr). Progress dots, format butonları (`content.booking.formats`), takvim grid'i (`.cal-grid`, JS doldurur), saat butonları (`content.booking.timeSlots`), form inputları, onay ekranı. `content.site.contact.whatsapp` ve `email` `data-` attribute olarak kart köküne yazılır.

- [ ] **Step 2: istemci script (durum makinesi)** — bileşen `<script>`'i:

```js
const root = document.querySelector('[data-booking]');
const wa = root.dataset.whatsapp, email = root.dataset.email;
const state = { step:1, format:null, date:null, time:null, form:{name:'',phone:'',email:'',note:''} };
const fmtLabel = id => id==='online' ? 'Online görüşme' : id==='yuzyuze' ? 'Yüz yüze (Samsun ofisi)' : '—';
const days = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
const months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
const now = new Date();                     // DİNAMİK: içinde bulunulan ay
const Y = now.getFullYear(), M = now.getMonth(), today = now.getDate();
function buildCalendar(){ /* tasarımın buildCalendar mantığı, hafta sonu + <=today pasif */ }
function dateLabel(d){ return d+' '+months[M]+' '+Y+', '+days[new Date(Y,M,d).getDay()]; }
function render(){ /* progress dots, adım görünürlüğü, seçili vurgular, buton disabled/renk */ }
function confirm(){
  const msg = `Merhaba, ön görüşme talebi:\n• Format: ${fmtLabel(state.format)}\n• Tarih: ${dateLabel(state.date)}\n• Saat: ${state.time}\n• Ad: ${state.form.name}\n• Telefon: ${state.form.phone}`;
  if (wa && wa.replace(/\D/g,'').length>=10) window.open(`https://wa.me/${wa.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`,'_blank','noopener');
  else window.location.href = `mailto:${email}?subject=${encodeURIComponent('Ön görüşme talebi')}&body=${encodeURIComponent(msg)}`;
  state.step = 5; render();
}
// event delegation: format/day/time/next/back/submit/reset + input handlers → state güncelle, render()
```

Adım geçiş kuralları: Adım1 `format` seçilene, Adım2 `date`, Adım3 `time`, Adım4 `name.length>1 && (phone.length>5 || email.length>4)` olana kadar "Devam"/"Onayla" pasif.

- [ ] **Step 3: index.astro'ya ekle.**

- [ ] **Step 4: build + davranış doğrula**

Run: `npm run build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); console.log(/id=\"randevu\"/.test(h), /data-booking/.test(h))"`
Expected: `true true`
Ek (dev): 4 adım ilerliyor; takvim içinde bulunulan ayı gösteriyor, geçmiş/hafta sonu pasif; onayda WhatsApp linki doğru mesajla açılıyor; "Yeni randevu planla" sıfırlıyor.

- [ ] **Step 5: Commit**

```bash
git add src/components/Booking.astro src/pages/index.astro
git commit -m "feat: randevu sihirbazı — dinamik takvim + WhatsApp/mailto"
```

---

## Task 8: FAQ + Footer + MobileCta

**Files:**
- Create: `src/components/Faq.astro`, `src/components/Footer.astro`, `src/components/MobileCta.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `content.faqs`, `content.footer`, `content.site`, `content.nav`.

- [ ] **Step 1: Faq.astro** — `#sss`; `faqs.map` akordeon öğeleri; her `<button>` `aria-expanded` + hedef panel `id`. Bileşen `<script>`: tıklamada `aria-expanded` toggle, `+` ikonu 45° döner, panel `max-height` 0↔ölçülen `scrollHeight`. Erişilebilirlik: `aria-controls`.

- [ ] **Step 2: Footer.astro** — `content.footer` + `content.site.contact`: kapanış CTA (`closingWords` "dur./nefes al./başla."), iletişim (email/phone/location), çalışma saatleri (`contact.hours`), copyright + linkler. `mailto:`/`tel:` doğru href'ler.

- [ ] **Step 3: MobileCta.astro** — alt sabit CTA; `body.is-mobile` iken görünür (global.css: varsayılan `display:none`, `.is-mobile &` görünür). `#randevu`'ya link.

- [ ] **Step 4: index.astro'ya ekle** (MobileCta, Reveal'den önce/sonra fark etmez; body sonunda).

- [ ] **Step 5: build doğrula**

Run: `npm run build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); console.log(/id=\"sss\"/.test(h), (h.match(/aria-expanded/g)||[]).length===6, /Tüm hakları saklıdır/.test(h))"`
Expected: `true true true`

- [ ] **Step 6: Commit**

```bash
git add src/components/Faq.astro src/components/Footer.astro src/components/MobileCta.astro src/pages/index.astro
git commit -m "feat: SSS akordeon, footer ve mobil sticky CTA"
```

---

## Task 9: SEO tamamlama + genel doğrulama

**Files:**
- Create: `public/robots.txt`, `public/favicon.svg`, `public/images/portrait.svg`, `public/images/og.svg`
- Modify: gerekiyorsa `astro.config.mjs`, `content.json` (görsel yolları)

**Interfaces:**
- Produces: `sitemap-index.xml` (build çıktısı), `robots.txt`, yer tutucu görseller.

- [ ] **Step 1: public/robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://www.arzuduman.com/sitemap-index.xml
```

- [ ] **Step 2: favicon.svg + portrait.svg + og.svg** — palet uyumlu, zarif yer tutucular (portre: krem zemin + "AD" monogram/silüet; og: koyu zemin + isim/unvan). `content.json` görsel yolları bunlara işaret eder.

- [ ] **Step 3: tam build + çıktı doğrula**

Run: `npm run build && ls dist/sitemap-index.xml dist/robots.txt && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); console.log('h1:', (h.match(/<h1/g)||[]).length, 'sections ok:', ['top','hakkimda','uzmanlik','surec','deneyimler','randevu','sss'].every(id=>h.includes('id=\"'+id+'\"')))"`
Expected: `sitemap-index.xml` ve `robots.txt` mevcut; `h1: 1 sections ok: true`

- [ ] **Step 4: (opsiyonel) JSON-LD geçerlilik gözden geçir** — `dist/index.html` içindeki iki `application/ld+json` bloğunu `JSON.parse` ile doğrula (kırık değil).

Run: `node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); const m=[...h.matchAll(/<script type=\"application\/ld\+json\"[^>]*>([\s\S]*?)<\/script>/g)]; m.forEach(x=>JSON.parse(x[1])); console.log('ld+json valid:', m.length)"`
Expected: `ld+json valid: 2`

- [ ] **Step 5: Commit**

```bash
git add public/
git commit -m "feat: robots.txt, favicon, yer tutucu görseller ve SEO doğrulama"
```

---

## Self-Review (yazım sonrası)

- **Spec kapsamı:** §3 yapı→Task1/3/4-8; §4 içerik→Task2; §5 token→Task1; §6 etkileşim→Task4/7/8 (Reveal + Booking + Faq); §7 randevu→Task7; §8 SEO→Task3/9; §9 placeholder→Task2/9. Boşluk yok.
- **Placeholder taraması:** planda "TBD/TODO" yok; tüm bölüm içerikleri Task2'de verbatim; JS iskeleti Task7'de somut.
- **Tip tutarlılığı:** `content.*` yolları spec §4 ile birebir; `data-reveal`/`data-grow`/`data-magnet`/`data-breath`/`data-booking`/`is-mobile` isimleri tüm görevlerde tutarlı; `formats[].id` = `online`/`yuzyuze` hem işaretleme hem JS'te aynı.

## Notlar
- `content.json`'daki placeholder iletişim/domain değerleri gerçek verilerle değiştirilene kadar WhatsApp linki `mailto`'ya düşer (Task7 fallback).
- Görsel birebir sadakat için bileşenler tasarımın inline stillerini korur; tekrar eden hover'lar `global.css` sınıflarına taşınır.
