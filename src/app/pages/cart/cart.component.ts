import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartTotalQuantity } from '../../store/cart/cart.selectors';
import { RouterModule } from '@angular/router';
import { CartEmptyComponent } from '../../components/cart-empty/cart-empty.component';
import { CartContentComponent } from '../../components/cart-content/cart-content.component';

/**
 * CartComponent is the container page for the shopping cart view.
 * It conditionally displays either an empty-cart message (CartEmptyComponent) or the full cart content (CartContentComponent)
 * based on whether the cart contains any items.
 */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CartEmptyComponent, CartContentComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private _store = inject(Store);
  cartItemQuantity = this._store.selectSignal(selectCartTotalQuantity);
}
