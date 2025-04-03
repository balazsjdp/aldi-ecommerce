import { createAction, props } from '@ngrx/store';
import CartItem from '../../shared/interfaces/cart-item.interface';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{
    item: CartItem;
    quantity: number;
  }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ id: string }>()
);
