import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [CurrencyPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  protected cart = inject(CartService);

  protected readonly step = signal(1);
  protected readonly error = signal('');
  protected readonly placed = signal(false);

  // Shipping
  protected readonly name = signal('');
  protected readonly address = signal('');
  // Payment
  protected readonly cardName = signal('');
  protected readonly cardNumber = signal('');

  next(): void {
    this.error.set('');
    if (this.step() === 1) {
      if (!this.name().trim() || !this.address().trim()) {
        this.error.set('Please complete all shipping fields.');
        return;
      }
      this.step.set(2);
    } else if (this.step() === 2) {
      if (!this.cardName().trim() || !this.cardNumber().trim()) {
        this.error.set('Please complete all payment fields.');
        return;
      }
      this.step.set(3);
    }
  }

  back(): void {
    this.error.set('');
    if (this.step() > 1) {
      this.step.update((s) => s - 1);
    }
  }

  placeOrder(): void {
    this.placed.set(true);
  }
}
