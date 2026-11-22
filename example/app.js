import { LeafletMap, TileLayer } from 'leaflet';
import { translate, addLocale, getLocales, setLocale } from 'leaflet.translations';
import LocaleSelectElement from 'locale-select';

export default function exampleApp () {
  customElements.define('locale-select', LocaleSelectElement);

  const params = new URLSearchParams(location.search);
  const locale = params.get('locale') ?? 'en';

  try {
    setLocale(locale);
  } catch (err) {
    console.error(err);
  }
  console.log('setLocale:', locale);

  const map = new LeafletMap('map', { translate }).setView([47.478954, 9.761803], 15);

  new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" lang="en">OpenStreetMap</a>'
  })
  .addTo(map);

  map.getContainer().setAttribute('lang', locale.replace('_', '-'));
}

if (import.meta.url.includes('run')) {
  exampleApp();
}
