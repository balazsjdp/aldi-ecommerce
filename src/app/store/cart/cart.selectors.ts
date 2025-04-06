import { createFeatureSelector, createSelector } from '@ngrx/store';
import CartItem from '../../shared/interfaces/cart-item.interface';

/** The entire cart state */
export const selectCartItems = createFeatureSelector<CartItem[]>('cart');

/** Selects a single cart item by product ID */
export const selectCartItemById = (productId: string) =>
  createSelector(selectCartItems, items =>
    items?.find(i => i.id === productId)
  );

/** Selects the total quantity of all items in the cart */
export const selectCartTotalQuantity = createSelector(selectCartItems, items =>
  items.reduce((sum, item) => sum + item.quantity!, 0)
);

/** Selects the total price of all items in the cart */
export const selectCartTotalPrice = createSelector(selectCartItems, items =>
  items.reduce((sum, item) => sum + item.quantity! * item.price, 0)
);

/** Selects the number of distinct items in the cart */
export const selectCartItemsDistinctQuantity = createSelector(
  selectCartItems,
  items => new Set(items).size
);
