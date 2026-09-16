/**
 * Navigation bar behaviour.
 *
 * A single scroll listener, throttled with requestAnimationFrame, drives three
 * features so the page never runs more than one layout read per frame:
 *   1. shrinking the bar (height, logo size and link size) once the page moves;
 *   2. the reading-position indicator in the menu;
 *   3. the mobile hamburger menu.
 */

const SHRINK_AT = 80; // px of scroll before the bar collapses
const BOTTOM_SLACK = 2; // rounding tolerance when testing for "at the bottom"
const SPY_SLACK = 4; // a section landing exactly under the bar still counts

const navbar = document.getElementById('navbar');
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
const current = document.getElementById('nav-current');
const links = menu ? Array.from(menu.querySelectorAll('.navbar__link')) : [];

// Each nav link points at a section; keep the resolved pairs for the spy.
const targets = links
  .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
  .filter((entry) => entry.section !== null);

/**
 * Height to reserve under the sticky bar. Anchored navigation always ends with
 * the bar in its shrunk state, so that is the value worth reserving.
 * @returns {number} height in pixels
 */
export function getNavHeight() {
  const styles = getComputedStyle(document.documentElement);
  const shrunk = parseFloat(styles.getPropertyValue('--nav-height-shrunk'));
  return Number.isNaN(shrunk) ? 60 : shrunk;
}

/** Collapse the bar once the user has scrolled past the hero's first band. */
function updateShrink(scrollY) {
  navbar.classList.toggle('is-shrunk', scrollY > SHRINK_AT);
}

/**
 * Highlight the section currently sitting under the navigation bar: the last
 * one whose top edge has passed the bar. At the very bottom of the document the
 * final entry wins, because a short last section can never reach the bar.
 */
function updateIndicator(scrollY) {
  const atBottom =
    window.innerHeight + scrollY >= document.body.scrollHeight - BOTTOM_SLACK;

  let activeIndex = 0;
  if (atBottom) {
    activeIndex = targets.length - 1;
  } else {
    const offset = getNavHeight();
    targets.forEach((entry, index) => {
      if (entry.section.getBoundingClientRect().top - offset <= SPY_SLACK) {
        activeIndex = index;
      }
    });
  }

  targets.forEach((entry, index) => {
    const isActive = index === activeIndex;
    entry.link.classList.toggle('is-active', isActive);
    if (isActive) {
      entry.link.setAttribute('aria-current', 'location');
    } else {
      entry.link.removeAttribute('aria-current');
    }
  });

  // Below the hamburger breakpoint the menu is off screen, so the bar itself
  // has to carry the indicator.
  if (current && targets.length > 0) {
    current.textContent = targets[activeIndex].link.textContent.trim();
  }
}

/** Open or close the mobile menu, keeping ARIA state and body scroll in sync. */
function setMenuOpen(isOpen) {
  menu.classList.toggle('is-open', isOpen);
  toggle.classList.toggle('is-open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation menu' : 'Open navigation menu'
  );
  document.body.classList.toggle('is-locked', isOpen);
}

/** True while the collapsed menu is on screen. */
export function isMenuOpen() {
  return menu.classList.contains('is-open');
}

/** Close the menu before an anchor jump so the target is actually visible. */
export function closeMenu() {
  if (isMenuOpen()) {
    setMenuOpen(false);
  }
}

export function initNavbar() {
  if (!navbar || !menu || !toggle) {
    return;
  }

  let ticking = false;

  const onScroll = () => {
    if (ticking) {
      return;
    }
    ticking = true;
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY || window.pageYOffset;
      updateShrink(scrollY);
      updateIndicator(scrollY);
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  toggle.addEventListener('click', () => setMenuOpen(!isMenuOpen()));

  // Escape closes the collapsed menu, mirroring the modal's behaviour.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen()) {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  // Reopening the desktop layout must not leave the body scroll-locked.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  onScroll();
}
