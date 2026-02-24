/**
 * OpenWeather Agro API (Agromonitoring) – tarla koordinatlarına göre toprak nemi ve hava verisi.
 * Ücretsiz plan: günlük 1000 çağrı. API anahtarı: https://home.agromonitoring.com/api_keys
 *
 * Soil (toprak) verisi polygon gerektirir; bu modül koordinat için küçük bir polygon oluşturup
 * soil_moisture (ve sıcaklık) çeker. Weather (hava) doğrudan lat/lon ile sorgulanır.
 * Bireysel: API anahtarını .env'de OPENWEATHER_AGRO_API_KEY olarak tutun veya çağrıda geçin.
 */

const AGRO_BASE = 'https://api.agromonitoring.com/agro/1.0';

/**
 * Koordinat etrafında küçük bir kare polygon oluşturur (Agromonitoring polygon API).
 * @param {number} lat - Enlem
 * @param {number} lon - Boylam
 * @param {string} apiKey - Agromonitoring appid (OPENWEATHER_AGRO_API_KEY)
 * @param {string} [name] - Polygon adı
 * @returns {Promise<{ id: string, center: number[], area: number }>}
 */
async function createPolygonFromCoords(lat, lon, apiKey, name = 'Field point') {
  const d = 0.005; // ~0.5 km kare
  const coordinates = [
    [lon - d, lat - d],
    [lon + d, lat - d],
    [lon + d, lat + d],
    [lon - d, lat + d],
    [lon - d, lat - d]
  ];
  const res = await fetch(`${AGRO_BASE}/polygons?appid=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      geo_json: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates]
        }
      }
    })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Agro polygon create failed: ${res.status} ${err}`);
  }
  return res.json();
}

/**
 * Polygon ID ile güncel toprak verisini getirir (nem, sıcaklık).
 * @param {string} polyId - Agromonitoring polygon id
 * @param {string} apiKey - appid
 * @returns {Promise<{ moisture: number, t0: number, t10: number, dt: number }|null>}
 */
async function getSoilByPolyId(polyId, apiKey) {
  const res = await fetch(`${AGRO_BASE}/soil?polyid=${encodeURIComponent(polyId)}&appid=${encodeURIComponent(apiKey)}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Agro soil failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

/**
 * Tarlanın koordinatlarına göre toprak nemi (ve sıcaklık) verisini çeker.
 * Gerekirse geçici bir polygon oluşturur, soil verisini alır.
 * @param {number} lat - Enlem
 * @param {number} lon - Boylam
 * @param {string} apiKey - OPENWEATHER_AGRO_API_KEY (Agromonitoring appid)
 * @returns {Promise<{ soil_moisture: number, soil_t0_k: number, soil_t10_k: number, dt: number }|null>}
 */
async function getSoilMoistureByCoordinates(lat, lon, apiKey) {
  const poly = await createPolygonFromCoords(lat, lon, apiKey, `Soil query ${lat},${lon}`);
  try {
    const data = await getSoilByPolyId(poly.id, apiKey);
    if (!data) return null;
    return {
      soil_moisture: data.moisture,
      soil_t0_k: data.t0,
      soil_t10_k: data.t10,
      dt: data.dt
    };
  } finally {
    // Geçici polygon'u sil (isteğe bağlı; kotayı korumak için)
    await fetch(`${AGRO_BASE}/polygons/${poly.id}?appid=${encodeURIComponent(apiKey)}`, { method: 'DELETE' }).catch(() => {});
  }
}

/**
 * Herhangi bir koordinat için güncel hava verisi (Agromonitoring – polygon gerekmez).
 * @param {number} lat - Enlem
 * @param {number} lon - Boylam
 * @param {string} apiKey - appid
 * @returns {Promise<object>}
 */
async function getWeatherByCoordinates(lat, lon, apiKey) {
  const res = await fetch(`${AGRO_BASE}/weather?lat=${lat}&lon=${lon}&appid=${encodeURIComponent(apiKey)}`);
  if (!res.ok) throw new Error(`Agro weather failed: ${res.status} ${await res.text()}`);
  return res.json();
}

/**
 * Haritadan çizilen alanın GeoJSON'ı ile toprak verisini getirir (OpenWeather Agro uyumlu).
 * field-selector.js ile üretilen GeoJSON doğrudan kullanılabilir.
 * @param {object} geoJson - GeoJSON Feature: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ [ [lon,lat], ... ] ] } }
 * @param {string} apiKey - Agromonitoring appid
 * @param {string} [name='Field from map'] - Agromonitoring'da kaydedilecek polygon adı
 * @param {boolean} [deleteAfter=true] - Veri alındıktan sonra polygon'u sil (kota için)
 * @returns {Promise<{ soil_moisture: number, soil_t0_k: number, soil_t10_k: number, dt: number }|null>}
 */
async function getSoilDataByGeoJSON(geoJson, apiKey, name = 'Field from map', deleteAfter = true) {
  const res = await fetch(`${AGRO_BASE}/polygons?appid=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, geo_json: geoJson })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Agro polygon create failed: ${res.status} ${err}`);
  }
  const poly = await res.json();
  try {
    const data = await getSoilByPolyId(poly.id, apiKey);
    if (!data) return null;
    return {
      soil_moisture: data.moisture,
      soil_t0_k: data.t0,
      soil_t10_k: data.t10,
      dt: data.dt
    };
  } finally {
    if (deleteAfter) {
      await fetch(`${AGRO_BASE}/polygons/${poly.id}?appid=${encodeURIComponent(apiKey)}`, { method: 'DELETE' }).catch(() => {});
    }
  }
}

module.exports = {
  createPolygonFromCoords,
  getSoilByPolyId,
  getSoilMoistureByCoordinates,
  getWeatherByCoordinates,
  getSoilDataByGeoJSON
};
