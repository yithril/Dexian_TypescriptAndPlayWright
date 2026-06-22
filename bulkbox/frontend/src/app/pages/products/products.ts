import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Spinner } from '../../shared/spinner/spinner';
import { ProductGrid } from '../../shared/product-grid/product-grid';
import { Product } from '../../models/product';

type SortOption = 'featured' | 'price-asc' | 'price-desc';

@Component({
  selector: 'app-products',
  imports: [Spinner, ProductGrid],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected cart = inject(CartService);

  private readonly loaded = signal(false);
  protected readonly loading = computed(() => !this.loaded());

  private readonly allProducts = toSignal(
    this.productService.getProducts().pipe(tap(() => this.loaded.set(true))),
    { initialValue: [] as Product[] }
  );
  protected readonly categories = toSignal(this.productService.getCategories(), {
    initialValue: []
  });
  private readonly params = toSignal(this.route.queryParamMap);

  protected readonly category = signal('all');
  protected readonly inStockOnly = signal(false);
  protected readonly sort = signal<SortOption>('featured');
  protected readonly search = signal('');

  constructor() {
    effect(() => {
      const p = this.params();
      if (!p) return;
      this.category.set(p.get('category') ?? 'all');
      this.search.set(p.get('q') ?? '');
    });
  }

  protected readonly visibleProducts = computed(() => {
    const term = this.search().trim().toLowerCase();
    let list = this.allProducts().filter((product) => {
      const matchesCategory = this.category() === 'all' || product.category === this.category();
      const matchesStock = !this.inStockOnly() || product.stock > 0;
      const matchesSearch =
        term === '' ||
        product.name.toLowerCase().includes(term) ||
        product.model.toLowerCase().includes(term);
      return matchesCategory && matchesStock && matchesSearch;
    });

    const sort = this.sort();
    if (sort === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  });

  setCategory(slug: string): void {
    this.category.set(slug);
  }

  setSort(value: string): void {
    this.sort.set(value as SortOption);
  }

  toggleStock(checked: boolean): void {
    this.inStockOnly.set(checked);
  }

  clearSearch(): void {
    this.search.set('');
    this.router.navigate(['/products']);
  }

  addToCart(product: Product): void {
    this.cart.add(product, 1);
  }
}
