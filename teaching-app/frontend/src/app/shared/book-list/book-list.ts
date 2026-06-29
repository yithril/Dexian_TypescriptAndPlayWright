import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  readonly books = input.required<Book[]>();
  readonly add = output<Book>();

  initials(title: string): string {
    return title
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0] ?? '')
      .join('')
      .toUpperCase();
  }

  private readonly genreCovers: Record<string, string> = {
    fiction: 'cover--fiction',
    mystery: 'cover--mystery',
    scifi: 'cover--scifi',
    children: 'cover--children',
    cooking: 'cover--cooking'
  };

  coverClass(genre: string): string {
    return this.genreCovers[genre] ?? '';
  }
}
