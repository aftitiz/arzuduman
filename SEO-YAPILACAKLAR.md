# Prod Sonrası SEO · Reklam · Üst Sıralar — Yapılacaklar

> Bu liste **site yayına alındıktan sonra** adım adım uygulanacak. Öncelik sırasına göre dizildi:
> en üsttekiler "Samsun psikolog" yerel sıralaması için en yüksek etkili adımlar.
> Kod tarafı hazır — buradakiler kod dışı (hesap açma, doğrulama, içerik, reklam) işler.

---

## 0. Ön koşul — Gerçek verileri gir (SİTE YAYINA ÇIKMADAN)

Bunlar tamamlanmadan aşağıdaki SEO adımları yarım kalır. Hepsi `src/data/content.json` içinde:

- [ ] **Telefon** — `site.contact.phoneHref` (ör. `+905XXXXXXXXX`) ve `phoneDisplay`. *Placeholder `0000…` olduğu sürece schema'ya telefon EKLENMİYOR; gerçek numara girilince otomatik dahil olur.*
- [ ] **WhatsApp** — `site.contact.whatsapp` (randevu sihirbazı bunu kullanıyor).
- [ ] **Adres** — `seo.streetAddress` ve `seo.postalCode` (şu an boş).
- [ ] **Koordinat** — `seo.geo.latitude/longitude` gerçek ofis konumuyla güncelle (şu an Samsun merkez yaklaşık).
- [ ] **E-posta** — `site.contact.email` (şu an `merhaba@arzuduman.com` placeholder).
- [ ] **Instagram** — `site.contact.instagram` (`pskarzuduman`) doğrula.
- [ ] Domain gerçekten `https://www.arzuduman.com` mu? Değilse `astro.config.mjs` → `site` ve `content.json` → `site.url` birlikte güncellenmeli.
- [ ] HTTPS + www yönlendirmesi çalışıyor mu (http → https, çıplak domain → www ya da tam tersi tek bir kanonik).

> **NAP kuralı:** Ad + Adres + Telefon her yerde **birebir aynı** yazılmalı (site, Google Business, dizinler, Instagram). Tutarsızlık yerel sıralamayı düşürür.

---

## 1. Google Business Profile (GBP) — EN KRİTİK ADIM

"Samsun psikolog" aramasında haritada ve yerel sonuçlarda çıkmanın #1 şartı.

- [ ] https://business.google.com → işletme oluştur.
- [ ] **Kategori:** birincil = "Psikolog"; ikincil = "Psikoterapist" / "Ruh sağlığı hizmeti".
- [ ] İşletme adı: **NAP ile birebir aynı** (uydurma anahtar kelime ekleme — "Arzu Duman Psikolog Samsun" gibi şişirme yapma, ceza sebebi).
- [ ] Adres + konum pini doğru; yüz yüze hizmet Samsun'da.
- [ ] **Doğrulama** (telefon / kart / video) — tamamlanmadan profil yayınlanmaz.
- [ ] Çalışma saatleri: Pzt–Cuma 10:00–19:00, Cumartesi randevuya göre.
- [ ] **Fotoğraflar:** ofis, dış cephe, portre (yüksek kalite; site ile tutarlı).
- [ ] **Hizmetler:** Online Terapi, Yüz Yüze Terapi, 15 dk Ücretsiz Ön Görüşme, kaygı/panik/çift/tükenmişlik vb.
- [ ] Açıklama: sitedeki tanıtımla uyumlu, Samsun + online vurgusu.
- [ ] Web sitesi ve randevu linki (WhatsApp/telefon) ekle.
- [ ] Yayın sonrası: düzenli **GBP Posts** (haftalık/iki haftalık kısa güncelleme) — profili canlı tutar.

---

## 2. Google Search Console (GSC)

- [ ] https://search.google.com/search-console → **Domain** özelliği ekle, DNS TXT ile doğrula.
- [ ] Sitemap gönder: `https://www.arzuduman.com/sitemap-index.xml` *(zaten üretiliyor)*.
- [ ] "URL İncele" ile ana sayfayı **Dizine ekleme talep et**.
- [ ] Zenginleştirilmiş sonuçlar: **Rich Results Test** ile schema'yı doğrula → https://search.google.com/test/rich-results (Psychologist/LocalBusiness + FAQ görünmeli).
- [ ] İlk 2 hafta "Kapsam" (Coverage) ve "Deneyim/Core Web Vitals" raporlarını izle.

---

## 3. Bing Webmaster + Yandex (Türkiye'de önemli)

- [ ] **Bing Webmaster Tools** → GSC'den içe aktar, sitemap gönder.
- [ ] **Yandex Webmaster / Yandex Business** → Türkiye'de kayda değer trafik; işletmeyi ekle, sitemap gönder.

---

## 4. Yerel dizinler & psikolog platformları (citations)

Her kayıtta **NAP birebir aynı**. Öncelik sırası:

- [ ] Google Maps (GBP ile gelir), **Yandex Maps**, Apple Maps, Foursquare.
- [ ] Türkiye psikolog/terapi dizinleri (güncel olanları araştırıp seç — ör. TerapiVitrini, Psikolog.com.tr benzeri platformlar).
- [ ] Varsa meslek kuruluşu üye listeleri (ör. Türk Psikologlar Derneği üyelik dizini) — güçlü ve güvenilir backlink + E-E-A-T.
- [ ] Yerel Samsun rehber/işletme siteleri.

---

## 5. Analitik & dönüşüm takibi

