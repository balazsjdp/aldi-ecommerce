import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItemsDistinctQuantity } from '../../store/cart/cart.selectors';
import { IconCartComponent } from '../../shared/ui/icon-cart/icon-cart.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-indicator',
  imports: [IconCartComponent, RouterModule],
  templateUrl: './cart-indicator.component.html',
})
export class CartIndicatorComponent {
  private _store = inject(Store);
  cartItemsCount = this._store.selectSignal(selectCartItemsDistinctQuantity);
}
