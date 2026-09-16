/**
 * Entry point for the page's behaviour. Every feature lives in its own module
 * and is started once the document is parsed.
 */

import { initNavbar } from './navbar.js';
import { initSmoothScroll } from './smoothScroll.js';
import { initCarousel } from './carousel.js';
import { initModal } from './modal.js';
import { initReveal } from './reveal.js';

function init() {
  initNavbar();
  initSmoothScroll();
  initCarousel();
  initModal();
  initReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
