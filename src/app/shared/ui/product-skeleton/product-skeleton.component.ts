import { Component } from '@angular/core';

/**
 * ProductSkeletonComponent displays a skeleton UI placeholder while product data is loading.
 * It provides a visual cue to users that content is being loaded, using animated gray boxes
 * to mimic the layout of a product card.
 */
@Component({
  selector: 'app-product-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './product-skeleton.component.html',
})
export class ProductSkeletonComponent {}
