import localeList from './localeList.js';

const { HTMLElement } = window;

/**
 * Custom element to display a list of language options for a Leaflet map.
 *
 * @customElement locale-select
 * @copyright 2026 Nick Freear
 * @license MIT
 */
export default class LocaleSelectElement extends HTMLElement {
  #defaultLabel = 'Choose language';

  get #localeList () { return localeList; }
  get #queryParam () { return this.getAttribute('query-param') ?? 'locale'; }
  get #path () { return this.getAttribute('path') ?? ''; }

  #dir (dir) { return dir ? `&dir=${dir}` : ''; }
  #localeUrl (locale, dir) { return `${this.#path}?${this.#queryParam}=${locale}${this.#dir(dir)}`; }

  constructor () {
    super();

    const root = this.attachShadow({ mode: 'open' });
    const { style, button, nav } = this.#createElements();
    root.appendChild(style);
    root.appendChild(button);
    root.appendChild(nav);
    console.debug('locale-select:', [this]);
  }

  #createListItem (locale) {
    const { id, dir, label, labelEn } = locale;
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    const small = document.createElement('small');
    const span = document.createElement('span');

    small.textContent = `(${labelEn})`;
    small.setAttribute('lang', 'en');
    span.textContent = `${label} `;
    span.setAttribute('lang', id.replace('_', '-'));
    anchor.href = this.#localeUrl(id, dir);
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
    const svgIcon = this.#createSVGIcon();
    const style = this.#createStyleSheet();
    const list = this.#createList();

    slot.textContent = this.#defaultLabel;
    button.setAttribute('popovertarget', popID);
    button.id = btnID;
    nav.id = popID;
    nav.setAttribute('aria-labelledby', btnID);
    nav.setAttribute('popover', '');
    button.appendChild(svgIcon);
    button.appendChild(slot);
    nav.appendChild(list);

    return { style, button, nav };
  }

  /** <!--!Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
   * @see https://fontawesome.com/icons/classic/solid/language
   */
  #createSVGIcon () {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M192 64C209.7 64 224 78.3 224 96L224 128L352 128C369.7 128 384 142.3 384 160C384 177.7 369.7 192 352 192L342.4 192L334 215.1C317.6 260.3 292.9 301.6 261.8 337.1C276 345.9 290.8 353.7 306.2 360.6L356.6 383L418.8 243C423.9 231.4 435.4 224 448 224C460.6 224 472.1 231.4 477.2 243L605.2 531C612.4 547.2 605.1 566.1 589 573.2C572.9 580.3 553.9 573.1 546.8 557L526.8 512L369.3 512L349.3 557C342.1 573.2 323.2 580.4 307.1 573.2C291 566 283.7 547.1 290.9 531L330.7 441.5L280.3 419.1C257.3 408.9 235.3 396.7 214.5 382.7C193.2 399.9 169.9 414.9 145 427.4L110.3 444.6C94.5 452.5 75.3 446.1 67.4 430.3C59.5 414.5 65.9 395.3 81.7 387.4L116.2 370.1C132.5 361.9 148 352.4 162.6 341.8C148.8 329.1 135.8 315.4 123.7 300.9L113.6 288.7C102.3 275.1 104.1 254.9 117.7 243.6C131.3 232.3 151.5 234.1 162.8 247.7L173 259.9C184.5 273.8 197.1 286.7 210.4 298.6C237.9 268.2 259.6 232.5 273.9 193.2L274.4 192L64.1 192C46.3 192 32 177.7 32 160C32 142.3 46.3 128 64 128L160 128L160 96C160 78.3 174.3 64 192 64zM448 334.8L397.7 448L498.3 448L448 334.8z');
    svg.setAttribute('viewBox', '0 0 640 640');
    svg.appendChild(path);
    return svg;
  }

  #createStyleSheet () {
    const style = document.createElement('style');
    style.textContent = `
  button {
    color: #333;
    padding: .3rem .6rem;

    svg {
      fill: currentColor;
      height: 1.2rem;
      width: 1.2rem;
      margin-right: .3rem;
      vertical-align: middle;
    }
  }
  [popover] {
    background-color: #f5f5f5;
    border: 1px solid gray;
    border-radius: .25rem;
    line-height: 1.5;
    max-height: 92vh;
    min-width: 11.6rem;
    overflow-y: scroll;
    padding: .6rem .4rem;
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