- [ ] **Google Analytics 4** (veya gizlilik-dostu Plausible/Umami) kur.
- [ ] **KVKK/çerez:** GA4 çerez kullandığı için çerez onay bandı gerekebilir. Gizlilik-dostu analitik (Plausible gibi) çerezsiz çalışır, KVKK yükünü azaltır — psikolog sitesi için önerilir.
- [ ] **Dönüşüm olayları:** randevu sihirbazı tamamlanması, WhatsApp'a tıklama, telefon tıklaması, e-posta tıklaması.
- [ ] Bu olayları hem GA4'te hem (reklam açılınca) Google Ads'te dönüşüm olarak tanımla.

---

## 6. Anahtar kelime & içerik stratejisi (organik üst sıralar)

Mevcut hedefler `content.json` → `keywords`'te var. Genişletme:

- [ ] **Ana yerel sorgular:** "Samsun psikolog", "Samsun klinik psikolog", "Samsun terapi", "Samsun kaygı terapisi", "Samsun çift terapisi".
- [ ] **Online sorgular:** "online psikolog", "online terapi", "online kaygı terapisi".
- [ ] **Uzun kuyruk / niyet:** "panik atak nasıl geçer", "tükenmişlik belirtileri", "ilk terapi seansı nasıl olur" → blog içerikleri.
- [ ] **Blog ekle** (SEO + E-E-A-T): her yazı bir sorun/soru etrafında, uzman imzalı, iç link'lerle randevuya yönlendirsin. Ayda 1–2 kaliteli yazı, üretim hızından daha değerli.
- [ ] Her blog yazısına schema (Article + yazar = Person) eklenebilir (kod desteği istenirse söyle).

---

## 7. Gerçek Google yorumları (yerel sıralama + güven)

- [ ] Danışanlardan **etik biçimde** GBP'ye gerçek yorum iste (memnun danışanlara nazik hatırlatma; teşvik/ödül YOK).
- [ ] Yorumlara profesyonelce yanıt ver (gizliliği ihlal etmeden, genel dille).
- [ ] **Yalnızca gerçek, doğrulanabilir yorumlar biriktikten sonra** siteye Review/AggregateRating schema'sı eklenebilir. *Uydurma/örnek yorumla schema EKLENMEZ — Google cezası + etik ihlal riski.* (Kod hazır değil; gerçek yorumlar olunca ekletebilirsin.)

---

## 8. Backlink / off-page (otorite)

- [ ] Meslek dernekleri, mezun olunan üniversite/klinik sayfaları, eğitim aldığı kurum dizinleri.
- [ ] Yerel haber/blog/röportaj, uzman görüşü yazıları (konuk yazı).
- [ ] Instagram bio + öne çıkan hikâyelerde site linki; içeriklerde siteye yönlendirme.
- [ ] Spam/satın alınan backlink'lerden KAÇIN (ceza riski).

---

## 9. Google Ads (ücretli — hızlı görünürlük)

> Not: Sağlık/ruh sağlığı reklamlarında Google ek doğrulama/kısıtlama isteyebilir; kampanya öncesi politikayı kontrol et.

- [ ] Dönüşüm takibi (Adım 5) hazır olsun — yoksa bütçe kör harcanır.
- [ ] **Arama kampanyası:** "Samsun psikolog", "Samsun terapi" vb. + niyet odaklı kelimeler.
- [ ] **Konum hedefleme:** yüz yüze için Samsun ve çevresi; online kampanya için Türkiye (bütçeyi ayır).
- [ ] Negatif kelimeler: "ücretsiz", "iş ilanı", "psikoloji bölümü", "ödev" vb. alakasız trafiği ele.
- [ ] Reklam metinleri: 15 dk ücretsiz ön görüşme, gizlilik, uzman klinik psikolog vurgusu; açılış = ana sayfa (randevu bölümü).
- [ ] Küçük günlük bütçeyle başla, 2–4 hafta veriyle optimize et (arama terimleri raporu → negatif kelime ekle).
- [ ] Google Ads'i GSC/Analytics ile ilişkilendir.

---

## 10. Teknik izleme & bakım (sürekli)

- [ ] **PageSpeed Insights** / Lighthouse ile mobil+masaüstü skorunu ölç → https://pagespeed.web.dev/ (portre optimize edildi, iyi başlangıç).
- [ ] Core Web Vitals'ı GSC'den aylık izle (LCP/CLS/INP).
- [ ] Kırık link kontrolü, 404 takibi (GSC).
- [ ] Portre/fotoğraf değişirse: dosyayı `public/images/arzu.jpg` olarak koy + `node scripts/generate-og.mjs` çalıştır (OG kartını tazeler).
- [ ] Yeni fotoğrafı web için optimize et (~900px, ~150–200KB) — büyük dosya yükleme.
- [ ] Çeyrekte bir: schema, meta açıklamalar, anahtar kelime performansını gözden geçir.

---

## Öncelik özeti

| Sıra | İş | Etki |
|------|-----|------|
| 1 | Gerçek verileri gir (Adım 0) | Ön koşul |
| 2 | Google Business Profile | ⭐ En yüksek yerel etki |
| 3 | Search Console + sitemap | Dizine girme |
| 4 | Yorumlar (gerçek) | Yerel sıralama + güven |
| 5 | Dizinler / NAP tutarlılığı | Yerel otorite |
| 6 | Analitik + dönüşüm | Ölçüm |
| 7 | İçerik/blog | Uzun vadeli organik |
| 8 | Google Ads | Hızlı ama ücretli görünürlük |
