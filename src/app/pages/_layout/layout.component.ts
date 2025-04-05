import { Component, inject, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import NavItem from '../../shared/interfaces/nav-item.interface';
import { NavItemComponent } from '../../shared/ui/nav-item/nav-item.component';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectCartItemsDistinctQuantity } from '../../store/cart/cart.selectors';
import { IconCartComponent } from '../../shared/ui/icon-cart/icon-cart.component';

const NOT_FOUND = 'Not Found';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavItemComponent, IconCartComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  private _router = inject(Router);
  private _store = inject(Store);
  protected pageTitle = signal<string>('');

  cartItemsCount = this._store.selectSignal(selectCartItemsDistinctQuantity);

  constructor() {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.pageTitle.set(
          this.navigationItems.find(i => i.routerLink === this._router.url)
            ?.label ?? NOT_FOUND
        );
      });
  }

  navigationItems: NavItem[] = [
    {
      label: 'Products',
      routerLink: '/products',
    },
    {
      label: 'Cart',
      routerLink: '/cart',
    },
  ];
}
