import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StockBadge } from '../stock-badge/stock-badge';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-grid',
  imports: [RouterLink, CurrencyPipe, StockBadge],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.css'
})
export class ProductGrid {
  readonly products = input.required<Product[]>();
  readonly add = output<Product>();
}
