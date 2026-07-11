# Arzu Duman — Klinik Psikolog Landing Page — Tasarım Dokümanı

**Tarih:** 2026-07-11
**Durum:** Onaylandı (kullanıcı, 2026-07-11)
**Kaynak tasarım:** Claude Design projesi `9407968e-b4df-4f39-b129-4c246d542a22` → `Arzu Duman - Klinik Psikolog.dc.html`

## 1. Amaç

Claude Design'da hazırlanan "Arzu Duman — Uzman Klinik Psikolog" landing page tasarımını, **birebir görsel sadakatle** çalışan bir web sayfasına dönüştürmek. İçerik bir JSON dosyasından okunacak (ileride dinamik hale getirilebilmesi için) ve kod SEO'ya ("aso") uygun yazılacak.

## 2. Kararlar

| Konu | Karar | Gerekçe |
|------|-------|---------|
| Mimari | **Astro (SSG)** | `content.json`'u build sırasında okuyup içeriği HTML'e gömer → SEO için içerik ilk yanıtta hazır; framework runtime'ı gitmez. İleride JSON → CMS/API geçişi bileşenleri değiştirmeden yapılır. |
| İçerik kaynağı | **`src/data/content.json`** (tek doğruluk kaynağı) | Sunum ile içeriğin ayrışması; "sonradan dinamik" hedefi. |
| Randevu formu | Sihirbaz korunur; "Onayla"da seçim **hazır WhatsApp mesajı** (birincil) / **mailto** (alternatif) olarak iletilir | Backend'siz çalışır; KVKK notu kalır. |
| Takvim | Sabit Temmuz 2026 yerine **içinde bulunulan aya göre dinamik** | Sayfa yaşadıkça güncel kalır; geçmiş gün + hafta sonu pasif. |
| Stil | Tasarımın inline stilleri korunur; tekrarlayan bileşenler için CSS sınıfları; `style-hover`/`style-focus` → gerçek `:hover`/`:focus` CSS | Görsel sadakat + bakım kolaylığı. |

## 3. Proje yapısı

```
arzuduman/
  package.json
  astro.config.mjs            # site URL, @astrojs/sitemap entegrasyonu
  src/
    data/content.json         # TÜM içerik (tek kaynak)
    layouts/BaseLayout.astro   # <head>, SEO meta, OG/Twitter, JSON-LD, font preconnect
    components/
      Nav.astro
      Hero.astro
      Manifesto.astro
      About.astro
      Specialties.astro
      Process.astro
      Testimonials.astro
      Booking.astro           # 4 adımlı sihirbaz + client script
      Faq.astro               # akordeon
      Footer.astro
      MobileCta.astro
    pages/index.astro         # content.json'u import eder, bölümleri dizer
    styles/global.css         # reset, keyframes, shimmer-accent, hover kuralları
    scripts/                  # (gerekirse) paylaşılan client JS
  public/
    images/                   # portre yer tutucu, og görseli, favicon
    robots.txt
```

## 4. İçerik modeli (`content.json`)

Bölümlerle birebir eşleşen şema (tüm Türkçe içerik tasarımdan aynen çıkarıldı):

