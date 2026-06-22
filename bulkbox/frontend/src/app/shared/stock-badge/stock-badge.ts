import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stock-badge',
  template: `
    @if (stock() > 0) {
      <span class="tag tag--ok">In stock{{ showCount() ? ' (' + stock() + ')' : '' }}</span>
    } @else {
      <span class="tag tag--low">Back Ordered</span>
    }
  `
})
export class StockBadge {
  readonly stock = input.required<number>();
  readonly showCount = input(false);
}
