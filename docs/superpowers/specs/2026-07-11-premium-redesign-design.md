# Arzu Duman — Premium Yeniden Tasarım (Sanat Yönü)

**Tarih:** 2026-07-11
**Amaç:** Mevcut landing page'i "premium / çok şık / iyi hissettiren" bir seviyeye taşımak.

## NİHAİ YÖN — "Sıcak & Modern" (uygulanan)

İlk deneme koyu "nocturne" editoryal yöndü; kullanıcı geri bildirimiyle (Two Chairs, Alma,
Mindbloom gibi en iyi terapi markaları incelenerek) **sıcak, aydınlık, insani + çağdaş** bir
yöne geçildi. Uygulanan sistem:

- **Palet:** krem (`#F6F0E6`) zemin, **sage yeşili** marka (`#6E8B76`/`#4F6A57`),
  amber/kil sıcaklık aksanları. Terracotta klişesinden kaçış.
- **Modernlik:** aurora gradient mesh, **glassmorphism** kartlar, nefes dalga-görselleştirici,
  imlece tepki veren ışık, gradient metin vurgusu, yumuşak organik formlar + glow ring.
- **İnsan:** her yerde gerçek fotoğraf yuvaları (Hero dairesel portre, Hakkımda kavisli portre),
  el-çizimi/organik detaylar, drop-cap, sıcak serif (Cormorant) + Manrope.
- **Ritim:** ağırlıklı sıcak-aydınlık akış + **iki sıcak-koyu sinematik mola**
  (Nefes molası + Footer) — A içinde B'den ödünç "wow" anları.
- **İmza:** NEFES — dalga-görselleştirici, nefes alan müsaitlik noktası, tam ekran nefes molası.

### Revizyon — 2026-07-11 (ikinci tur: akış + ritim cilası)

Kullanıcı geri bildirimiyle "her alan bir section" mantığında ince ayar yapıldı:

- **Ton merdiveni (dikişsiz renk şeridi):** `global.css` içine `--tone-0…--tone-4`
  krem tonları eklendi. Her bölüm dikey bir `linear-gradient(180deg, …)` kullanır ve
  **bir bölümün alt rengi = bir sonrakinin üst rengi** → sayfada tek bir kesintisiz krem
  şerit. Krem hafifçe derinleşir → tek koyu "Nefes" gecesi → tekrar krem → koyu footer.
- **Nocturne koyu anlar:** Nefes molası ve Footer artık warm-espresso değil, **serin,
  derin teal-çam nocturne** (`--night #0F1A18`) — "alacakaranlıkta sıcak oda" konsepti:
  serin gece + merkeze havuzlanan sıcak şampanya mum-ışığı parıltısı. Sage markasıyla
  akraba, premium.
- **Temiz nocturne kenarları:** Işıktan-karanlığa gradient'i koyu bölümün İÇİNE koymak
  üst/alt kenarlarda "beyazlık" bırakıyordu → kaldırıldı. Nocturne bölümler artık **dolu,
  derin radial** (merkez hafif açık `--night-2` → kenarlar en koyu `--night-deep`) + üst/alt
  **dikey vignette** ile kendi içinde derinleşir; krem ile buluşma **keskin ve temiz** bir
  kenardır (kremden iz yok). Merkezdeki sıcak mum-ışığı parıltısı korunur. Sr. AD kararı:
  koyu anlar bilinçli, dolu "moment"ler olarak durmalı — bulanık sızıntı değil.
- **Typewriter temposu** premium sakinliğe yavaşlatıldı (~34ms/kar → ~72–120ms/kar,
  noktalama duraklamaları uzatıldı).
- **Krem merdiveni** biraz daha geniş aralığa çekildi (`#FBF7F0 … #E3D5BD`) → gradient
  derinliği daha okunur, ama hâlâ yumuşak.

**Sanat yönetmeni cila turu (bütünsel bakış):**
- **Portre placeholder'ları** boş gri daireden **zarif "AD" serif italik monograma** çevrildi
  (Hero dairesel + Hakkımda kavisli) → geçici halde bile "eksik" değil, markalı durur.
  Gerçek fotoğraf gelince değiştirilecek.
- **Uzmanlık** bölümü sıkıştırıldı (satır/başlık/padding) → ~1353px'ten ~945px'e; standart
  laptop ekranlarında tek ekrana sığar, kalabalık değil.
