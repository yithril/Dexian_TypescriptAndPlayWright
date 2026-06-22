import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE } from '../core/api';
import { User } from '../models/product';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly currentUser = signal<User | null>(this.restore());

  readonly user = this.currentUser.asReadonly();
  readonly isLoggedIn = computed(() => this.currentUser() !== null);

  async login(username: string, password: string): Promise<boolean> {
    const matches = await firstValueFrom(
      this.http.get<User[]>(`${API_BASE}/users`, {
        params: { username, password }
      })
    );
    const user = matches[0] ?? null;
    if (user) {
      this.currentUser.set(user);
      localStorage.setItem('bulkbox.user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('bulkbox.user');
  }

  private restore(): User | null {
    const raw = localStorage.getItem('bulkbox.user');
    return raw ? (JSON.parse(raw) as User) : null;
  }
}
