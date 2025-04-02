import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import Product from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  styleUrl: './product-card.component.css',
  template: `
    <a class="group block">
      <div class="overflow-hidden">
        <img
          [src]="productData()?.img"
          (error)="onImageError($event)"
          [alt]="imageAlt"
          class="aspect-square w-full rounded-lg bg-gray-200 object-cover hover:opacity-75 xl:aspect-[7/8] transform hover:scale-125 transition-transform duration-300 peer" />
      </div>
      <h3
        class="mt-4 text-sm text-indigo-800 font-medium leading-tight truncate"
        [title]="productData()?.name">
        {{ productData()?.name }}
      </h3>
      <div class="flex justify-between items-end mt-2">
        <p class="text-lg font-light text-gray-900">
          {{ productData()?.price | currency }}
        </p>
        <div class="flex flex-row items-center gap-2">
          <input
            type="number"
            min="{{ productData()?.minOrderAmount || 1 }}"
            [value]="productData()?.minOrderAmount || 1"
            class="w-16 rounded border border-gray-300 px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button
            class="rounded bg-indigo-700 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-800 cursor-pointer">
            Add
          </button>
        </div>
      </div>
    </a>
  `,
})
export class ProductCardComponent {
  productData = input<Product>();

  get fallbackImage(): string {
    const name = this.productData()?.name ?? 'Not Found';
    const encoded = encodeURIComponent(name);
    return `https://placehold.co/700x800/e0e7ff/FFF?text=${encoded}&font=roboto`;
  }

  get imageAlt(): string {
    const name = this.productData()?.name;
    return name
      ? `Image of the ${name} product`
      : 'Product image not available';
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.fallbackImage;
  }
}