```jsonc
{
  "site": {
    "name": "Arzu Duman",
    "role": "Uzman Klinik Psikolog",
    "title": "Arzu Duman — Uzman Klinik Psikolog | Yetişkin Terapisi",
    "description": "<meta description, ~155 karakter>",
    "url": "https://www.arzuduman.com",        // PLACEHOLDER
    "locale": "tr_TR",
    "ogImage": "/images/og.jpg",
    "contact": {
      "email": "merhaba@arzuduman.com",        // PLACEHOLDER
      "phoneDisplay": "+90 (000) 000 00 00",   // PLACEHOLDER
      "phoneHref": "+900000000000",            // PLACEHOLDER
      "whatsapp": "905000000000",              // PLACEHOLDER (uluslararası, + ve boşluksuz)
      "location": "Samsun · Online & yüz yüze",
      "hours": { "days": "Pazartesi – Cuma", "time": "10:00 – 19:00", "note": "Cumartesi randevuya göre" }
    }
  },
  "nav":   { "logo": "Arzu Duman", "links": [ {"label":"Hakkımda","href":"#hakkimda"}, ... ], "cta": "Ön Görüşme" },
  "hero":  { "eyebrow": "...", "headline": [...], "accentWord": "nefes", "subtitle": "...",
             "ctaPrimary": "...", "ctaSecondary": "...", "trust": ["Online & yüz yüze","%100 gizli","Yalnızca yetişkin danışanlar"],
             "orbWords": ["nefes al","nefes ver"] },
  "manifesto": { "eyebrow": "Bir hatırlatma", "quote": "...", "quoteAccent": "..." },
  "about": { "eyebrow":"01 — Hakkımda", "heading":"Merhaba, ben Arzu.",
             "paragraphs": ["...","..."], "credentials": [3 madde], "values": [4 çip],
             "portrait": { "src": "/images/portrait.jpg", "alt": "Uzman Klinik Psikolog Arzu Duman portresi" } },
  "specialties": [ {"title":"Kaygı & Anksiyete","desc":"..."}, ... 7 adet ],
  "process":    [ {"n":"1","title":"Ücretsiz Ön Görüşme","tag":"15 DAKİKA","desc":"..."}, ... 4 adet ],
  "testimonials":[ {"quote":"...","initials":"E.K.","meta":"34 · Kaygı"}, ... 3 adet ],
  "booking": {
    "eyebrow":"05 — Ön Görüşme", "heading":"...", "subtitle":"...",
    "perks": [3 madde],
    "formats": [ {"id":"online","icon":"💻","title":"Online görüşme","desc":"..."},
                 {"id":"yuzyuze","icon":"🪴","title":"Yüz yüze","desc":"Samsun ofisinde"} ],
    "timeSlots": ["10:00","11:00","12:00","14:00","15:00","16:00"],
    "kvkkNote": "...", "confirmLine": "..."
  },
  "faqs": [ {"q":"Bir seans ne kadar sürüyor?","a":"..."}, ... 6 adet ],
  "footer": { "cta": {...}, "closingWords": ["dur.","nefes al.","başla."],
              "links": [ {"label":"Gizlilik & KVKK","href":"#"}, {"label":"SSS","href":"#sss"} ],
              "copyright": "© 2026 Arzu Duman · Tüm hakları saklıdır." }
}
```

Tam Türkçe içerik (7 uzmanlık, 4 süreç adımı, 3 deneyim, 6 SSS, credentials, values) tasarımın DCLogic mantığından birebir alınmıştır ve implementasyonda `content.json`'a yazılacaktır.

## 5. Tasarım token'ları (görsel sadakat için)

- **Fontlar:** `Cormorant Garamond` (serif — başlıklar, vurgular), `Manrope` (sans — gövde). Google Fonts preconnect.
- **Renkler:** koyu zemin `#0E1A16` / footer `#0B1512`; koyu metin `#1B2621`; terracotta accent `#C4834F` `#D69A6A` `#E7B183` `#E4B486` `#B0763F` `#D0A377`; krem/kâğıt `#F1EBDE` `#F3EEE4` `#ECE5D7` `#FBF7EE` `#F6F1E7`; yeşil orb'lar `#7A9E8E` `#A8C4B0`; nötr metinler `#B9C3BA` `#C6CFC7` `#8E9A90` `#55605A` `#2E3630`.
- **Animasyonlar (keyframes):** `breathe`, `breatheRing`, `softpulse`, `drift1`, `drift2`, `bob`, `floaty`, `shimmer`, `dropIn`. `shimmer-accent` = gradient-clip metin. `@media (prefers-reduced-motion: reduce)` ile animasyonlar susturulur.

## 6. Etkileşimli davranışlar (client-side, tasarımdan taşınacak)

1. **Scroll progress bar** (üst çizgi, sayfa kaydırma yüzdesi)
2. **Mobil algılama** (`< 860px`) → nav linklerini gizle + alt sticky CTA göster
3. **Hero imleç ışığı** (spotlight, pointermove)
4. **Mıknatıs butonlar** (`data-magnet`, imlece hafif yaslanma)
5. **Nefes orb'u** — "nefes al" / "nefes ver" kelime döngüsü (4 sn)
6. **Scroll-reveal** — `IntersectionObserver` ile opacity/translate (delay destekli)
7. **Büyüyen bağlayıcı çizgiler** (süreç adımları, `scaleY`)
8. **SSS akordeon** — tek tek aç/kapa, ikon 45° döner, `max-height` geçişi
9. **Randevu sihirbazı** — durum makinesi (aşağıda)

