import { provideStore } from '@ngrx/store';
import { cartReducer } from './cart/cart.reducer';
import { stockReducer } from './stock/stock.reducer';

export const ShopStore = [
  provideStore({
    cart: cartReducer,
    stock: stockReducer,
  }),
];
