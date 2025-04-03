import { Component } from '@angular/core';

@Component({
  selector: 'app-product-skeleton',
  standalone: true,
  imports: [],
  template: `
    <div class="animate-pulse">
      <div
        class="aspect-square w-full rounded-lg bg-gray-200 xl:aspect-[7/8]"></div>
      <div class="mt-4 h-4 w-3/4 rounded bg-gray-300"></div>
      <div class="mt-2 h-6 w-full rounded bg-gray-400"></div>
    </div>
  `,
})
export class ProductSkeletonComponent {}
