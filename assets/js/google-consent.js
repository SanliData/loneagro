/**
 * Google Consent Mode v2 – KVKK/GDPR uyumlu rıza yönetimi.
 * GTM snippet'ından önce yüklenmeli. Varsayılan: tüm reklam/analytics depolama reddedilir;
 * kullanıcı onay verince grantGoogleConsent() ile güncellenir.
 * @see https://developers.google.com/tag-platform/security/guides/consent
 */
(function () {
  'use strict';

  var CONSENT_KEY = 'lonestar_google_consent';

  var deniedState = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  };

  var grantedState = {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted'
  };

  // GTM yüklenmeden önce dataLayer ve gtag tanımlı olmalı
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  // Varsayılan: tümü reddedildi (Consent Mode v2)
  gtag('consent', 'default', deniedState);

  /**
   * Kullanıcı çerez banner'ında "Kabul" dediğinde çağrın.
   * Rıza granted olarak güncellenir ve localStorage'a yazılır.
   */
  function grantGoogleConsent() {
    gtag('consent', 'update', grantedState);
    try { localStorage.setItem(CONSENT_KEY, 'granted'); } catch (e) {}
  }

  /**
   * Kullanıcı "Reddet" dediğinde (opsiyonel). Varsayılan zaten denied.
   */
  function denyGoogleConsent() {
    gtag('consent', 'update', deniedState);
    try { localStorage.setItem(CONSENT_KEY, 'denied'); } catch (e) {}
  }

  window.grantGoogleConsent = grantGoogleConsent;
  window.denyGoogleConsent = denyGoogleConsent;

  // Daha önce onay verildiyse sayfa yüklenirken güncelle; banner'ı gizle
  function restoreConsent() {
    try {
      var stored = localStorage.getItem(CONSENT_KEY);
      if (stored === 'granted') {
        gtag('consent', 'update', grantedState);
      }
      var banner = document.getElementById('cookie-consent-banner');
      if (banner && stored) banner.style.display = 'none';
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', restoreConsent);
  } else {
    restoreConsent();
  }
})();
