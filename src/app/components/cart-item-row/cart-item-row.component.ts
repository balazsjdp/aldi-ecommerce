import { Component, computed, inject, input } from '@angular/core';
import CartItem from '../../shared/interfaces/cart-item.interface';
import { CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { removeFromCart } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-cart-item-row',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <li class="flex py-6">
      <div
        class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src="{{ item().img }}"
          alt="{{ item().name }} image"
          class="size-full object-cover" />
      </div>
      <div class="ml-4 flex flex-1 flex-col">
        <div>
          <div class="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="#">{{ item().name }}</a>
            </h3>
            <p class="ml-4">{{ itemSubTotal() | currency }}</p>
          </div>
        </div>
        <div class="flex flex-1 items-end justify-between text-sm">
          <p class="text-gray-500">x {{ item().quantity! }}</p>
          <div class="flex">
            <button
              type="button"
              (click)="handleRemoveFromCart()"
              class="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  `,
})
export class CartItemRowComponent {
  private _store = inject(Store);
  item = input.required<CartItem>();
  itemSubTotal = computed(() => this.item().price * this.item().quantity!);

  handleRemoveFromCart() {
    this._store.dispatch(removeFromCart({ id: this.item().id }));
  }
}
