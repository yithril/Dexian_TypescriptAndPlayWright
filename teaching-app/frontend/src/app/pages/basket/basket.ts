import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-basket',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './basket.html',
  styleUrl: './basket.css'
})
export class Basket {
  protected basket = inject(BasketService);
  protected readonly placed = signal(false);

  changeQuantity(bookId: number, value: string): void {
    this.basket.updateQuantity(bookId, Math.floor(Number(value) || 0));
  }

  remove(bookId: number): void {
    this.basket.remove(bookId);
  }

  placeOrder(): void {
    this.basket.clear();
    this.placed.set(true);
  }
}
