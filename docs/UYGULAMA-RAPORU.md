# Lonestar Agro — Uygulama ve Sekme Raporu

**Tarih:** 2025  
**Kapsam:** Tüm HTML sayfaları, iç linkler, varlıklar, olası hatalar.

---

## 1. Özet

| Durum | Açıklama |
|-------|----------|
| **Linter** | Hata yok (workspace genelinde). |
| **Mevcut sayfalar** | 6 ana sayfa çalışır durumda; nav/footer’daki birçok link statik sunucuda 404 verebilir. |
| **Eksik sayfalar** | Contact, Services (hub), Industries, Projects, Careers, Locations, Privacy, Terms ve tüm servis alt sayfaları henüz yok. |
| **Görseller** | `assets/logo.png` kullanılıyor; `assets/images/` altındaki dosyalar projede kontrol edilmeli. |
| **PDF** | CV PDF’leri `assets/cvs/` içine eklenmeli; yoksa “Download CV” 404 verir. |

---

## 2. Sekmeler (Sayfalar) — Hata Durumu

### 2.1 Mevcut ve doğrudan açılabilen sayfalar

| Sayfa | Dosya | Durum | Not |
|-------|--------|------|-----|
| Ana sayfa | `index.html` | Çalışır | Logo, hero, servis kartları, CTA, form, footer. |
| Hakkımızda | `about.html` | Çalışır | Hero, hikaye, MVV, liderlik (Audrey, Bulent AYSEN), metrikler, CTA. |
| Sürdürülebilirlik | `sustainability.html` | Çalışır | Hero, odak alanları, entegrasyon, CTA. |
| Güvenlik & Uyumluluk | `safety-compliance.html` | Çalışır | Hero, 6 temel başlık, CTA. |
| Audrey Dickman CV | `audrey-dickman-cv.html` | Çalışır | Eğitim, beceriler, deneyim; “Download CV (PDF)” linki var. |
| Bulent AYSEN CV | `bulent-aysen-cv.html` | Çalışır | Profil, deneyim, uzmanlık; “Download CV (PDF)” linki var. |

Bu 6 sayfa doğrudan dosya adıyla açıldığında (örn. `index.html`, `about.html`) hata vermez.

### 2.2 Nav / Footer’da link verilen ama dosyası olmayan sayfalar

Navigasyon ve footer’da **mutlak path** (`/...`) kullanılıyor. Statik sunucuda (dosya sistemi veya basit HTTP sunucu) bu path’lerin çoğunun karşılığı **tek bir HTML dosyası** olarak yok; sunucu yönlendirme kuralları yoksa **404** veya boş sayfa görülür.

| Link (nav/footer) | Hedef | Dosya var mı? | Öneri |
|-------------------|--------|----------------|-------|
| `/` veya Home | Ana sayfa | `index.html` var | Sunucuda `/` → `index.html` veya `index.html` linki kullanın. |
| `/about` | Hakkımızda | `about.html` var | `/about` → `about.html` rewrite veya `about.html` href. |
| `/sustainability` | Sürdürülebilirlik | `sustainability.html` var | Aynı mantık. |
| `/safety-compliance` | Güvenlik & Uyumluluk | `safety-compliance.html` var | Aynı mantık. |
| `/contact` | İletişim | **Yok** | `contact.html` ekleyin veya `#contact` / form sayfasına yönlendirin. |
| `/services` | Servisler hub | **Yok** | `services/index.html` veya `services.html` ekleyin. |
| `/industries-served` | Sektörler | **Yok** | `industries-served.html` ekleyin. |
| `/projects` | Projeler | **Yok** | `projects.html` ekleyin. |
| `/careers` | Kariyer | **Yok** | `careers.html` ekleyin. |
| `/locations` | Lokasyonlar | **Yok** | `locations.html` ekleyin. |
| `/privacy` | Gizlilik | **Yok** | `privacy.html` ekleyin. |
| `/terms` | Kullanım koşulları | **Yok** | `terms.html` ekleyin. |
| `/services/agricultural-production` vb. | 6 servis alt sayfası | **Yok** | `templates/service-page.html` kullanılarak 6 sayfa üretilebilir. |

**Sonuç:** Bu linklere tıklanınca, sunucu kuralları yoksa **404 veya boş sayfa** riski var. Eksik sayfalar eklendiğinde veya linkler `.html` dosyalarına çevrildiğinde (örn. `href="contact.html"`) sekme hataları azalır.

### 2.3 Dahili linkler (sayfa içi / aynı sitede)

| Kaynak | Hedef | Durum |
|--------|--------|--------|
| About | `audrey-dickman-cv.html` | Çalışır (dosya var). |
| About | `bulent-aysen-cv.html` | Çalışır (dosya var). |
| About / Footer | `index.html` | Çalışır. |
| CV sayfaları | `about.html`, `index.html` | Çalışır. |

Bu dahili linkler **hata vermez**.

---

## 3. Varlıklar (Görseller, PDF)

### 3.1 Logo

- **Kullanılan:** `assets/logo.png` (nav, hero, footer).
- **Durum:** Dosya mevcut (yeni logo kopyalandı). Sekme hatası yok.

