import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconCartComponent } from '../../shared/ui/icon-cart/icon-cart.component';

/**
 * CartEmptyComponent is a presentational component that displays a message
 * when the user's shopping cart is empty. It includes an icon, a message, and a
 * navigation link to the products page.
 */
@Component({
  selector: 'app-cart-empty',
  imports: [RouterModule, IconCartComponent],
  templateUrl: './cart-empty.component.html',
})
export class CartEmptyComponent {}
