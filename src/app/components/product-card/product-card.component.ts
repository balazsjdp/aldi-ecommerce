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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  private _store = inject(Store);
  private _toaster = inject(ToastrService);

  constructor() {
    effect(() => {
      this.quantity.set(this.minOrderAmount());
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
      ? this._store.selectSignal(selectRemainingAmount(productId))()
      : 0;
  });
  // The quantity of the current product in the cart
  cartItemQuantity = computed(() => {
    const productId = this.productData().id;
    return productId
      ? (this._store.selectSignal(selectCartItemById(productId))()?.quantity ??
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

    if (this.quantity() > this.remainingAmount()) {
      this._toaster.info(
        'The amount added was corrected as it exceeded the currently available amount',
        'Information',
        { timeOut: 60000 }
      );
    }

    this._store.dispatch(
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
