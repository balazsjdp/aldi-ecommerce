import { Component, effect, inject, signal } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import Product from '../../shared/interfaces/product.interface';
import { ProductSkeletonComponent } from '../../shared/ui/product-skeleton/product-skeleton.component';
import { delay } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, ProductSkeletonComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  isLoading = signal(true);

  constructor() {
    effect(
      () => {
        this.isLoading.set(true);

        this.productService
          .getProducts()
          .pipe(delay(400)) // Wanted to show the skeletons for a bit, that's why the delay is added
          .subscribe({
            next: data => {
              this.products.set(data);
              this.isLoading.set(false);
            },
            error: err => {
              console.error(
                '[ProductListComponent] - Error fetching products',
                err
              );
              this.isLoading.set(false);
            },
          });
      },
      { allowSignalWrites: true }
    );
  }
}
