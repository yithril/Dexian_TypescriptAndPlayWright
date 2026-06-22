import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE } from '../core/api';
import { Book, Genre } from '../models/book';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private http = inject(HttpClient);

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${API_BASE}/books`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${API_BASE}/books/${id}`);
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${API_BASE}/genres`);
  }
}
