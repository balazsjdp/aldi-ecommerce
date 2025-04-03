import { createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsFail,
  loadProductsSuccess,
} from './stock.actions';
import { addToCart } from '../cart/cart.actions';
import { StockState } from './interfaces/stock-state.interface';

export const initialState: StockState = {
  products: [],
  loading: false,
  error: null,
};

export const stockReducer = createReducer(
  initialState,

  on(loadProducts, state => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
    error: null,
  })),

  on(loadProductsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(addToCart, (state, { item, quantity }) => ({
    ...state,
    products: state.products.map(p =>
      p.id === item.id
        ? {
            ...p,
            availableAmount: Math.max(p.availableAmount - quantity, 0),
          }
        : p
    ),
    loading: false,
    error: null,
  }))
);
