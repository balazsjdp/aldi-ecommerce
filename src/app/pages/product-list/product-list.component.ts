import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductSkeletonComponent } from '../../shared/ui/product-skeleton/product-skeleton.component';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../store/stock/stock.actions';
import {
  selectStock,
  selectStockLoading,
} from '../../store/stock/stock.selectors';
import { OutOfStockOverlayDirective } from '../../shared/directives/out-of-stock-overlay.directive';

/**
 * ProductListComponent displays a grid of product cards, (or loading skeletons if data is being loaded).
 * It automatically dispatches an action to load products if they haven't been fetched already.
 */
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    ProductSkeletonComponent,
    OutOfStockOverlayDirective,
  ],
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  private _store = inject(Store);

  productsLoading = this._store.selectSignal(selectStockLoading);
  products = this._store.selectSignal(selectStock);

  constructor() {
    // Load the products from the API if they're not yet loaded
    if (!this.productsLoaded) {
      this._store.dispatch(loadProducts());
    }
  }

  // Getter to determine wether the products are already loaded
  get productsLoaded() {
    return this.products().length > 0;
  }
}
