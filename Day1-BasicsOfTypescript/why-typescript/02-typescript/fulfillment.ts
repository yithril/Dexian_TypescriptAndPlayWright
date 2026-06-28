import { Book } from './books';

// Each function now takes a `Book`. Two things changed:
//
// 1. Inside `case 'physical'`, TypeScript KNOWS `book` has `weightKg`, and inside
//    `case 'ebook'` it knows there is no weight. The shape is visible.
//
// 2. The `default` branch assigns `book` to a variable of type `never`. After we
//    handle every known format, the only thing left is `never`. If a NEW format is
//    ever added to the union and not handled here, `book` is no longer `never`, this
//    line stops compiling, and the error points right at the function that forgot it.

export function shippingCost(book: Book): number {
  switch (book.format) {
    case 'physical':
      return book.weightKg * 2.5;
    case 'ebook':
      return 0; // a download ships nothing
    default:
      const _exhaustive: never = book;
      return _exhaustive;
  }
}

export function deliver(book: Book): string {
  switch (book.format) {
    case 'physical':
      return `Ship "${book.title}" to the customer's address.`;
    case 'ebook':
      return `Email a download link for "${book.title}".`;
    default:
      const _exhaustive: never = book;
      return _exhaustive;
  }
}

export function returnPolicy(book: Book): string {
  switch (book.format) {
    case 'physical':
      return `"${book.title}": 30-day mail-back return.`;
    case 'ebook':
      return `"${book.title}": no returns on digital downloads.`;
    default:
      const _exhaustive: never = book;
      return _exhaustive;
  }
}