- **Hero güven rozetleri** daha okunur (punto/renk/onay ikonu), **`.glow-accent` gradienti**
  biraz zenginleştirildi → "nefes" vurgusu net görünür.
- **Favicon** yeni nocturne + sıcak-altın italik "A" mührü; **OG görseli** sıcak-krem premium
  karta yenilendi (aurora, monogram portre, gradient "nefes" vurgusu) — siteyle tutarlı.
- Mobil (≤606px) doğrulandı: hero stack, daktilo, nocturne temiz kenarlar, sticky CTA — sorun yok.

**Açık kalan (içerik — kullanıcıda):** gerçek portre fotoğrafları, gerçek iletişim
bilgileri (telefon/e-posta/WhatsApp — randevu linki bunları kullanıyor), KVKK metninin
finalize edilmesi.
- **Tam ekran bölümler:** `.section-full` yardımcı sınıfı (`min-height:100svh` + dikey
  ortalama); ≤880px'te `min-height:auto` ile rahatlar (içerik kırpılmaz).
- **① Hero:** başlık ölçeği düşürüldü (`88px` → `clamp(38px,4.6vw,62px)`).
- **② Manifesto ("Bir hatırlatma"):** açık krem zemin + **daktilo (typewriter) efekti** —
  görünüme girince metin harf harf yazılır; vurgu ("yardıma ihtiyacım var") gradient
  italik olarak korunur; `prefers-reduced-motion`/JS yoksa tam metin görünür kalır.
- **③ Hakkımda:** koyu (`--ink`) zemin kaldırıldı, krem ton merdivenine dahil edildi.
- **④ Danışan Deneyimleri (Testimonials) kaldırıldı**; bölüm numaraları güncellendi
  (Ön Görüşme → 04, SSS → 05).

Aşağıdaki eski bölüm koyu "nocturne" ilk denemesini belgeler (tarihsel kayıt).

---

## Konsept — "Alacakaranlıkta Sıcak Bir Oda"

Site, birinin en kırılgan anında adım attığı sıcak, loş, güvenli bir oda gibi hissettirir.
Işık dikkatin gitmesi gereken yere havuzlanır; ritim bir nefes gibi akar. Şıklık gürültüden
değil ölçek + boşluk + sıcaklıktan gelir.

**Ayrıştıran ana karar:** AI-üretimi tasarımların 1 numaralı default'u olan
"krem zemin + yüksek kontrastlı serif + terracotta aksan" görünümünden kaçış.
Açık krem bölümler bırakılıp baştan sona **sıcak-koyu** bir tuvale geçilir (mevcut sitenin
en güçlü yanı zaten koyu hero). Terracotta yerine **şampanya-altını** aksan.

## Token Sistemi

### Renk
| Token | Hex | Kullanım |
|---|---|---|
| `--ink` | `#0B1410` | En derin sıcak orman-siyahı — ana zemin |
| `--ink-2` | `#101C16` | Yükseltilmiş bölüm zeminleri |
| `--ink-3` | `#16241D` | Kart / yüzey |
| `--bone` | `#EFE7D6` | Birincil metin (sıcak fildişi) |
| `--mist` | `#AAB4A6` | İkincil metin (soluk adaçayı-gri) |
| `--mist-dim` | `#7C877C` | Üçüncül / etiket |
| `--gold` | `#C9A16B` | Şampanya aksan (ana vurgu) |
| `--gold-2` | `#E0BE8C` | Açık altın (shimmer / hover) |
| `--gold-deep` | `#A67C46` | Koyu altın |
| `--sage` | `#86A491` | Yaşayan yeşil (çok az kullanılır) |
| `--dawn` | `#F2EAD9` | Tek "ışık molası" bölüm zemini |
| `--dawn-ink` | `#1C2A22` | Dawn üzerindeki metin |

Ek malzeme: ince **film grain** overlay, sıcak **havuzlanan ışık** (radial glow), sıcak gölgeler
(gri değil). True black yok; sıcak off-black'ler.

### Tipografi
- **Display:** Cormorant Garamond Variable — romantik, devasa ölçek, sıkı satır aralığı,
  gerçek italikler, asılı noktalama. Duygusal başlıklar için.
