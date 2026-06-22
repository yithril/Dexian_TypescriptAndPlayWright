import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { MegaMenu } from '../mega-menu/mega-menu';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MegaMenu],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private router = inject(Router);
  protected cart = inject(CartService);
  protected auth = inject(AuthService);

  protected readonly searchTerm = signal('');

  search(): void {
    const term = this.searchTerm().trim();
    this.router.navigate(['/products'], term ? { queryParams: { q: term } } : {});
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
