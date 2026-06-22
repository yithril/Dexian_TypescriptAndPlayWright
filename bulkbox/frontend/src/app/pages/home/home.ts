import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Spinner } from '../../shared/spinner/spinner';
import { ProductCard } from '../../shared/product-card/product-card';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Spinner, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private productService = inject(ProductService);
  protected cart = inject(CartService);

  private readonly loaded = signal(false);
  protected readonly loading = computed(() => !this.loaded());

  protected readonly categories = toSignal(this.productService.getCategories(), {
    initialValue: []
  });
  protected readonly products = toSignal(
    this.productService.getProducts().pipe(tap(() => this.loaded.set(true))),
    { initialValue: [] as Product[] }
  );

  featured(): Product[] {
    return this.products().slice(0, 4);
  }

  addToCart(product: Product): void {
    this.cart.add(product, 1);
  }
}
