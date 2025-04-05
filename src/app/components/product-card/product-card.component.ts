import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import Product from '../../shared/interfaces/product.interface';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/cart/cart.actions';
import { selectRemainingAmount } from '../../store/stock/stock.selectors';
import { CurrencyPipe } from '@angular/common';
import { selectCartItemById } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <a class="group block">
      <div class="overflow-hidden">
        <img
          [src]="productData().img"
          (error)="onImageError($event)"
          [alt]="imageAlt"
          class="aspect-square w-full rounded-lg bg-gray-200 object-cover hover:opacity-75 xl:aspect-[7/8] transform hover:scale-125 transition-transform duration-300 peer" />
      </div>
      <h3
        class="mt-4 text-sm text-indigo-800 font-medium leading-tight truncate"
        [title]="productData().name">
        {{ productData().name }}
      </h3>
      <div class="flex justify-between items-end mt-2">
        <p class="text-lg font-light text-gray-900">
          {{ productData().price | currency }}
        </p>

        <div class="flex flex-row items-center gap-2">
          <input
            type="number"
            [min]="minOrderAmount()"
            [max]="remainingAmount()"
            [value]="minOrderAmount()"
            (input)="onQuantityInput($event)"
            class="w-16 rounded border border-gray-300 px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <button
            class="rounded shop-button px-3 py-1 text-sm font-medium text-white disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70 transition cursor-pointer"
            [disabled]="remainingAmount() <= 0"
            (click)="handleAddToCart()">
            Add
          </button>
        </div>
      </div>
    </a>
  `,
})
export class ProductCardComponent {
  private store = inject(Store);

  constructor() {
    effect(() => {
      this.quantity.set(this.productData().minOrderAmount);
    });
  }

  /* Signals */
  
  productData = input.required<Product>();
  // Holds the value of the quantity will be put in the cart
  quantity = signal<number>(1);
  // The remaining stock amount of the product
  remainingAmount = computed(() => {
    const productId = this.productData().id;
    return productId
      ? this.store.selectSignal(selectRemainingAmount(productId))()
      : 0;
  });
  // The quantity of the current product in the cart
  cartItemQuantity = computed(() => {
    const productId = this.productData().id;
    return productId
      ? (this.store.selectSignal(selectCartItemById(productId))()?.quantity ??
          0)
      : 0;
  });
  // The minimum quantity of the current product can be put in the cart
  minOrderAmount = computed(() =>
    this.cartItemQuantity() >= this.productData().minOrderAmount
      ? 1
      : this.productData().minOrderAmount || 1
  );

  /* Getters */

  get fallbackImage(): string {
    const name = this.productData()?.name ?? 'Not Found';
    return `https://placehold.co/700x800/e0e7ff/FFF?text=${encodeURIComponent(name)}&font=roboto`;
  }

  get imageAlt(): string {
    const name = this.productData()?.name;
    return name
      ? `Image of the ${name} product`
      : 'Product image not available';
  }

  /* Event handlers */

  onQuantityInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Math.max(this.minOrderAmount(), +input.value);
    this.quantity.set(value);
  }

  handleAddToCart() {
    const product = this.productData();
    if (!product) return;

    const quantityToAdd = Math.min(this.quantity(), this.remainingAmount());
    if (quantityToAdd <= 0) return;

    this.store.dispatch(
      addToCart({
        item: product,
        quantity: quantityToAdd,
      })
    );
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.fallbackImage;
  }
}
