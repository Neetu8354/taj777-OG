const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');

function generateIconCss() {
  const map = {
    1: '⚽', 2: '🎾', 3: '🏑', 4: '🏏', 5: '🏒', 6: '⛳', 7: '🏓', 8: '🏓',
    9: '🥊', 10: '🐎', 11: '🎮', 12: '🏉', 13: '🏏', 14: '🏑', 15: '🏀',
    16: '🎾', 17: '⚽', 18: '🏐', 19: '🏎', 20: '🏀', 21: '🏈', 22: '🏸',
    23: '🏆', 24: '🏆', 25: '🏆', 26: '🏆', 27: '🏆', 28: '🏆', 29: '🏆',
    30: '🏆', 31: '🏆', 32: '🏆', 33: '🏆', 34: '🏆', 35: '🏆', 36: '🏆',
    37: '🏆', 38: '🏆', 39: '🏆', 40: '🏛', 41: '🏆', 42: '🏆', 43: '🏆',
    44: '🏆', 46: '🏆', 47: '🏆', 48: '🏆', 49: '🏆', 50: '🏆', 51: '🏆',
    52: '🏆', 53: '🏆', 54: '🏆', 55: '🏆', 56: '🏆', 57: '🏆', 58: '🏈',
    59: '🏆', 60: '🏆', 61: '🏆', 62: '🏆', 63: '🏆', 64: '🏆', 65: '🐕',
    66: '🏆', 67: '🏆', 68: '🏆', 69: '🤼', 998: '🃏', 999: '🃏',
    tv: '📺', suits: '♠'
  };
  const def = '🏆';
  let css = `/* d-icon missing font fallback */
html body .d-icon::before { font-family: "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif !important; }\n`;
  for (let i = 1; i <= 69; i++) {
    css += `html body .icon-${i}::before { content: '${map[i] || def}' !important; }\n`;
  }
  css += `html body .icon-998::before { content: '${map[998]}' !important; }\n`;
  css += `html body .icon-999::before { content: '${map[999]}' !important; }\n`;
  css += `html body .icon-tv::before { content: '${map.tv}' !important; }\n`;
  css += `html body .icon-suits::before { content: '${map.suits}' !important; }\n`;
  return css;
}

const lockSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
const lockB64 = Buffer.from(lockSvg).toString('base64');
const iconCss = generateIconCss();

const fixStyle = `
  /* Prevent smooth scroll jump */
  html, body {
    scroll-behavior: auto !important;
  }

  /* Hide Demo/points widget */
  .balance,
  .bal-point,
  .username-info,
  .point-inner-user,
  .point-inner-user-bal,
  .point-inner-user-icons,
  .header-right,
  .header-right-point {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
    overflow: hidden !important;
  }

  /* Fix hero: show all banner images side-by-side / swipeable */
  html body .banner .carousel .carousel-inner {
    display: flex !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    scroll-snap-type: x mandatory !important;
    -webkit-overflow-scrolling: touch !important;
    width: 100% !important;
    height: auto !important;
  }
  html body .banner .carousel .carousel-inner > .carousel-item,
  html body .banner .carousel .carousel-inner > .carousel-item:not(.active) {
    position: relative !important;
    display: block !important;
    flex: 0 0 100vw !important;
    width: 100vw !important;
    min-width: 100vw !important;
    max-width: 100vw !important;
    height: auto !important;
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
    scroll-snap-align: start !important;
  }

  /* Fix Our Casino: show all banners in a scrollable row */
  html body .home-casiono-icons {
    display: block !important;
  }
  html body .home-casiono-icons .hooper,
  html body .home-casiono-icons .hooper-list {
    overflow: visible !important;
    width: 100% !important;
  }
  html body .home-casiono-icons .hooper-track {
    display: flex !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    width: auto !important;
    transform: none !important;
  }
  html body .home-casiono-icons .hooper-track > .hooper-slide,
  html body .home-casiono-icons .hooper-track > .hooper-slide[aria-hidden="true"] {
    flex: 0 0 auto !important;
    width: 160px !important;
    min-width: 160px !important;
    max-width: 160px !important;
    opacity: 1 !important;
    visibility: visible !important;
    display: block !important;
  }
  html body .home-casiono-icons .carousal-63 {
    width: 160px !important;
    min-width: 160px !important;
    padding-top: 63.59% !important;
  }

  /* Right sidebar casino games: show in a 2-column grid */
  html body .home-right-sidebar .home-casiono-icons,
  html body .right-sidebar .home-casiono-icons {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 6px !important;
    width: 100% !important;
    padding-top: 6px !important;
  }
  html body .home-right-sidebar .home-casino-icon-item,
  html body .right-sidebar .home-casino-icon-item {
    width: 100% !important;
    display: block !important;
  }
  html body .home-right-sidebar .home-casino-icon-item img,
  html body .right-sidebar .home-casino-icon-item img {
    width: 100% !important;
    height: auto !important;
    display: block !important;
  }

  /* Replace odds numbers in all bet boxes with a lock icon */
  html body .bl-box .odds {
    font-size: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    height: 100% !important;
  }
  html body .bl-box .odds::before {
    content: '' !important;
    display: inline-block !important;
    width: 18px !important;
    height: 18px !important;
    min-width: 18px !important;
    min-height: 18px !important;
    background-image: url(data:image/svg+xml;base64,${lockB64}) !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.7)) !important;
  }

  ${iconCss}

  /* Mobile hamburger sidebar styling */
  html body .b-sidebar-outer {
    display: block !important;
  }
  html body .b-sidebar {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    height: 100vh !important;
    width: 80% !important;
    max-width: 320px !important;
    z-index: 1100 !important;
    overflow-y: auto !important;
    background-color: #f8f9fa !important;
    color: #212529 !important;
  }
  html body .b-sidebar-body {
    overflow-y: auto !important;
    height: 100vh !important;
  }
  html body .b-sidebar-backdrop {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 1090 !important;
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
  html body .menu-button-mobile {
    cursor: pointer !important;
  }
`;

