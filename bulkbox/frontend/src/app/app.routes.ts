import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'BulkBox - Industrial & Shipping Supplies'
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products').then((m) => m.Products),
    title: 'Products - BulkBox'
  },
  {
    path: 'quick-order',
    loadComponent: () => import('./pages/quick-order/quick-order').then((m) => m.QuickOrder),
    title: 'Quick Order - BulkBox'
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
    title: 'Product Detail - BulkBox'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
    title: 'Sign In - BulkBox'
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart),
    title: 'Cart - BulkBox'
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then((m) => m.Checkout),
    title: 'Checkout - BulkBox'
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders').then((m) => m.Orders),
    title: 'Orders - BulkBox'
  },
  { path: '**', redirectTo: '' }
];
