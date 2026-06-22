import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-mega-menu',
  imports: [RouterLink],
  templateUrl: './mega-menu.html',
  styleUrl: './mega-menu.css'
})
export class MegaMenu {
  private productService = inject(ProductService);

  protected readonly categories = toSignal(this.productService.getCategories(), {
    initialValue: []
  });
  protected readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
