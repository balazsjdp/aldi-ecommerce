import { Component, inject, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import NavItem from '../../shared/interfaces/nav-item.interface';
import { NavItemComponent } from '../../components/ui/nav-item/nav-item.component';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavItemComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  private _router = inject(Router);
  protected pageTitle = signal<string>('');

  constructor() {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.pageTitle.set(
          this.navigationItems.find(i => i.routerLink === this._router.url)
            ?.label ?? 'UNKNOWN PAGE'
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
