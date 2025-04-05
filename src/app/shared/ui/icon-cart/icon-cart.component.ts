import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-cart',
  imports: [],
  templateUrl: './icon-cart.component.html',
})
export class IconCartComponent {
  @Input() class = 'w-16 h-16 text-gray-400 mb-4';
}
