import { Component, effect, inject, signal } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { ProductSkeletonComponent } from '../../shared/ui/product-skeleton/product-skeleton.component';
import { delay } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadProductsSuccess } from '../../store/stock/stock.actions';
import { selectStock } from '../../store/stock/stock.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, ProductSkeletonComponent, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private _productService = inject(ProductService);
  private _store = inject(Store);

  products$ = this._store.select(selectStock);
  isLoading = signal(true);

  constructor() {
    effect(
      () => {
        this.isLoading.set(true);

        this._productService
          .getProducts()
          .pipe(delay(400)) // Wanted to show the skeletons for a bit, that's why the delay is added
          .subscribe({
            next: data => {
              this._store.dispatch(loadProductsSuccess({ products: data }));
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
