import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconCartComponent } from '../../shared/ui/icon-cart/icon-cart.component';

@Component({
  selector: 'app-cart-empty',
  imports: [RouterModule, IconCartComponent],
  templateUrl: './cart-empty.component.html',
})
export class CartEmptyComponent {}
