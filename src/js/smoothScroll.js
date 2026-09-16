/**
 * Smooth scrolling for in-page anchors.
 *
 * Every jump is offset by the sticky navigation bar's height, otherwise the
 * heading of the target section ends up hidden underneath it.
 */

import { getNavHeight, closeMenu, isMenuOpen } from './navbar.js';

const MENU_CLOSE_DELAY = 260; // matches the menu's slide-out transition

/** Scroll the document so `section` sits just below the navigation bar. */
function scrollToSection(section) {
  const top = Math.max(section.offsetTop - getNavHeight(), 0);
  window.scrollTo({ top, behavior: 'smooth' });
}

export function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (href === '#') {
      return;
    }

    const section = document.querySelector(href);
    if (!section) {
      return;
    }

    anchor.addEventListener('click', (event) => {
      event.preventDefault();

      // On small screens the menu covers the page: close it first, then scroll.
      if (isMenuOpen()) {
        closeMenu();
        window.setTimeout(() => scrollToSection(section), MENU_CLOSE_DELAY);
      } else {
        scrollToSection(section);
      }

      // Keep the address bar in step without triggering a second, instant jump.
      if (window.history.replaceState) {
        window.history.replaceState(null, '', href);
      }
    });
  });
}
