import { createReducer, on } from '@ngrx/store';
import CartItem from '../../shared/interfaces/cart-item.interface';
import { addToCart, removeFromCart } from './cart.actions';

/** Initial state: empty cart */
export const initialState: CartItem[] = [];

/** Handles adding and removing items from the cart */
export const cartReducer = createReducer(
  initialState,

  // If the item exists in the cart, increase its quantity. Otherwise, add it to the cart
  on(addToCart, (state, { item, quantity }) => {
    const existing = state.find(i => i.id === item.id);
    const updatedItems = existing
      ? state.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity! + quantity } : i
        )
      : [...state, { ...item, quantity }];

    return updatedItems;
  }),

  // Remove an item from the cart by its ID
  on(removeFromCart, (state, { id }) => state.filter(i => i.id !== id))
);
