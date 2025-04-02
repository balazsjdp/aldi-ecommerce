import { Component, Input } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';

const UNKNOWN_ROUTE = 'UNKNOWN_ROUTE';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [RouterModule, RouterLinkActive],
  template: `
    <a
      [routerLink]="routerLink"
      routerLinkActive="bg-gray-800 text-white"
      [routerLinkActiveOptions]="{ exact: true }"
      class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
      {{ label }}
    </a>
  `,
})
export class NavItemComponent {
  @Input({ required: true }) routerLink!: string;
  @Input() label: string = UNKNOWN_ROUTE;
}
