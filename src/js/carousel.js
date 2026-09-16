/**
 * Hand-written slider for the Limveld gallery.
 *
 * The track is moved by toggling an `is-at-N` class generated in SCSS, so no
 * styling is ever written inline. Supports side arrows, dot indicators,
 * wrap-around, arrow keys and autoplay that pauses on hover or focus.
 */

const AUTOPLAY_DELAY = 6500;

const root = document.getElementById('carousel');
const track = document.getElementById('carousel-track');
const dotsBox = document.getElementById('carousel-dots');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');

let slides = [];
let dots = [];
let index = 0;
let timer = null;

/** Move the track and refresh the indicators. */
function goTo(next) {
  const count = slides.length;
  const target = ((next % count) + count) % count; // wrap in both directions

  track.classList.remove(`is-at-${index}`);
  track.classList.add(`is-at-${target}`);
  index = target;

  dots.forEach((dot, i) => {
    const isActive = i === index;
    dot.classList.toggle('is-active', isActive);
    if (isActive) {
      dot.setAttribute('aria-current', 'true');
    } else {
      dot.removeAttribute('aria-current');
    }
  });

  slides.forEach((slide, i) => {
    // Keep off-screen slides out of the tab order and the accessibility tree.
    slide.setAttribute('aria-hidden', String(i !== index));
  });
}

function next() {
  goTo(index + 1);
}

function prev() {
  goTo(index - 1);
}

function stopAutoplay() {
  if (timer !== null) {
    window.clearInterval(timer);
    timer = null;
  }
}

function startAutoplay() {
  stopAutoplay();
  timer = window.setInterval(next, AUTOPLAY_DELAY);
}

/** Build one dot per slide. */
function buildDots() {
  slides.forEach((slide, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => {
      goTo(i);
      startAutoplay();
    });
    dotsBox.appendChild(dot);
  });

  dots = Array.from(dotsBox.children);
}

export function initCarousel() {
  if (!root || !track || !dotsBox || !prevBtn || !nextBtn) {
    return;
  }

  slides = Array.from(track.querySelectorAll('.carousel__slide'));
  if (slides.length < 2) {
    return;
  }

  buildDots();
  goTo(0);

  prevBtn.addEventListener('click', () => {
    prev();
    startAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    next();
    startAutoplay();
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
      startAutoplay();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
      startAutoplay();
    }
  });

  root.addEventListener('mouseenter', stopAutoplay);
  root.addEventListener('mouseleave', startAutoplay);
  root.addEventListener('focusin', stopAutoplay);
  root.addEventListener('focusout', startAutoplay);

  // Do not animate in a background tab.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  startAutoplay();
}
