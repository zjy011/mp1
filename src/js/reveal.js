/**
 * Scroll-triggered entrance animations.
 *
 * Elements marked `.reveal` gain `.is-visible` the first time they enter the
 * viewport, which starts the fade-and-rise keyframes defined in SCSS. Grid
 * children are staggered from CSS via :nth-child, so nothing is timed here.
 */

const OBSERVER_OPTIONS = {
  rootMargin: '0px 0px -12% 0px',
  threshold: 0.12,
};

export function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (items.length === 0) {
    return;
  }

  // Without IntersectionObserver, show everything rather than hiding content.
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // reveal once, then stop watching
      }
    });
  }, OBSERVER_OPTIONS);

  items.forEach((item) => observer.observe(item));
}
