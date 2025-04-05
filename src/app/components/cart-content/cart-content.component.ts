import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCartItems,
  selectCartTotalPrice,
} from '../../store/cart/cart.selectors';
import { CartItemRowComponent } from '../cart-item-row/cart-item-row.component';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-content',
  imports: [RouterModule, CartItemRowComponent, CurrencyPipe],
  templateUrl: './cart-content.component.html',
})
export class CartContentComponent {
  private _store = inject(Store);
  cartItems = this._store.selectSignal(selectCartItems);
  cartSubTotal = this._store.selectSignal(selectCartTotalPrice);
}