const fixScript = `
(function(){
  function clean(){
    ['.balance','.bal-point','.username-info','.point-inner-user','.point-inner-user-bal','.point-inner-user-icons','.header-right','.header-right-point']
      .forEach(s => document.querySelectorAll(s).forEach(e => e.remove()));
  }

  function forceHero(){
    const inner = document.querySelector('.banner .carousel .carousel-inner');
    if (inner) {
      inner.style.setProperty('display', 'flex', 'important');
      inner.style.setProperty('overflow-x', 'auto', 'important');
    }
    document.querySelectorAll('.banner .carousel .carousel-item').forEach(el => {
      el.style.setProperty('display', 'block', 'important');
      el.style.setProperty('width', '100vw', 'important');
      el.style.setProperty('min-width', '100vw', 'important');
      el.style.setProperty('max-width', '100vw', 'important');
      el.style.setProperty('flex', '0 0 100vw', 'important');
      el.style.setProperty('position', 'relative', 'important');
      el.style.setProperty('opacity', '1', 'important');
      el.style.setProperty('visibility', 'visible', 'important');
      el.style.setProperty('transform', 'none', 'important');
    });
  }

  function forceCasino(){
    document.querySelectorAll('.home-casiono-icons .hooper-slide').forEach(el => {
      el.style.setProperty('display', 'block', 'important');
      el.style.setProperty('width', '160px', 'important');
      el.style.setProperty('min-width', '160px', 'important');
      el.style.setProperty('max-width', '160px', 'important');
      el.style.setProperty('opacity', '1', 'important');
      el.style.setProperty('visibility', 'visible', 'important');
      el.setAttribute('aria-hidden', 'false');
    });
    document.querySelectorAll('.home-casiono-icons .carousal-63').forEach(el => {
      el.style.setProperty('width', '160px', 'important');
      el.style.setProperty('min-width', '160px', 'important');
    });
  }

  function setupHamburger(){
    const sidebar = document.querySelector('.b-sidebar-outer .b-sidebar, .b-sidebar');
    const backdrop = document.querySelector('.b-sidebar-backdrop, .b-sidebar-outer .b-sidebar-backdrop');
    if (!sidebar || !backdrop) return;
    document.querySelectorAll('.menu-button-mobile').forEach(btn => {
      btn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        const inside = !!btn.closest('.b-sidebar');
        if (inside) {
          sidebar.style.setProperty('display', 'none', 'important');
          backdrop.style.setProperty('display', 'none', 'important');
          sidebar.setAttribute('aria-hidden', 'true');
        } else {
          sidebar.style.setProperty('display', 'block', 'important');
          backdrop.style.setProperty('display', 'block', 'important');
          sidebar.setAttribute('aria-hidden', 'false');
        }
      }, true);
    });
    backdrop.addEventListener('click', function(){
      sidebar.style.setProperty('display', 'none', 'important');
      backdrop.style.setProperty('display', 'none', 'important');
      sidebar.setAttribute('aria-hidden', 'true');
    });
  }

  function fixNewsMarquee(){
    document.querySelectorAll('.news-bar.d-none-desktop .marquee-content.no-marquee, .news-bar .marquee-content.no-marquee').forEach(el => {
      const wrapper = el.parentElement;
      if (!wrapper) return;
      el.classList.remove('no-marquee');
      const textWidth = el.scrollWidth;
      const wrapperWidth = wrapper.clientWidth || window.innerWidth;
      const pixelsPerSecond = 75;
      const duration = (textWidth + wrapperWidth) / pixelsPerSecond;
      el.style.animationDuration = (duration > 0 ? duration : 20) + 's';
    });
  }

  function fixHamburgerMenu(){
    const desktop = document.querySelector('.sidebar-left.d-none-mobile');
    const mobile = document.querySelector('#sidebar-left-mo');
    if (!desktop || !mobile) return;
    const scroll = mobile.querySelector('.menu-scrolable');
    if (!scroll) return;
    const logo = desktop.querySelector('.logo-box');
    if (logo && !mobile.querySelector('.logo-box')) {
      scroll.prepend(logo.cloneNode(true));
    }
    const special = desktop.querySelector('.special-menu');
    if (special && !mobile.querySelector('.special-menu')) {
      scroll.appendChild(special.cloneNode(true));
    }
    const allSports = desktop.querySelector('#accordionExample') || desktop.querySelector('.menu-box.accordion');
    if (allSports && !mobile.querySelector('.all-sports-clone')) {
      const clone = allSports.cloneNode(true);
      clone.removeAttribute('id');
      clone.classList.add('all-sports-clone');
      scroll.appendChild(clone);
    }
  }

  function init(){
    clean();
    forceHero();
    forceCasino();
    fixNewsMarquee();
    fixHamburgerMenu();
    setupHamburger();
  }

  init();
  document.addEventListener('DOMContentLoaded', init);
  setTimeout(init, 100);
  setTimeout(init, 500);
  setTimeout(init, 1500);

  const items = document.querySelectorAll('.banner .carousel .carousel-item');
  const inner = document.querySelector('.banner .carousel .carousel-inner');
  if (items.length > 1) {
    let i = 0;
    setInterval(() => {
      items.forEach(el => el.classList.remove('active'));
      i = (i + 1) % items.length;
      items[i].classList.add('active');
      if (inner) {
        inner.scrollLeft = items[i].offsetLeft;
      }
    }, 3000);
  }

  // Stop auto scroll-to-top from scripts
  if (typeof window !== 'undefined') {
    const noop = function() {};
    Element.prototype.scrollIntoView = noop;
    const origScrollTo = window.scrollTo;
    window.scrollTo = function(x, y) { if ((y || 0) > 0) return origScrollTo.apply(this, arguments); };
    window.scroll = window.scrollTo;
    window.scrollBy = function(x, y) {
      if ((y || 0) < 0) return;
      return origScrollTo.call(window, window.scrollX + (x || 0), window.scrollY + (y || 0));
    };
  }
})();
`;

['index.html', 'sport.html', 'sport.htm'].forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;

  const html = fs.readFileSync(filePath, 'utf8');
  const root = parse(html);

  const head = root.querySelector('head');
  const body = root.querySelector('body');

  if (head) {
    head.querySelectorAll('#devin-global-fix').forEach(e => e.remove());
    head.insertAdjacentHTML('beforeend', `<style id="devin-global-fix">${fixStyle}</style>`);
  }

  // Apply style changes to string
  let output = root.toString();

  // Remove any existing global script and append a new one robustly
  // (the HTML may not have a closed </body>, so parser insertion is unreliable)
  output = output.replace(/<script id="devin-global-script">[\s\S]*?<\/script>/g, '');
  if (/<\/body>/i.test(output)) {
    output = output.replace(/<\/body>/i, `<script id="devin-global-script">${fixScript}</script></body>`);
  } else if (/<\/html>/i.test(output)) {
    output = output.replace(/<\/html>/i, `<script id="devin-global-script">${fixScript}</script></html>`);
  } else {
    output += `<script id="devin-global-script">${fixScript}</script>`;
  }

  fs.writeFileSync(filePath, output, 'utf8');
  console.log(`${file}: global fixes applied`);
});
