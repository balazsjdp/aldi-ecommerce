import { createAction, props } from '@ngrx/store';
import Product from '../../shared/interfaces/product.interface';

export const loadProducts = createAction('[Stock] Load Products');

export const loadProductsSuccess = createAction(
  '[Stock] Load Products Success',
  props<{ products: Product[] }>()
);

export const decrementProductStock = createAction(
  '[Stock] Decrement Product Stock',
  props<{ productId: string; quantity: number }>()
);
