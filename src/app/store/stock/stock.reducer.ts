import { createReducer, on } from '@ngrx/store';
import Product from '../../shared/interfaces/product.interface';
import { loadProductsSuccess } from './stock.actions';
import { addToCart } from '../cart/cart.actions';

export const initialState: Product[] = [];

export const stockReducer = createReducer(
  initialState,

  on(loadProductsSuccess, (_, { products }) => [...products]),

  on(addToCart, (state, { item, quantity }) =>
    state.map(p =>
      p.id === item.id
        ? {
            ...p,
            availableAmount: Math.max(p.availableAmount - quantity, 0),
          }
        : p
    )
  )
);
