import { LeafletMap, TileLayer } from 'leaflet';
import { translate, addLocale, getLocales, setLocale } from 'leaflet.translations';
import LocaleSelectElement from 'locale-select';

export default function exampleApp (mapID = 'map') {
  customElements.define('locale-select', LocaleSelectElement);

  const params = new URLSearchParams(location.search);
  const locale = params.get('locale') ?? 'en';
  const dir = params.get('dir') ?? 'ltr';
  const mapDiv = document.getElementById(mapID);

  try {
    setLocale(locale);
  } catch (err) {
    console.error(err);
  }
  console.log('setLocale:', locale, 'dir:', dir);

  mapDiv.dir = dir; // Was: mapDiv.classList.add(`leaflet-dir-${dir}`);
  mapDiv.lang = idToLang(locale);

  const map = new LeafletMap(mapDiv, { translate }).setView([47.478954, 9.761803], 15);

  new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" lang="en">OpenStreetMap</a>'
  })
  .addTo(map);

  // A hack!
  map.attributionControl._container.dir = 'ltr';

  console.debug('Map:', map);

  function idToLang (id) { return id.replace('_', '-'); }
}

if (import.meta.url.includes('run')) {
  exampleApp();
}
