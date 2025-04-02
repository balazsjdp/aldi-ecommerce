import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/_layout/layout.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'products', component: ProductListComponent },
      { path: 'cart', component: CartComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/_static/not-found/not-found.component').then(
        m => m.NotFoundComponent
      ),
  },
];
