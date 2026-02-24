# Lonestar Agro – Google entegrasyon checklist

Proje durumu ve bir sonraki adımlar. Cursor ile döşenen taşlar işaretli.

---

## 1. Temel kurulumlar

| Madde | Durum | Not |
|--------|--------|-----|
| Google Cloud Projesi: Faturalandırma açık, aktif proje | ⬜ Sizin | Konsolda kontrol edin. |
| Domain doğrulaması: lonestar-agro.com → Google Search Console | ⬜ Sizin | Search Console’da mülk ekleyip DNS/HTML doğrulama. |
| Cursor kurulumu: Proje tanıtılmış, .env hazır | ⬜ Kısmen | Proje Cursor’da. **.env.example** kök dizinde: GTM_ID, GOOGLE_ADS_*, OPENWEATHER_AGRO_API_KEY, GOOGLE_MAPS_API_KEY. `.env` oluşturup değerleri siz doldurun. |

---

## 2. Google Ads entegrasyonu (pazarlama ve dönüşüm)

| Madde | Durum | Nerede / Sonraki adım |
|--------|--------|------------------------|
| GTM veya gtag: Sitenin head’ine tag kodu | ✅ Yapıldı | **index.html**: GTM snippet (placeholder `GTM-XXXXXX`). Kendi container ID’nizi yazın. **contact.html**: gtag.js (AW-XXXXXXXXX) zaten var. |
| Gelişmiş dönüşümler (Enhanced Conversions) | ✅ Yapıldı | **contact.html**: `GOOGLE_ADS_CONFIG`, gtag. **assets/js/enhanced-conversions.js**: form submit’te e-posta SHA256 hash → `user_data` + `conversion` event. `sendConversion(email)` / `hashEmail(email)` kullanılabilir. |
| Dinamik yeniden pazarlama (view_item vb.) | ⬜ Yapılmadı | Ürün/teklif sayfalarına `gtag('event','view_item', {...})` eklenebilir; GTM’de de yapılabilir. |

---

## 3. Tarım verileri ve teknik API’ler (bireysel odaklı)

| Madde | Durum | Nerede / Sonraki adım |
|--------|--------|------------------------|
| Hava ve toprak verisi (OpenWeather Agro) | ✅ Yapıldı | **services/weatherAgro.js**: `getSoilMoistureByCoordinates(lat, lon, apiKey)`, `getWeatherByCoordinates(lat, lon, apiKey)`. Agromonitoring; koordinat → geçici polygon → soil moisture + sıcaklık. Bireysel API anahtarı: home.agromonitoring.com. |
| Harita ve alan seçimi (Google Maps JS API) | ✅ Yapıldı | **assets/js/field-selector.js**: DrawingManager, sadece Polygon. Çizim bitince GeoJSON (Feature, Polygon) üretilir; **window.selectedFieldGeoJSON** ve `fieldselected` event. **fields.html**: harita konteyneri, talimatlar, GeoJSON önizleme. **services/weatherAgro.js**: **getSoilDataByGeoJSON(geoJson, apiKey)** bu GeoJSON ile toprak verisi döner. Nav: index + locations + fields sayfasında "Fields" linki. |
| Bitki sağlığı / NDVI (Earth Engine, opsiyonel) | ⬜ Yapılmadı | Earth Engine API / NDVI genelde backend veya ayrı script; isteğe bağlı ileride eklenebilir. |

---

## 4. Veri yönetimi ve gizlilik (KVKK / GDPR)

| Madde | Durum | Nerede / Sonraki adım |
|--------|--------|------------------------|
| Çerez onay modu (Consent Mode v2) | ✅ Yapıldı | **assets/js/google-consent.js**: varsayılan `denied` (ad_storage, ad_user_data, ad_personalization, analytics_storage). `grantGoogleConsent()` / `denyGoogleConsent()`. **index.html**: script GTM’den önce, altında çerez banner (Accept/Decline). **contact.html**: consent script gtag’dan önce. |
| API anahtarı güvenliği | ⚠️ Kısmen | **weatherAgro.js** sadece Node tarafında kullanılmalı (API key backend/env’de). Frontend’de sadece conversion ID/label var (gtag için gerekli); mümkünse bunlar da GTM üzerinden yönetilebilir. |

---

## Özet: Şu an neredeyiz?

- **Yapılan:** GTM snippet (index), Enhanced Conversions (contact form + newsletter, SHA256), OpenWeather Agro (toprak nemi + hava, koordinat bazlı).
- **Sizin yapmanız gerekenler:** Google Cloud projesi, Search Console doğrulama, .env’e gerçek API anahtarları, GTM/AW placeholder’larını kendi ID’lerinizle değiştirme.
- **Sonraki adımlar (öncelik sırasıyla):**
  1. GTM ve Google Ads placeholder’larını gerçek ID’lerle güncellemek.
  2. ~~Consent Mode v2 + çerez banner~~ ✅ Yapıldı.
  3. Dinamik yeniden pazarlama (view_item) – ihtiyaç varsa.
  4. ~~Google Maps ile tarla çizimi sayfası~~ ✅ Yapıldı (fields.html + field-selector.js + getSoilDataByGeoJSON).

Bu dosyayı güncelleyerek ilerlemeyi takip edebilirsiniz.