- **Gövde:** Manrope Variable — okunur, sıcak-nötr.
- **Utility (ayrıştıran üçüncü ses):** IBM Plex Mono (400/500, latin + latin-ext) — YALNIZ
  minik etiketler, yan index numaraları, meta (ör. "01 — HAKKIMDA", "15 DAKİKA", "34 · KAYGI").
  Romantizm + hassasiyet gerilimi = "kanıta dayalı ama sıcak".

### Layout
- Asimetrik editoryal grid, geniş kenar boşlukları, cömert negatif alan (boşluk = duyulmanın lüksü).
- Masaüstünde ince, kalıcı **yan index** (mono numaralar 01–06, aktif bölüm ışıklı) — monograf hissi.
  Gerekçe: içerik gerçekten bir dizi; tereddütlü okuyucu nerede olduğunu görmekten fayda görür.
- Bölümler arası full-bleed atmosferik "levhalar" (grain + parallax) — görsel yuvaları.
- Havuzlanan ışık: odak içeriğin arkasında sıcak radial glow ("ışık seni buluyor" motifi).
- Asılı noktalama, drop-cap, pull-quote.

### İmza — NEFES
Tek akılda kalan öğe. Hero'daki nefes orb'u tüm siteye yayılan bir sisteme dönüşür:
- Hero: rafine, sıcak, havuzlanan ışık orb'u.
- Yan index'te nefes alan minik nokta (aktif konum).
- CTA'da yumuşak nefes glow'u.
- Sayfa ortasında **tam ekran "nefes al / nefes ver" molası** — scroll'a bağlı, duygusal merkez;
  "wow" ama sakin. THE bold moment. Diğer bölümler sessiz/disiplinli.
- `prefers-reduced-motion` tam desteklenir.

## Bölüm Anlatı Arkı (yeniden kurgu)
Varış & rahatlama → dürüstlüğe davet → kim olduğum → neyde destek → nasıl işliyor →
sesler → ilk adım → sorular → kapanış.

1. **Hero** — "Burada, bir nefes alabilirsiniz." Daha büyük tip, editoryal index işareti, rafine
   nefes orb'u, atmosferik grain, mıknatıs CTA.
2. **Manifesto molası** — full-bleed sakin levha, devasa serif tek satır.
3. **Hakkımda** — editoryal yayılım: büyük portre levhası (görsel yuvası) + drop-cap giriş +
   zarif künye listesi + imza. Asimetrik.
4. **Uzmanlık** — üniform 6 kart yerine editoryal index/liste: numaralı, büyük serif başlıklar,
   hover'da açıklama; dergi içindekiler sayfası hissi.
5. **Nefes molası** — imza scroll momenti (nefes al/ver), tam ekran, tek ışık (dawn) bölümü.
6. **Süreç** — rafine dikey editoryal timeline, büyük mono numaralar.
7. **Deneyimler** — büyük pull-quote'lar, editoryal.
8. **Ön Görüşme** — mevcut sihirbaz korunur ama sakin/premium yeniden stillenir; hafif yükseltilmiş yüzey.
9. **SSS** — rafine akordeon.
10. **Footer** — büyük serif kapanış "dur. nefes al. başla.", atmosferik.

## Görsel Yuvaları (sonradan stok/AI foto)
Hero backdrop (opsiyonel), Manifesto levhası, Hakkımda portresi, Nefes molası backdrop,
1–2 doku/detay levhası. Her biri zarif, etiketli yer tutucu + content.json'da rehber not.

## Teknik
- **Astro'da kal** (hızlı, kurulu). Framework değişmez.
- Bileşen yapısı korunur. Genişletilmiş tokenlar (global.css), grain overlay, yükseltilmiş reveal
  (satır maskesi), yan index bileşeni, image-plate bileşeni, nefes molası bileşeni eklenir.
- Performans: CSS tabanlı hareket, IntersectionObserver, minimum JS. Self-hosted fontlar.
- Erişilebilirlik: focus ring, reduced-motion, semantik yapı, alt metin korunur.
- IBM Plex Mono self-hosted eklenir (@fontsource/ibm-plex-mono, 400/500, latin + latin-ext).

## Yaklaşım
Artımlı: önce temel (tokenlar, grain, reveal upgrade, yan index) + Hero kurulur ve gösterilir;
onay/geri bildirim sonrası bölüm bölüm ilerlenir. Kullanıcı emeği görmek istiyor.
