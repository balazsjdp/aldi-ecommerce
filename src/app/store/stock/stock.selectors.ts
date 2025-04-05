import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StockState } from './interfaces/stock-state.interface';

export const selectStockState = createFeatureSelector<StockState>('stock');

export const selectStock = createSelector(
  selectStockState,
  state => state.products
);

export const selectStockLoading = createSelector(
  selectStockState,
  state => state.loading
);

export const selectStockError = createSelector(
  selectStockState,
  state => state.error
);

export const selectRemainingAmount = (productId: string) =>
  createSelector(
    selectStockState,
    state =>
      state?.products?.find(p => p.id === productId)?.availableAmount ?? 0
  );
