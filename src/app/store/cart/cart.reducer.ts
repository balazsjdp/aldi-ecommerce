import { createReducer, on } from '@ngrx/store';
import CartItem from '../../shared/interfaces/cart-item.interface';
import { addToCart, removeFromCart } from './cart.actions';

export const initialState: CartItem[] = [];

export const cartReducer = createReducer(
  initialState,

  on(addToCart, (state, { item, quantity }) => {
    const existing = state.find(i => i.id === item.id);
    console.log(existing)
    const updatedItems = existing
      ? state.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity! + quantity } : i
        )
      : [...state, { ...item, quantity }];

    return updatedItems;
  }),

  on(removeFromCart, (state, { id }) => state.filter(i => i.id !== id))
);
