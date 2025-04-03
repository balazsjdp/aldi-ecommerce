import { Component, computed, input } from '@angular/core';
import CartItem from '../../shared/interfaces/cart-item.interface';

@Component({
  selector: 'app-cart-item-row',
  standalone: true,
  imports: [],
  styleUrl: './cart-item-row.component.css',
  template: `
      <li class="flex py-6">
        <div class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img src="{{item().img}}" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="size-full object-cover">
        </div>
        <div class="ml-4 flex flex-1 flex-col">
        <div>
            <div class="flex justify-between text-base font-medium text-gray-900">
            <h3>
                <a href="#">{{item().name}}</a>
            </h3>
            <p class="ml-4">{{itemSubTotal()}}</p>
            </div>
        </div>
        <div class="flex flex-1 items-end justify-between text-sm">
            <p class="text-gray-500">x {{item().quantity!}}</p>
            <div class="flex">
                <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
            </div>
        </div>
        </div>
    </li>
  `
})
export class CartItemRowComponent {
  item = input.required<CartItem>();

  itemSubTotal = computed(() => this.item().price * this.item().quantity!)
}
