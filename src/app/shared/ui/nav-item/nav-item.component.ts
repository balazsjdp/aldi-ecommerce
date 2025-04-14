import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';

const UNKNOWN_ROUTE = 'UNKNOWN_ROUTE';

/**
 * NavItemComponent renders a single navigation link with active state styling.
 * It is used within a navigation bar and highlights the active route.
 * It routes to the specified path when clicked.
 *
 * Usage example:
 *   <app-nav-item routerLink="/products" label="Products" />
 */
@Component({
  selector: 'app-nav-item',
  imports: [RouterModule, RouterLinkActive],
  templateUrl: './nav-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent {
  @Input({ required: true }) routerLink!: string;
  @Input() label: string = UNKNOWN_ROUTE;
}
