import { Component, Input } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';

const UNKNOWN_ROUTE = 'UNKNOWN_ROUTE';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [RouterModule, RouterLinkActive],
  templateUrl: './nav-item.component.html',
})
export class NavItemComponent {
  @Input({ required: true }) routerLink!: string;
  @Input() label: string = UNKNOWN_ROUTE;
}
