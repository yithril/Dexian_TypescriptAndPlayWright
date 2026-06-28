// PageTurner catalog.
//
// This list was simple back when EVERY book we sold was a physical book.
// Then the business launched an eBook line, and eBooks started showing up in
// the same catalog. An eBook is a download: it has no weight, it has a file size.
//
// Nobody did anything wrong here. The data is reasonable. The requirements changed.
const books = [
  { format: 'physical', id: 'PT-1001', title: 'The Silent Library', price: 14.99, weightKg: 0.45 },
  { format: 'physical', id: 'PT-2001', title: 'Whispers in the Fog', price: 9.99, weightKg: 0.3 },
  { format: 'ebook', id: 'PT-3001', title: 'Down the Foggy Road', price: 7.99, fileSizeMb: 3.2 },
];

module.exports = { books };
