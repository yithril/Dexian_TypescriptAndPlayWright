import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BasketService } from '../../services/basket.service';
import { AccountService } from '../../services/account.service';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css'
})
export class SiteHeader {
  private router = inject(Router);
  private catalog = inject(CatalogService);
  protected basket = inject(BasketService);
  protected account = inject(AccountService);

  protected readonly query = signal('');
  protected readonly genres = toSignal(this.catalog.getGenres(), { initialValue: [] });

  runSearch(): void {
    const term = this.query().trim();
    this.router.navigate(['/catalog'], term ? { queryParams: { q: term } } : {});
  }

  signOut(): void {
    this.account.signOut();
    this.router.navigate(['/']);
  }
}
