import { Component, computed, inject, input } from '@angular/core';
import CartItem from '../../shared/interfaces/cart-item.interface';
import { Store } from '@ngrx/store';
import { removeFromCart } from '../../store/cart/cart.actions';
import { HufPipe } from '../../shared/pipes/huf.pipe';
import { ProductFallbackImageDirective } from '../../shared/directives/product-fallback-image.directive';

@Component({
  selector: 'app-cart-item-row',
  standalone: true,
  imports: [HufPipe, ProductFallbackImageDirective],
  templateUrl: './cart-item-row.component.html',
})
export class CartItemRowComponent {
  private _store = inject(Store);
  item = input.required<CartItem>();
  itemSubTotal = computed(() => this.item().price * this.item().quantity!);

  handleRemoveFromCart() {
    this._store.dispatch(
      removeFromCart({ id: this.item().id, quantity: this.item().quantity! })
    );
  }
}
