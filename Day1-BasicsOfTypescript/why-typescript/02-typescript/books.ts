// Same catalog, but now the contract is written down.
//
// Each kind of book is an interface. The `format` field is the "discriminant":
// it tells TypeScript which shape it is looking at.

export interface PhysicalBook {
  format: 'physical';
  id: string;
  title: string;
  price: number;
  weightKg: number;
}

export interface EBook {
  format: 'ebook';
  id: string;
  title: string;
  price: number;
  fileSizeMb: number;
}

// The one and only `type` in the demo: a one-line union of the interfaces above.
// "A Book is either a PhysicalBook or an EBook." The shapes stay interfaces.
export type Book = PhysicalBook | EBook;

export const books: Book[] = [
  { format: 'physical', id: 'PT-1001', title: 'The Silent Library', price: 14.99, weightKg: 0.45 },
  { format: 'physical', id: 'PT-2001', title: 'Whispers in the Fog', price: 9.99, weightKg: 0.3 },
  { format: 'ebook', id: 'PT-3001', title: 'Down the Foggy Road', price: 7.99, fileSizeMb: 3.2 },
];
