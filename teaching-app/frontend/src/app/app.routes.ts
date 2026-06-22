import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'PageTurner - Independent Online Bookshop'
  },
  {
    path: 'catalog',
    loadComponent: () => import('./pages/catalog/catalog').then((m) => m.Catalog),
    title: 'Catalog - PageTurner'
  },
  {
    path: 'catalog/:id',
    loadComponent: () => import('./pages/book-detail/book-detail').then((m) => m.BookDetail),
    title: 'Book - PageTurner'
  },
  {
    path: 'signin',
    loadComponent: () => import('./pages/signin/signin').then((m) => m.SignIn),
    title: 'Sign In - PageTurner'
  },
  {
    path: 'basket',
    loadComponent: () => import('./pages/basket/basket').then((m) => m.Basket),
    title: 'Basket - PageTurner'
  },
  { path: '**', redirectTo: '' }
];
