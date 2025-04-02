import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import Product from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  styleUrl: './product-card.component.css',
  template: `
     <a href="#" class="group">
          <img [src]="productData()?.img" [alt]="" class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]">
          <h3 class="mt-4 text-sm text-gray-700">{{productData()?.name}}</h3>
          <p class="mt-1 text-lg font-medium text-gray-900">{{productData()?.price | currency }}</p>
      </a>
  `
})
export class ProductCardComponent {
  productData = input<Product>();
}