### 3.2 Görseller (`assets/images/`)

Aşağıdaki dosyalar kodda referans veriliyor; proje kökünde `assets/images/` altında varlıkları kontrol edilmeli:

| Dosya | Kullanıldığı yer |
|-------|-------------------|
| `vertical-farm-led.jpg` | index – Agricultural Production kartı |
| `land-management.png` | index – Land Management kartı |
| `commercial-landscape.png` | index – Commercial Landscape kartı |
| `irrigation-water-systems.png` | index – Irrigation kartı |
| `soil-crop-optimization.png` | index – Soil & Crop kartı |
| `municipal-government.png` | index – Municipal & Government kartı |
| `sub-park-community.jpg` | index – case study |
| `pond-house.png` | index – case study; safety-compliance hero (CSS) |
| `garden-waterfall.png` | index – case study |
| `pond-fountain.png` | index – sustainability blok |
| `pond-lily.png` | sustainability.html – hero (CSS) |
| `courtyard.png` | about.html – hero (CSS) |

Eksik olan görsel dosyaları **404** veya boş alan oluşturur; `assets/images/` klasörünün ve dosya adlarının varlığı doğrulanmalı.

### 3.3 PDF (CV)

| Dosya | Kullanıldığı yer | Durum |
|-------|-------------------|--------|
| `assets/cvs/audrey-dickman-cv.pdf` | about, audrey-dickman-cv.html | README’de “ekleyin” deniyor; yoksa indirme 404. |
| `assets/cvs/bulent-aysen-cv.pdf` | about, bulent-aysen-cv.html | Aynı. |

PDF’ler `assets/cvs/` içine konduğunda “Download CV (PDF)” sekmesi hata vermez.

---

## 4. Dış Bağlantılar

Aşağıdakiler harici; sunucu veya sitedeki sayfa varlığından bağımsız:

- `https://fonts.googleapis.com/` — fontlar
- `https://www.lonestar-agro.com`
- `tel:+14023639991`, `mailto:contact@lonestar-agro.com`
- `https://wa.me/...`
- LinkedIn, Twitter/X, Facebook

Bunlar doğru URL ile **sayfa hatası oluşturmaz**; yalnızca hedef sitelere bağlıdır.

---

## 5. Önerilen Düzeltmeler (Sekme / Hata Önleme)

1. **Statik sitede linkler:**  
   Nav ve footer’daki `/contact`, `/about` vb. linkleri, sunucu rewrite kullanmayacaksanız `contact.html`, `about.html` gibi doğrudan dosya adlarına çevirin; böylece tıklanınca ilgili sekme açılır ve 404 azalır.

2. **Eksik sayfalar:**  
   En azından `contact.html`, `privacy.html`, `terms.html` ekleyin; ardından ihtiyaca göre `services.html`, `industries-served.html`, `projects.html`, `careers.html`, `locations.html` ve 6 servis alt sayfası.

3. **Görseller:**  
   `assets/images/` içinde yukarıdaki dosyaların gerçekten olduğundan emin olun; yoksa placeholder veya mevcut görsellerle doldurun.

4. **CV PDF:**  
   `assets/cvs/audrey-dickman-cv.pdf` ve `assets/cvs/bulent-aysen-cv.pdf` dosyalarını ekleyin.

5. **Sunucu (opsiyonel):**  
   Kök path’leri HTML’e yönlendirmek için (örn. `/contact` → `contact.html`) Netlify/GitHub Pages vb. üzerinde redirect/rewrite kuralları kullanılabilir; bu durumda mevcut `/...` linkleri de doğru sekmeye gider.

---

## 6. Kısa Tablo: Sekme Bazında Hata Riski

| Sekme / Hedef | Dosya / Kaynak | Hata riski | Not |
|---------------|----------------|------------|-----|
| Ana sayfa | index.html | Yok | Çalışır. |
| Hakkımızda | about.html | Yok | Çalışır. |
| Sürdürülebilirlik | sustainability.html | Yok | Çalışır. |
| Güvenlik & Uyumluluk | safety-compliance.html | Yok | Çalışır. |
| Audrey CV (profil) | audrey-dickman-cv.html | Yok | Çalışır. |
| Bülent CV (profil) | bulent-aysen-cv.html | Yok | Çalışır. |
| İletişim | /contact | 404 | contact.html yok. |
| Servisler | /services, /services/... | 404 | Sayfalar yok. |
| Sektörler | /industries-served | 404 | Sayfa yok. |
| Projeler | /projects | 404 | Sayfa yok. |
| Kariyer | /careers | 404 | Sayfa yok. |
| Lokasyonlar | /locations | 404 | Sayfa yok. |
| Gizlilik / Koşullar | /privacy, /terms | 404 | Sayfalar yok. |
| Logo | assets/logo.png | Yok | Mevcut. |
| Görseller | assets/images/* | 404 / boş | Klasör/dosya kontrolü gerek. |
| CV PDF indir | assets/cvs/*.pdf | 404 | PDF’ler eklenmeli. |

---

*Rapor, mevcut repo yapısı ve linklere göre oluşturulmuştur. Görsel ve PDF varlığı yerel veya build ortamında tekrar doğrulanmalıdır.*
