import {
  ChangeDetectionStrategy,
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
import { selectCartItemById } from '../../store/cart/cart.selectors';
import { ToastrService } from 'ngx-toastr';
import { HufPipe } from '../../shared/pipes/huf/huf.pipe';
import { ProductFallbackImageDirective } from '../../shared/directives/product-fallback-image.directive';

/**
 * ProductCardComponent displays a single product with its image, name, price,
 * and an input for setting the desired quantity. It allows users to add products to the cart.
 * It also handles logic for validating quantities and available stock.
 */
@Component({
  selector: 'app-product-card',
  imports: [HufPipe, ProductFallbackImageDirective],
  templateUrl: './product-card.component.html',
  host: {
    class: 'relative',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  private _store = inject(Store);
  private _toaster = inject(ToastrService);

  constructor() {
    effect(() => {
      this.quantity.set(this.minOrderAmount());
    });
  }

  // Holds the value of the product to be displayed
  product = input.required<Product>();
  // Holds the value of the quantity will be put in the cart
  quantity = signal<number>(1);
  // The remaining stock amount of the product
  remainingAmount = computed(() => {
    const productId = this.product().id;
    return productId
      ? this._store.selectSignal(selectRemainingAmount(productId))()
      : 0;
  });
  // The quantity of the current product in the cart
  cartItemQuantity = computed(() => {
    const productId = this.product().id;
    return productId
      ? (this._store.selectSignal(selectCartItemById(productId))()?.quantity ??
          0)
      : 0;
  });
  // The minimum quantity of the current product can be put in the cart
  minOrderAmount = computed(() =>
    this.cartItemQuantity() >= this.product().minOrderAmount
      ? 1
      : this.product().minOrderAmount || 1
  );

  onQuantityInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.quantity.set(this.sanitizeQuantityInput(+input.value));
  }

  handleAddToCart() {
    const product = this.product();
    if (!product) return;

    const quantityToAdd = Math.min(this.quantity(), this.remainingAmount());
    if (quantityToAdd <= 0) return;

    if (this.quantity() > this.remainingAmount()) {
      this._toaster.info(
        'The amount added was corrected as it exceeded the currently available amount',
        'Information',
        { timeOut: 2000 }
      );
    }

    this._store.dispatch(
      addToCart({
        item: product,
        quantity: quantityToAdd,
      })
    );
  }

  private sanitizeQuantityInput(value: number): number {
    return Math.max(this.minOrderAmount(), value);
  }
}
