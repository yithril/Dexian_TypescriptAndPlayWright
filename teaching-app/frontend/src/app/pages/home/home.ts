import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';
import { CatalogService } from '../../services/catalog.service';
import { BasketService } from '../../services/basket.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private catalog = inject(CatalogService);
  protected basket = inject(BasketService);

  private readonly loaded = signal(false);
  protected readonly loading = computed(() => !this.loaded());

  protected readonly genres = toSignal(this.catalog.getGenres(), { initialValue: [] });
  private readonly books = toSignal(
    this.catalog.getBooks().pipe(tap(() => this.loaded.set(true))),
    { initialValue: [] as Book[] }
  );

  protected readonly featured = computed(() =>
    this.books()
      .filter((b) => b.stock > 0)
      .slice(0, 4)
  );

  private readonly genreIcons: Record<string, string> = {
    fiction: 'fa-book',
    mystery: 'fa-mask',
    scifi: 'fa-rocket',
    children: 'fa-child-reaching',
    cooking: 'fa-utensils'
  };

  genreIcon(slug: string): string {
    return this.genreIcons[slug] ?? 'fa-book';
  }

  initials(title: string): string {
    return title
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0] ?? '')
      .join('')
      .toUpperCase();
  }

  addToBasket(book: Book): void {
    this.basket.add(book, 1);
  }
}
