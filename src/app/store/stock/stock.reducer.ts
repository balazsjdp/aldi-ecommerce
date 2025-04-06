import { createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsFail,
  loadProductsSuccess,
} from './stock.actions';
import { addToCart, removeFromCart } from '../cart/cart.actions';
import { StockState } from './interfaces/stock-state.interface';

/** Initial stock state */
export const initialState: StockState = {
  products: [],
  loading: false,
  error: null,
};

/** The reducer to manage stock state (product list, loading, error, stock amounts) */
export const stockReducer = createReducer(
  initialState,

  // Set loading state when fetching products
  on(loadProducts, state => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Set products when fetching is successful
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
    error: null,
  })),

  // Set error when fetching fails
  on(loadProductsFail, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update stock amounts when items are added to the cart
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
  })),

  // Update stock amounts when items are removed from the cart
  on(removeFromCart, (state, { id, quantity }) => ({
    ...state,
    products: state.products.map(p =>
      p.id === id
        ? {
            ...p,
            availableAmount: p.availableAmount + quantity,
          }
        : p
    ),
  }))
);
