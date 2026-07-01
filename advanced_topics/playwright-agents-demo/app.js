// Shared script for both GearLoop pages. Plain vanilla JS, no build step.
// The markup is intentionally hand-rolled (div "buttons", placeholder-only
// inputs) so agent-generated locators have realistic problems to solve.

function initSignIn() {
  const gate = document.querySelector('.gate-action');
  if (!gate) return;

  const email = document.querySelector('input[type="email"]');
  const password = document.querySelector('input[type="password"]');
  const error = document.querySelector('.signin-error');

  function submit() {
    const hasEmail = email && email.value.trim() !== '';
    const hasPassword = password && password.value.trim() !== '';

    if (!hasEmail || !hasPassword) {
      if (error) error.hidden = false;
      return;
    }
    window.location.href = 'catalog.html';
  }

  // The div acts as a button: respond to click and keyboard like a real one.
  gate.addEventListener('click', submit);
  gate.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      submit();
    }
  });
}

function initCatalog() {
  const grid = document.querySelector('.grid');
  if (!grid) return;

  const search = document.querySelector('.search');
  const cards = Array.from(document.querySelectorAll('.equip-card'));

  if (search) {
    search.addEventListener('input', () => {
      const query = search.value.trim().toLowerCase();
      cards.forEach((card) => {
        const text = (card.textContent ?? '').toLowerCase();
        card.hidden = query !== '' && !text.includes(query);
      });
    });
  }

  cards.forEach((card) => {
    const checkoutButton = card.querySelector('.btn-primary');
    const hideButton = card.querySelector('.btn-icon');
    const badge = card.querySelector('.badge');

    checkoutButton?.addEventListener('click', () => {
      if (badge) {
        badge.textContent = 'Checked out';
        badge.classList.remove('badge-open');
        badge.classList.add('badge-out');
      }
      checkoutButton.disabled = true;
    });

    hideButton?.addEventListener('click', () => {
      card.remove();
    });
  });
}

initSignIn();
initCatalog();
