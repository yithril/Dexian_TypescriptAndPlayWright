import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Spinner } from '../../shared/spinner/spinner';
import { StockBadge } from '../../shared/stock-badge/stock-badge';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, CurrencyPipe, Spinner, StockBadge],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  protected cart = inject(CartService);

  protected readonly product = toSignal<Product | null>(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.productService.getProduct(id))
    ),
    { initialValue: null }
  );

  protected readonly quantity = signal(1);
  protected readonly added = signal(false);

  protected readonly activeTab = signal<'description' | 'specs' | 'shipping'>('description');
  protected readonly accordionOpen = signal(false);
  protected readonly toast = signal('');
  private toastTimer?: ReturnType<typeof setTimeout>;

  setTab(tab: 'description' | 'specs' | 'shipping'): void {
    this.activeTab.set(tab);
  }

  toggleAccordion(): void {
    this.accordionOpen.update((v) => !v);
  }

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

  addToCart(): void {
    const product = this.product();
    if (!product) return;
    this.cart.add(product, this.quantity());
    this.added.set(true);
    // Transient toast that auto-dismisses after 3s.
    this.toast.set(`Added ${product.name} to your cart.`);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(''), 3000);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
