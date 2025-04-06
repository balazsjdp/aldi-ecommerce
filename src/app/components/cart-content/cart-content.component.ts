import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCartItems,
  selectCartTotalPrice,
} from '../../store/cart/cart.selectors';
import { CartItemRowComponent } from '../cart-item-row/cart-item-row.component';
import { RouterModule } from '@angular/router';
import { HufPipe } from '../../shared/pipes/huf/huf.pipe';

/**
 * The CartContentComponent is responsible for displaying the items in the shopping cart in case there are any.
 * It also displays the subtotal of the cart.
 */
@Component({
  selector: 'app-cart-content',
  imports: [RouterModule, CartItemRowComponent, HufPipe],
  templateUrl: './cart-content.component.html',
})
export class CartContentComponent {
  private _store = inject(Store);
  cartItems = this._store.selectSignal(selectCartItems);
  cartSubTotal = this._store.selectSignal(selectCartTotalPrice);
}
