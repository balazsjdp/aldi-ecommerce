import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductSkeletonComponent } from '../../shared/ui/product-skeleton/product-skeleton.component';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../store/stock/stock.actions';
import {
  selectStock,
  selectStockLoading,
} from '../../store/stock/stock.selectors';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, ProductSkeletonComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private _store = inject(Store);

  productsLoading = this._store.selectSignal(selectStockLoading);
  products = this._store.selectSignal(selectStock);

  constructor() {
    if (!this.productsLoaded) {
      this._store.dispatch(loadProducts());
    }
  }

  get productsLoaded() {
    return this.products().length > 0;
  }
}
