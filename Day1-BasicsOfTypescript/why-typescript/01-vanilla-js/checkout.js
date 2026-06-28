const { books } = require('./books');
const { shippingCost, deliver, returnPolicy } = require('./fulfillment');

// Yesterday's cart: two physical books. The receipt was perfect.
//   const cart = [books[0], books[1]];
//
// Today's cart: the same customer also bought an eBook. We did not touch a single
// line of fulfillment code. Run this and look at the eBook's row.
const cart = [books[0], books[2]]; // one physical, one eBook

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

// What you'll see, with NO error thrown:
//   - the eBook's shipping is "$NaN" (undefined weightKg * 2.5)
//   - the TOTAL is "$NaN", so the whole order is unchargeable
//   - we tell an eBook customer we'll mail them a box and offer a mail-back return
// The program "works". It just quietly does the wrong thing.
