import { createFeatureSelector, createSelector } from '@ngrx/store';
import Product from '../../shared/interfaces/product.interface';

export const selectStock = createFeatureSelector<Product[]>('stock');

export const selectRemainingAmount = (productId: string) =>
  createSelector(
    selectStock,
    products => products.find(p => p.id === productId)?.availableAmount ?? 0
  );
