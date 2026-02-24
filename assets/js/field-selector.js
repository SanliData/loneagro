/**
 * Tarla çizim modülü – Google Maps Drawing Manager ile polygon seçimi.
 * Çizilen alan GeoJSON (OpenWeather Agro / Agromonitoring uyumlu) olarak saklanır.
 * services/weatherAgro.getSoilDataByGeoJSON() ile bu veri kullanılabilir.
 */
(function () {
  'use strict';

  /** Çizilen polygon'u standart GeoJSON Feature (Polygon) formatına çevirir. */
  function polygonToGeoJSON(polygon) {
    var path = polygon.getPath();
    var coords = [];
    for (var i = 0; i < path.getLength(); i++) {
      var p = path.getAt(i);
      coords.push([p.lng(), p.lat()]);
    }
    // GeoJSON ring: ilk ve son nokta aynı olmalı
    var first = coords[0];
    var last = coords[coords.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
      coords.push([first[0], first[1]]);
    }
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [coords]
      }
    };
  }

  /**
   * Harita ve çizim aracını başlatır.
   * @param {Object} options
   * @param {string} options.mapContainerId - Haritanın render edileceği element id (örn. 'field-map')
   * @param {number} [options.centerLat=31.0] - Harita merkez enlem (Texas varsayılan)
   * @param {number} [options.centerLng=-99.5] - Harita merkez boylam
   * @param {number} [options.zoom=6] - Başlangıç zoom
   */
  function initFieldSelector(options) {
    var containerId = options && options.mapContainerId ? options.mapContainerId : 'field-map';
    var centerLat = (options && options.centerLat != null) ? options.centerLat : 31.0;
    var centerLng = (options && options.centerLng != null) ? options.centerLng : -99.5;
    var zoom = (options && options.zoom != null) ? options.zoom : 6;

    var el = document.getElementById(containerId);
    if (!el) return;

    var center = { lat: centerLat, lng: centerLng };
    var map = new google.maps.Map(el, {
      center: center,
      zoom: zoom,
      mapTypeId: 'hybrid',
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true
    });

    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON]
      },
      polygonOptions: {
        editable: true,
        draggable: false,
        fillColor: '#c9a227',
        fillOpacity: 0.25,
        strokeWeight: 2,
        strokeColor: '#c9a227'
      }
    });

    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
      var geoJson = polygonToGeoJSON(polygon);
      window.selectedFieldGeoJSON = geoJson;

      var event = new CustomEvent('fieldselected', { detail: { geoJson: geoJson, polygon: polygon } });
      window.dispatchEvent(event);
    });
  }

  window.FieldSelector = { init: initFieldSelector };
  window.polygonToGeoJSON = polygonToGeoJSON;
})();
