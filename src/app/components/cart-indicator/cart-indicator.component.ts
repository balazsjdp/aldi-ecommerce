import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItemsDistinctQuantity } from '../../store/cart/cart.selectors';
import { IconCartComponent } from '../../shared/ui/icon-cart/icon-cart.component';
import { RouterModule } from '@angular/router';

/**
 * CartIndicatorComponent displays a cart icon with a badge showing the number
 * of distinct items currently in the user's cart.
 * It also takes the user to the /cart page when clicked.
 */
@Component({
  selector: 'app-cart-indicator',
  imports: [IconCartComponent, RouterModule],
  templateUrl: './cart-indicator.component.html',
})
export class CartIndicatorComponent {
  private _store = inject(Store);
  cartItemsCount = this._store.selectSignal(selectCartItemsDistinctQuantity);
}
