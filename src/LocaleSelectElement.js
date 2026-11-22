import localeList from './localeList.js';

const { HTMLElement } = window;

/**
 * Custom element to display a list of language options for a Leaflet map.
 */
export default class LocaleSelectElement extends HTMLElement {
  #defaultLabel = 'Choose language';

  get #localeList () { return localeList; }
  get #queryParam () { return this.getAttribute('query-param') ?? 'locale'; }
  get #path () { return this.getAttribute('path') ?? ''; }

  #localeUrl (localeId) { return `${this.#path}?${this.#queryParam}=${localeId}`; }

  constructor () {
    super();

    const root = this.attachShadow({ mode: 'open' });
    const { style, button, nav } = this.#createElements();
    root.appendChild(style);
    root.appendChild(button);
    root.appendChild(nav);
    console.debug('locale-menu:', [this]);
  }

  #createListItem (locale) {
    const { id, label, labelEn } = locale;
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    const small = document.createElement('small');
    const span = document.createElement('span');

    small.textContent = `(${labelEn})`;
    small.setAttribute('lang', 'en');
    span.textContent = `${label} `;
    span.setAttribute('lang', id.replace('_', '-'));
    anchor.href = this.#localeUrl(id);
    anchor.appendChild(span);
    anchor.appendChild(small);
    listItem.appendChild(anchor);
    return listItem;
  }

  #createList () {
    const listElement = document.createElement('ul');
    const listItems = this.#localeList.map((it) => this.#createListItem(it));

    listItems.forEach((li) => { listElement.appendChild(li); });
    return listElement;
  }

  #createElements () {
    const popID = 'myPopover';
    const btnID = 'myButton';
    const button = document.createElement('button');
    const slot = document.createElement('slot');
    const nav = document.createElement('nav');
    const style = this.#createStyleSheet();
    const list = this.#createList();

    slot.textContent = this.#defaultLabel;
    button.setAttribute('popovertarget', popID);
    button.id = btnID;
    nav.id = popID;
    nav.setAttribute('aria-labelledby', btnID);
    nav.setAttribute('popover', '');
    button.appendChild(slot);
    nav.appendChild(list);

    return { style, button, nav };
  }

  #createStyleSheet () {
    const style = document.createElement('style');
    style.textContent = `
  button {
    padding: .3rem .6rem;
  }
  [popover] {
    background-color: #f4f4f4;
    border: 1px solid gray;
    border-radius: .25rem;
    line-height: 1.5;
    max-height: 100vh;
    min-width: 11.5rem;
    overflow-y: scroll;
    padding: .8rem .4rem;
    position-area: bottom center;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    a[href] {
      display: block;
      width: 100%;
    }
    a[href *= '=en'] {
      small { display: none; }
    }
  }
  * {
    outline-offset: .2rem;
    text-decoration-style: dotted;
    text-underline-offset: .2rem;
  }`;
    return style;
  }
}
