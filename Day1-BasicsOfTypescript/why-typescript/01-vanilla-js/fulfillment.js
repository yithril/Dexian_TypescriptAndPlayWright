// These three functions were written when EVERY book was physical.
// They were 100% correct at the time. Nothing here is a "bug" in the usual sense.
// There is no comment, no signature, nothing that says "I only work for physical books".
// That assumption lives only in the head of whoever wrote it.

function shippingCost(book) {
  return book.weightKg * 2.5;
}

function deliver(book) {
  return `Ship "${book.title}" to the customer's address.`;
}

function returnPolicy(book) {
  return `"${book.title}": 30-day mail-back return.`;
}

module.exports = { shippingCost, deliver, returnPolicy };
