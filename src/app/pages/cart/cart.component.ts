import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../store/cart/cart.selectors';
import { CartItemRowComponent } from '../../components/cart-item-row/cart-item-row.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemRowComponent, CartItemRowComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private _store = inject(Store);

  cartItems = this._store.selectSignal(selectCartItems);
}
