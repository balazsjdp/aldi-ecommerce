import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartTotalQuantity } from '../../store/cart/cart.selectors';
import { RouterModule } from '@angular/router';
import { CartEmptyComponent } from '../../components/cart-empty/cart-empty.component';
import { CartContentComponent } from '../../components/cart-content/cart-content.component';

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
