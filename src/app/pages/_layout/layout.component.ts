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
import { CartIndicatorComponent } from '../../components/cart-indicator/cart-indicator.component';

const NOT_FOUND = 'Not Found';

/**
 * LayoutComponent is the main structural shell of the application.
 * It defines the navigation bar, header (with dynamic page titles),
 * and the main content area that loads routed pages via RouterOutlet.
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    NavItemComponent,
    CartIndicatorComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  private _router = inject(Router);
  pageTitle = signal<string>('');

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
