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
  styleUrl: './cart.component.css',
  template: `
    <div class="bg-white">
      <div
        class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        @if (cartItemQuantity() === 0) {
          <app-cart-empty />
        } @else {
          <app-cart-content />
        }
      </div>
    </div>
  `,
})
export class CartComponent {
  private _store = inject(Store);
  cartItemQuantity = this._store.selectSignal(selectCartTotalQuantity);
}
