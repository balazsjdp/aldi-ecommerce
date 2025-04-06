import { createAction, props } from '@ngrx/store';
import CartItem from '../../shared/interfaces/cart-item.interface';

/** Adds a specified quantity of an item to the cart */
export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{
    item: CartItem;
    quantity: number;
  }>()
);

/** Removes a specified quantity of an item from the cart by ID */
export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ id: string; quantity: number }>()
);
