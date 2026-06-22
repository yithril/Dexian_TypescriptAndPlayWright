import { Injectable, computed, signal } from '@angular/core';
import { Book } from '../models/book';

export interface BasketLine {
  book: Book;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class BasketService {
  private readonly lines = signal<BasketLine[]>([]);

  readonly items = this.lines.asReadonly();
  readonly count = computed(() => this.lines().reduce((sum, l) => sum + l.quantity, 0));
  readonly subtotal = computed(() =>
    this.lines().reduce((sum, l) => sum + l.book.price * l.quantity, 0)
  );

  add(book: Book, quantity = 1): void {
    this.lines.update((lines) => {
      const existing = lines.find((l) => l.book.id === book.id);
      if (existing) {
        return lines.map((l) =>
          l.book.id === book.id ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...lines, { book, quantity }];
    });
  }

  updateQuantity(bookId: number, quantity: number): void {
    if (quantity <= 0) {
      this.remove(bookId);
      return;
    }
    this.lines.update((lines) =>
      lines.map((l) => (l.book.id === bookId ? { ...l, quantity } : l))
    );
  }

  remove(bookId: number): void {
    this.lines.update((lines) => lines.filter((l) => l.book.id !== bookId));
  }

  clear(): void {
    this.lines.set([]);
  }
}
