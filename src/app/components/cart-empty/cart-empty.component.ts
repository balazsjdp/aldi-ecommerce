import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconCartComponent } from '../../shared/ui/icon-cart/icon-cart.component';

@Component({
  selector: 'app-cart-empty',
  imports: [RouterModule, IconCartComponent],
  template: `
    <div
      class="flex flex-col items-center justify-center text-center py-16 px-4 sm:px-6 lg:px-8">
      <app-icon-cart />

      <h2 class="text-xl font-semibold text-gray-800">Your cart is empty</h2>
      <p class="mt-2 text-sm text-gray-500">
        Looks like you haven’t added anything yet.
      </p>

      <a
        routerLink="/products"
        class="mt-6 inline-block px-4 py-2 rounded-md text-sm shop-button">
        Back to Products
      </a>
    </div>
  `,
})
export class CartEmptyComponent {}
