import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services/product.service';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFail,
} from './stock.actions';
import {
  catchError,
  delay,
  map,
  of,
  switchMap,
  withLatestFrom,
  filter,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectStock } from './stock.selectors';

@Injectable()
export class StockEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      withLatestFrom(this.store.select(selectStock)),
      filter(([, stock]) => !stock || stock.length === 0), // Load the products into the store only when they're not yet loaded
      switchMap(() =>
        this.productService.getProducts().pipe(
          delay(800), // Wanted to show the skeletons a bit, so added a delay :)
          map(products => loadProductsSuccess({ products })),
          catchError(error => of(loadProductsFail({ error })))
        )
      )
    )
  );
}
