const CATALOG = {
  'H-101': 'Heavy-Duty Shipping Box 12×12×12',
  'H-202': 'Corrugated Mailer 9×6×4',
  'H-303': 'Packing Tape Dispenser',
  'H-404': 'Bubble Wrap Roll 24"',
  'H-505': 'Stretch Wrap 18"',
  'H-606': 'Shipping Labels 4×6',
  'H-707': 'Foam Pouches 8×12',
  'H-808': 'Pallet Wrap Machine Film'
};

const searchInput = document.getElementById('search-query');
const searchButton = document.getElementById('search-button');
const searchResult = document.getElementById('search-result');
const productName = document.getElementById('product-name');
const addToCartButton = document.getElementById('add-to-cart');
const cartStatus = document.getElementById('cart-status');
const orderForm = document.getElementById('order-form');
const summary = document.getElementById('summary');

let selectedProduct = null;

function normalizeQuery(value) {
  return value.trim().toUpperCase();
}

function runSearch() {
  const query = normalizeQuery(searchInput.value);
  const match = CATALOG[query];

  if (!match) {
    searchResult.hidden = true;
    selectedProduct = null;
    cartStatus.textContent = 'No product found for that code.';
    return;
  }

  selectedProduct = { code: query, name: match };
  productName.textContent = `${query} — ${match}`;
  searchResult.hidden = false;
  cartStatus.textContent = '';
}

searchButton.addEventListener('click', runSearch);
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    runSearch();
  }
});

addToCartButton.addEventListener('click', () => {
  if (!selectedProduct) {
    cartStatus.textContent = 'Search for a product first.';
    return;
  }
  cartStatus.textContent = `${selectedProduct.code} added to cart.`;
});

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!selectedProduct) {
    cartStatus.textContent = 'Add a product to the cart before placing the order.';
    return;
  }

  const formData = new FormData(orderForm);
  const order = {
    productCode: selectedProduct.code,
    productName: selectedProduct.name,
    attn: String(formData.get('attn') ?? '').trim(),
    poNumber: String(formData.get('poNumber') ?? '').trim(),
    specialInstructions: String(formData.get('specialInstructions') ?? '').trim(),
    shippingAddress: String(formData.get('shippingAddress') ?? ''),
    shippingMethod: String(formData.get('shippingMethod') ?? '')
  };

  if (
    !order.attn ||
    !order.poNumber ||
    !order.specialInstructions ||
    !order.shippingAddress ||
    !order.shippingMethod
  ) {
    cartStatus.textContent = 'Fill in all required fields.';
    return;
  }

  document.getElementById('summary-product').textContent =
    `${order.productCode} — ${order.productName}`;
  document.getElementById('summary-attn').textContent = order.attn;
  document.getElementById('summary-po').textContent = order.poNumber;
  document.getElementById('summary-instructions').textContent = order.specialInstructions;
  document.getElementById('summary-address').textContent = order.shippingAddress;
  document.getElementById('summary-method').textContent = order.shippingMethod;

  summary.hidden = false;
  cartStatus.textContent = 'Order placed successfully.';
});
