const books = [
  { format: 'physical', id: 'PT-1001', title: 'The Silent Library', price: 14.99, weightKg: 0.45 },
  { format: 'physical', id: 'PT-2001', title: 'Whispers in the Fog', price: 9.99, weightKg: 0.3 },
  { format: 'ebook', id: 'PT-3001', title: 'Down the Foggy Road', price: 7.99, fileSizeMb: 3.2 },
];

function shippingCost(book) {
  return book.weightKg * 2.5;
}

function deliver(book) {
  return `Ship "${book.title}" to the customer's address.`;
}

function returnPolicy(book) {
  return `"${book.title}": 30-day mail-back return.`;
}

let cart = [books[0], books[1]];

function money(n) {
  const text = `$${n.toFixed(2)}`;
  return Number.isNaN(n) ? `<span class="bad">${text}</span>` : text;
}

function render() {
  const rows = cart.map(book => {
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
  }).join('');

  const total = cart.reduce((sum, b) => sum + b.price + shippingCost(b), 0);

  document.getElementById('cart').innerHTML = rows + `
    <div class="total">
      <span>Order total</span>
      <span>${money(total)}</span>
    </div>`;
}

document.getElementById('addEbook').addEventListener('click', () => {
  if (!cart.includes(books[2])) cart = [...cart, books[2]];
  render();
});

document.getElementById('reset').addEventListener('click', () => {
  cart = [books[0], books[1]];
  render();
});

document.getElementById('toggleExplain').addEventListener('click', (e) => {
  const panel = document.getElementById('explainer');
  const open = panel.classList.toggle('open');
  e.target.textContent = open ? 'Hide the explainer' : 'Show the explainer';
});

render();
