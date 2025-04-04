import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-empty',
  imports: [RouterModule],
  template: `
  <div class="flex flex-col items-center justify-center text-center py-16 px-4 sm:px-6 lg:px-8">
  <svg
    class="w-16 h-16 text-gray-400 mb-4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.25 3h1.386a.75.75 0 01.715.536l.93 3.25m0 0L6.75 14.25a2.25 2.25 0 002.121 1.5h8.76a2.25 2.25 0 002.122-1.5l1.527-5.318a1.125 1.125 0 00-1.08-1.482H6.21m0 0L4.875 4.5m3.375 15a.375.375 0 11-.75 0 .375.375 0 01.75 0zm10.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>

  <h2 class="text-xl font-semibold text-gray-800">Your cart is empty</h2>
  <p class="mt-2 text-sm text-gray-500">Looks like you haven’t added anything yet.</p>

  <a
    routerLink="/products"
    class="mt-6 inline-block px-4 py-2 rounded-md text-sm shop-button">
    Back to Products
  </a>
</div>

  `
})
export class CartEmptyComponent {

}
