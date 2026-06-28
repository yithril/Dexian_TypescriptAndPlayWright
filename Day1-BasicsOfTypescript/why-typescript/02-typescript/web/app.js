"use strict";
const books = [
    { format: 'physical', id: 'PT-1001', title: 'The Silent Library', price: 14.99, weightKg: 0.45 },
    { format: 'physical', id: 'PT-2001', title: 'Whispers in the Fog', price: 9.99, weightKg: 0.3 },
    { format: 'ebook', id: 'PT-3001', title: 'Down the Foggy Road', price: 7.99, fileSizeMb: 3.2 },
];
function shippingCost(book) {
    switch (book.format) {
        case 'physical':
            return book.weightKg * 2.5;
        case 'ebook':
            return 0;
        default: {
            const _exhaustive = book;
            return _exhaustive;
        }
    }
}
function deliver(book) {
    switch (book.format) {
        case 'physical':
            return `Ship "${book.title}" to the customer's address.`;
        case 'ebook':
            return `Email a download link for "${book.title}".`;
        default: {
            const _exhaustive = book;
            return _exhaustive;
        }
    }
}
function returnPolicy(book) {
    switch (book.format) {
        case 'physical':
            return `"${book.title}": 30-day mail-back return.`;
        case 'ebook':
            return `"${book.title}": no returns on digital downloads.`;
        default: {
            const _exhaustive = book;
            return _exhaustive;
        }
    }
}
let cart = [books[0], books[2]];
function money(n) {
    return `$${n.toFixed(2)}`;
}
function render() {
    const rows = cart
        .map((book) => {
        const shipping = shippingCost(book);
        const tag = book.format === 'ebook' ? '<span class="tag">eBook</span>' : '';
        return `
        <div class="row">
          <div>
            <div class="title">${book.title}${tag}</div>
            <div class="meta">${deliver(book)}</div>
            <div class="meta">${returnPolicy(book)}</div>
          </div>
          <div class="price">${money(book.price)}</div>
          <div class="ship">shipping ${money(shipping)}</div>
        </div>`;
    })
        .join('');
    const total = cart.reduce((sum, b) => sum + b.price + shippingCost(b), 0);
    const cartEl = document.getElementById('cart');
    if (cartEl) {
        cartEl.innerHTML =
            rows +
                `
      <div class="total">
        <span>Order total</span>
        <span>${money(total)}</span>
      </div>`;
    }
}
const toggleBtn = document.getElementById('toggleExplain');
if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
        const panel = document.getElementById('explainer');
        if (!panel)
            return;
        const open = panel.classList.toggle('open');
        e.target.textContent = open ? 'Hide the explainer' : 'Show the explainer';
    });
}
render();
