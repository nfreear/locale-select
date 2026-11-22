
# locale-select

Custom element to display a list of language options for a Leaflet map.

Works with [Leaflet v2][] and [Leaflet.Translations][], but has no dependency on either.

Currently, selecting a new language leads to the page being reloaded, for simplicity. Uses the [Popover API][].

## Quick start

Example HTML:
```html
<locale-select>Choose map language</locale-select>
<div id="map"></div>
```

Change the name of the query parameter:
```html
<locale-select query-param="lang"></locale-select>
```

JavaScript to set up the `<locale-select>` custom element, and get the locale from the URL – `map.html?locale=ar`:

```js
import LocaleSelectElement from 'locale-select';
import { setLocale } from 'leaflet.translations';

customElements.define('locale-select', LocaleSelectElement);

const params = new URLSearchParams(location.search);
const locale = params.get('locale') ?? 'en';

try {
  setLocale(locale);
} catch (err) {
  console.error(err);
}
// ...
```

[leaflet v2]: https://leafletjs.com/reference.html#map-translate
[Leaflet]: https://github.com/Leaflet/Leaflet
[Leaflet.translations]: https://github.com/Leaflet/Leaflet.Translations
[popover api]: https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
