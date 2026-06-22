import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';
import { CatalogService } from '../../services/catalog.service';
import { BasketService } from '../../services/basket.service';
import { BookList } from '../../shared/book-list/book-list';
import { Book } from '../../models/book';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'title-az';

@Component({
  selector: 'app-catalog',
  imports: [BookList],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {
  private catalog = inject(CatalogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected basket = inject(BasketService);

  private readonly loaded = signal(false);
  protected readonly loading = computed(() => !this.loaded());

  private readonly allBooks = toSignal(
    this.catalog.getBooks().pipe(tap(() => this.loaded.set(true))),
    { initialValue: [] as Book[] }
  );
  protected readonly genres = toSignal(this.catalog.getGenres(), { initialValue: [] });
  private readonly params = toSignal(this.route.queryParamMap);

  protected readonly genre = signal('any');
  protected readonly inStockOnly = signal(false);
  protected readonly sort = signal<SortOption>('featured');
  protected readonly search = signal('');

  constructor() {
    effect(() => {
      const p = this.params();
      if (!p) return;
      this.genre.set(p.get('genre') ?? 'any');
      this.search.set(p.get('q') ?? '');
    });
  }

  protected readonly visibleBooks = computed(() => {
    const term = this.search().trim().toLowerCase();
    let list = this.allBooks().filter((book) => {
      const matchesGenre = this.genre() === 'any' || book.genre === this.genre();
      const matchesStock = !this.inStockOnly() || book.stock > 0;
      const matchesSearch =
        term === '' ||
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.sku.toLowerCase().includes(term);
      return matchesGenre && matchesStock && matchesSearch;
    });

    const sort = this.sort();
    if (sort === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === 'title-az') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  });

  setGenre(slug: string): void {
    this.genre.set(slug);
  }

  setSort(value: string): void {
    this.sort.set(value as SortOption);
  }

  toggleStock(checked: boolean): void {
    this.inStockOnly.set(checked);
  }

  clearSearch(): void {
    this.search.set('');
    this.router.navigate(['/catalog']);
  }

  addToBasket(book: Book): void {
    this.basket.add(book, 1);
  }
}
