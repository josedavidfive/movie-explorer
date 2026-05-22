const COORDS = {
  US: [37.09, -95.71], ES: [40.46, -3.74], GB: [55.37, -3.43],
  FR: [46.23, 2.21], DE: [51.16, 10.45], IT: [41.87, 12.56],
  KR: [35.90, 127.86], JP: [36.20, 138.25], AU: [-25.27, 133.77],
  CN: [35.86, 104.19], IN: [20.59, 78.96], BR: [-14.23, -51.92],
  MX: [23.63, -102.55], CA: [56.13, -106.34], RU: [61.52, 105.31]
};

let map = null;

export function renderMap(countries) {
  if (map) { map.remove(); map = null; }

  map = L.map('modal-map').setView([20, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });

  countries.forEach(({ iso_3166_1, name }) => {
    const coords = COORDS[iso_3166_1];
    if (coords) L.marker(coords).addTo(map).bindPopup(name);
  });
}