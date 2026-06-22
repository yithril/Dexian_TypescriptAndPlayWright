import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  protected cart = inject(CartService);

  // The line awaiting a remove confirmation, or null when the modal is closed.
  protected readonly pendingRemoveId = signal<number | null>(null);
  protected readonly pendingRemoveName = computed(() => {
    const id = this.pendingRemoveId();
    return this.cart.items().find((l) => l.product.id === id)?.product.name ?? '';
  });

  changeQuantity(productId: number, value: string): void {
    this.cart.updateQuantity(productId, Math.floor(Number(value) || 0));
  }

  askRemove(productId: number): void {
    this.pendingRemoveId.set(productId);
  }

  confirmRemove(): void {
    const id = this.pendingRemoveId();
    if (id !== null) {
      this.cart.remove(id);
    }
    this.pendingRemoveId.set(null);
  }

  cancelRemove(): void {
    this.pendingRemoveId.set(null);
  }
}
