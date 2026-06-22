import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/product';

type SortKey = 'id' | 'customer' | 'total' | 'status';
type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 5;

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders {
  private orderService = inject(OrderService);

  protected readonly orders = toSignal(this.orderService.getOrders(), { initialValue: [] as Order[] });

  protected readonly sortKey = signal<SortKey>('id');
  protected readonly sortDir = signal<SortDir>('asc');
  protected readonly page = signal(1);

  protected readonly sorted = computed(() => {
    const key = this.sortKey();
    const dir = this.sortDir() === 'asc' ? 1 : -1;
    return [...this.orders()].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  });

  protected readonly totalPages = computed(() => Math.max(1, Math.ceil(this.orders().length / PAGE_SIZE)));

  protected readonly pageRows = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.sorted().slice(start, start + PAGE_SIZE);
  });

  sortBy(key: SortKey): void {
    if (this.sortKey() === key) {
      this.sortDir.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortKey.set(key);
      this.sortDir.set('asc');
    }
    this.page.set(1); // a re-sort returns to the first page
  }

  previousPage(): void {
    this.page.update((p) => Math.max(1, p - 1));
  }

  nextPage(): void {
    this.page.update((p) => Math.min(this.totalPages(), p + 1));
  }
}
