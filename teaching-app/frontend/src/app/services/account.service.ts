import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE } from '../core/api';
import { Member } from '../models/book';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private http = inject(HttpClient);
  private readonly currentMember = signal<Member | null>(this.restore());

  readonly member = this.currentMember.asReadonly();
  readonly isSignedIn = computed(() => this.currentMember() !== null);

  async signIn(username: string, password: string): Promise<boolean> {
    const matches = await firstValueFrom(
      this.http.get<Member[]>(`${API_BASE}/members`, {
        params: { username, password }
      })
    );
    const member = matches[0] ?? null;
    if (member) {
      this.currentMember.set(member);
      localStorage.setItem('pageturner.member', JSON.stringify(member));
      return true;
    }
    return false;
  }

  signOut(): void {
    this.currentMember.set(null);
    localStorage.removeItem('pageturner.member');
  }

  private restore(): Member | null {
    const raw = localStorage.getItem('pageturner.member');
    return raw ? (JSON.parse(raw) as Member) : null;
  }
}
