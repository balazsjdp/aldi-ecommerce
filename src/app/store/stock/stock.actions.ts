import { createAction, props } from '@ngrx/store';
import Product from '../../shared/interfaces/product.interface';

/* Loads all products from the API */
export const loadProducts = createAction('[Stock] Load Products');

/** Dispatched when product loading succeeds */
export const loadProductsSuccess = createAction(
  '[Stock] Load Products Success',
  props<{ products: Product[] }>()
);

/** Dispatched when product loading fails */
export const loadProductsFail = createAction(
  '[Stock] Load Products Fail',
  props<{ error: Error }>()
);

/** Decrements stock quantity of a specific product */
export const decrementProductStock = createAction(
  '[Stock] Decrement Product Stock',
  props<{ productId: string; quantity: number }>()
);
