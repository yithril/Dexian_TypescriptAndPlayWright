import { books } from './books';
import { shippingCost, deliver, returnPolicy } from './fulfillment';

// Same cart as the JS stage: one physical, one eBook. This time every case is
// handled, so the receipt is correct: $0 shipping on the download, a real total,
// a download link instead of "ship to address", and the right return policy.
const cart = [books[0], books[2]];

console.log('PageTurner receipt');
console.log('------------------');
for (const book of cart) {
  const shipping = shippingCost(book);
  console.log(`${book.title.padEnd(22)} $${book.price.toFixed(2)}  shipping $${shipping.toFixed(2)}`);
  console.log(`  ${deliver(book)}`);
  console.log(`  ${returnPolicy(book)}`);
}

const total = cart.reduce((sum, b) => sum + b.price + shippingCost(b), 0);
console.log('------------------');
console.log(`TOTAL: $${total.toFixed(2)}`);
