/**
 * Google Ads Enhanced Conversions – lead forms (contact, newsletter).
 * Sends hashed email (SHA-256) via gtag user_data before conversion event.
 * Set window.GOOGLE_ADS_CONFIG = { conversionId: 'AW-XXX', conversionLabel: 'YYY' } from Google Ads.
 *
 * Bireysel kullanım: Form başarıyla gönderildiğinde sendConversion(email) çağrılır.
 * Örnek: sendConversion(userEmail); // e-posta SHA256 ile hash'lenip enhanced_conversions olarak gider.
 */
(function () {
  'use strict';

  function getConfig() {
    return window.GOOGLE_ADS_CONFIG || {};
  }

  /** Normalize email per Google: lowercase, trim; optional Gmail dot removal. */
  function normalizeEmail(email) {
    if (!email || typeof email !== 'string') return '';
    var s = email.toLowerCase().trim();
    var at = s.indexOf('@');
    if (at === -1) return s;
    var local = s.slice(0, at);
    var domain = s.slice(at);
    if (domain === '@gmail.com' || domain === '@googlemail.com')
      local = local.replace(/\./g, '');
    return local + domain;
  }

  /** SHA-256 hash to hex using Web Crypto (no external lib). Bireysel veri güvenliği için. */
  function sha256Hex(str) {
    return new Promise(function (resolve, reject) {
      var enc = new TextEncoder();
      var data = enc.encode(str);
      crypto.subtle.digest('SHA-256', data).then(function (buf) {
        var arr = Array.from(new Uint8Array(buf));
        var hex = arr.map(function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
        resolve(hex);
      }).catch(reject);
    });
  }

  /** Hash email for Enhanced Conversions (normalize + SHA-256 hex). Call from anywhere after form success. */
  function hashEmail(email) {
    return normalizeEmail(email) ? sha256Hex(normalizeEmail(email)) : Promise.resolve('');
  }

  /**
   * Bireysel Google Ads dönüşüm takibi. Form başarıyla gönderildiğinde çağır.
   * @param {string} email - Kullanıcı e-postası (SHA256 ile hash'lenip user_data olarak gönderilir)
   */
  function sendConversion(email) {
    if (!email || !window.gtag) return Promise.resolve();
    var config = getConfig();
    var sendTo = config.conversionId && config.conversionLabel ? config.conversionId + '/' + config.conversionLabel : null;
    if (!sendTo) return Promise.resolve();
    return hashEmail(email).then(function (hashed) {
      if (!hashed) return;
      window.gtag('set', 'user_data', { sha256_email_address: hashed });
      window.gtag('event', 'conversion', { send_to: sendTo });
    });
  }

  window.hashEmail = hashEmail;
  window.sendConversion = sendConversion;

  function getEmailFromForm(form) {
    var emailInput = form.querySelector('input[type="email"], input[name="email"]');
    return emailInput ? (emailInput.value || '').trim() : '';
  }

  function fireEnhancedConversion(form, emailRaw) {
    var config = getConfig();
    var conversionId = config.conversionId;
    var conversionLabel = config.conversionLabel;
    if (!conversionId || !conversionLabel || !window.gtag) return Promise.resolve();

    var email = normalizeEmail(emailRaw);
    if (!email) return Promise.resolve();

    return sha256Hex(email).then(function (hashedEmail) {
      window.gtag('set', 'user_data', {
        sha256_email_address: hashedEmail
      });
      window.gtag('event', 'conversion', {
        send_to: conversionId + '/' + conversionLabel
      });
    });
  }

  function setupForm(form) {
    if (!form) return;
    form.addEventListener('submit', function (ev) {
      var email = getEmailFromForm(form);
      if (!email) return;

      ev.preventDefault();

      fireEnhancedConversion(form, email).then(function () {
        // Continue with normal form behavior (e.g. GET to same page with params, or leave as-is)
        if (form.getAttribute('method') === 'get' && form.getAttribute('action')) {
          form.submit();
        } else {
          form.submit();
        }
      }).catch(function () {
        form.submit();
      });
    });
  }

  function init() {
    var contactForm = document.getElementById('contact-form');
    var newsletterForm = document.querySelector('.footer__newsletter-form') || document.getElementById('newsletter-form');
    setupForm(contactForm);
    setupForm(newsletterForm);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