Tüm event listener'lar sayfa yaşam döngüsünde düzgün eklenir/temizlenir.

## 7. Randevu sihirbazı davranışı

- **Durum:** `{ step, format, date, time, form:{name,phone,email,note} }`
- **Adımlar:** 1) format (online/yüz yüze) → 2) takvim → 3) saat → 4) iletişim formu → 5) onay ekranı
- **İlerleme:** her adımın "Devam et" butonu ilgili seçim yapılana kadar pasif; adım göstergesi dolar
- **Takvim (dinamik):** içinde bulunulan ay; bugünden önceki günler ve hafta sonları pasif; seçilebilir günler tıklanınca vurgulanır
- **Onay (Adım 4 → 5):** ad + (telefon ya da e-posta) doluysa aktif. "Randevuyu onayla"da seçilen **format · tarih · saat · ad · telefon** bilgileri:
  - **Birincil:** `https://wa.me/<whatsapp>?text=<encode(mesaj)>` ile WhatsApp'a yönlendirir
  - **Alternatif:** `mailto:<email>?subject=...&body=...`
  - Onay ekranında özet + "Yeni randevu planla" (reset)
- **KVKK notu** korunur; hiçbir veri sunucuya gönderilmez (backend kapsam dışı).

## 8. SEO ("aso") gereksinimleri

- `<html lang="tr">`, semantik yapı: `header > nav`, `main`, `section[aria-labelledby]`, `footer`; **tek `<h1>`** (hero), düzenli `h2`/`h3` hiyerarşisi
- `<title>` + `<meta name="description">` (`site`'tan), `<link rel="canonical">`
- **Open Graph** + **Twitter Card** (title, description, image, url, locale=tr_TR, type=website)
- **JSON-LD yapısal veri:**
  - `Psychologist` / `MedicalBusiness` (LocalBusiness): name, description, url, telephone, email, address (Samsun), areaServed, openingHoursSpecification, priceRange, image
  - **`FAQPage`** — 6 SSS sorusu `content.json`'dan otomatik üretilir (Google zengin sonuç)
- `@astrojs/sitemap` → `sitemap-index.xml`; `public/robots.txt` (sitemap referansıyla)
- Görsellerde açıklayıcı `alt`; favicon; `theme-color`
- Performans: minimum JS, font `display=swap`, görsel `loading="lazy"` (hero dışı), Lighthouse'ta yüksek skor hedefi

## 9. Doldurulacak placeholder'lar

- `public/images/portrait.*` — gerçek portre (şimdilik zarif yer tutucu)
- `public/images/og.jpg` — OG paylaşım görseli (şimdilik yer tutucu)
- `site.url` (domain), `contact.email`, `contact.phone*`, `contact.whatsapp` — `content.json`'da net işaretli

## 10. Kapsam dışı (gelecek)

- Gerçek backend/randevu gönderimi, ödeme, takvim entegrasyonu (Calendly/Google Calendar API)
- CMS entegrasyonu (`content.json` → API) — mimari buna hazır bırakılıyor
- Çoklu dil (i18n)

## 11. Başarı ölçütü / doğrulama

- `npm run build` hatasız; `npm run dev` ile sayfa tarayıcıda tasarıma görsel olarak eşleşiyor
- Üretilen HTML'de tüm bölüm metinleri görünür (View Source'ta içerik var → SEO)
- Sihirbaz 5 adımı çalışıyor; onayda WhatsApp/mailto linki doğru mesajla açılıyor
- SSS akordeon, scroll-reveal, orb, sticky CTA çalışıyor
- JSON-LD (`Psychologist` + `FAQPage`) geçerli; `sitemap.xml` + `robots.txt` üretiliyor
- `prefers-reduced-motion` ve mobil (`<860px`) davranışları doğru
```
