import { createFeatureSelector, createSelector } from '@ngrx/store';
import CartItem from '../../shared/interfaces/cart-item.interface';

export const selectCartItems = createFeatureSelector<CartItem[]>('cart');

export const selectCartItemById = (productId: string) =>
  createSelector(selectCartItems, items => items.find(i => i.id === productId));

export const selectCartTotalQuantity = createSelector(selectCartItems, items =>
  items.reduce((sum, item) => sum + item.quantity!, 0)
);

export const selectCartTotalPrice = createSelector(selectCartItems, items =>
  items.reduce((sum, item) => sum + item.quantity! * item.price, 0)
);

export const selectCartItemsDistinctQuantity = createSelector(
  selectCartItems,
  items => new Set(items).size
);
