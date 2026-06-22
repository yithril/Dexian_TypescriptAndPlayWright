import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map } from 'rxjs/operators';
import { CatalogService } from '../../services/catalog.service';
import { BasketService } from '../../services/basket.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-detail',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private catalog = inject(CatalogService);
  protected basket = inject(BasketService);

  protected readonly book = toSignal<Book | null>(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.catalog.getBook(id))
    ),
    { initialValue: null }
  );

  protected readonly quantity = signal(1);
  protected readonly added = signal(false);

  protected readonly cover = computed(() => {
    const b = this.book();
    if (!b) return '';
    return b.title
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0] ?? '')
      .join('')
      .toUpperCase();
  });

  setQuantity(value: string): void {
    const n = Math.max(1, Math.floor(Number(value) || 1));
    this.quantity.set(n);
  }

  increment(): void {
    this.quantity.update((q) => q + 1);
  }

  decrement(): void {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  addToBasket(): void {
    const book = this.book();
    if (!book) return;
    this.basket.add(book, this.quantity());
    this.added.set(true);
  }

  goToBasket(): void {
    this.router.navigate(['/basket']);
  }
}
