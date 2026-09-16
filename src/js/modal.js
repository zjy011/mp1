/**
 * One reusable dialog, filled from the character data set.
 *
 * Closes on the backdrop, the close button and Escape; locks background
 * scrolling while open, moves focus into the dialog and restores it afterwards.
 */

import characters from './characters.js';

const CLOSE_DELAY = 320; // matches the modal's opacity transition

const modal = document.getElementById('character-modal');
const dialog = modal ? modal.querySelector('.modal__dialog') : null;
const fields = {
  image: document.getElementById('modal-image'),
  role: document.getElementById('modal-role'),
  name: document.getElementById('modal-name'),
  blurb: document.getElementById('modal-blurb'),
  archetype: document.getElementById('modal-archetype'),
  availability: document.getElementById('modal-availability'),
};

let lastFocused = null;
let closeTimer = null;

function isOpen() {
  return modal.classList.contains('is-open');
}

/** Copy one character record into the dialog. */
function fill(character) {
  fields.image.src = character.image;
  fields.image.alt = `Portrait of ${character.name}`;
  fields.role.textContent = character.role;
  fields.name.textContent = character.name;
  fields.blurb.textContent = character.blurb;
  fields.archetype.textContent = character.archetype;
  fields.availability.textContent = character.availability;
}

function openModal(id, trigger) {
  const character = characters[id];
  if (!character) {
    return;
  }

  window.clearTimeout(closeTimer);
  lastFocused = trigger;
  fill(character);

  modal.hidden = false;
  document.body.classList.add('is-locked');
  // Reveal on the next frame so the opacity transition has a starting value.
  window.requestAnimationFrame(() => modal.classList.add('is-open'));
  dialog.focus();
}

function closeModal() {
  if (!isOpen()) {
    return;
  }

  modal.classList.remove('is-open');
  document.body.classList.remove('is-locked');
  closeTimer = window.setTimeout(() => {
    modal.hidden = true;
  }, CLOSE_DELAY);

  if (lastFocused) {
    lastFocused.focus();
    lastFocused = null;
  }
}

/** Keep Tab inside the dialog while it is open. */
function trapFocus(event) {
  const focusable = dialog.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) {
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && (active === first || active === dialog)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

export function initModal() {
  if (!modal || !dialog) {
    return;
  }

  document.querySelectorAll('[data-character]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openModal(trigger.dataset.character, trigger);
    });
  });

  modal.querySelectorAll('[data-modal-close]').forEach((closer) => {
    closer.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (!isOpen()) {
      return;
    }
    if (event.key === 'Escape') {
      closeModal();
    } else if (event.key === 'Tab') {
      trapFocus(event);
    }
  });
}
