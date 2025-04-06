import { Component, Input } from '@angular/core';

/**
 * IconCartComponent renders a reusable SVG cart icon.
 * The styling of the icon (e.g., size, color, margin) can be customized via the 'class' input.
 *
 * Usage example:
 *   <app-icon-cart class="w-6 h-6 text-indigo-600" />
 */
@Component({
  selector: 'app-icon-cart',
  imports: [],
  templateUrl: './icon-cart.component.html',
})
export class IconCartComponent {
  @Input() class = 'w-16 h-16 text-gray-400 mb-4';
}
