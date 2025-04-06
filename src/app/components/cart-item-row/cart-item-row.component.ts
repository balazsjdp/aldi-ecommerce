import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import CartItem from '../../shared/interfaces/cart-item.interface';
import { Store } from '@ngrx/store';
import { removeFromCart } from '../../store/cart/cart.actions';
import { HufPipe } from '../../shared/pipes/huf/huf.pipe';
import { ProductFallbackImageDirective } from '../../shared/directives/product-fallback-image.directive';

/**
 * CartItemRowComponent represents a single row in the shopping cart list.
 * It displays product image, name, quantity, subtotal, and includes a button
 * to remove the item from the cart.
 */
@Component({
  selector: 'app-cart-item-row',
  standalone: true,
  imports: [HufPipe, ProductFallbackImageDirective],
  templateUrl: './cart-item-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemRowComponent {
  private _store = inject(Store);
  item = input.required<CartItem>();
  // A computed signal to calculate the subtotal of the item
  itemSubTotal = computed(() => this.item().price * this.item().quantity!);

  // An event handler that fires when the user clicks the remove button
  // It dispatches an action to remove the item from the cart
  handleRemoveFromCart() {
    this._store.dispatch(
      removeFromCart({ id: this.item().id, quantity: this.item().quantity! })
    );
  }
}
