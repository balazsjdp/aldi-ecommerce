import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StockState } from './interfaces/stock-state.interface';

/** The entire stock state */
export const selectStockState = createFeatureSelector<StockState>('stock');

/** Selects the list of all products from stock */
export const selectStock = createSelector(
  selectStockState,
  state => state.products
);

/** Selects the loading status of the stock feature */
export const selectStockLoading = createSelector(
  selectStockState,
  state => state.loading
);

/** Selects the error (if there are any) from the stock feature */
export const selectStockError = createSelector(
  selectStockState,
  state => state.error
);

/** Selects the available amount for a specific product by ID */
export const selectRemainingAmount = (productId: string) =>
  createSelector(
    selectStockState,
    state =>
      state?.products?.find(p => p.id === productId)?.availableAmount ?? 0
  );
