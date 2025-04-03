import { createFeatureSelector, createSelector } from '@ngrx/store';
import CartItem from '../../shared/interfaces/cart-item.interface';

export const selectCartItems = createFeatureSelector<CartItem[]>('cart');

export const selectTotalQuantity = createSelector(selectCartItems, items =>
  items.reduce((sum, item) => sum + item.quantity!, 0)
);

export const selectTotalPrice = createSelector(selectCartItems, items =>
  items.reduce((sum, item) => sum + item.quantity! * item.price, 0)
);
