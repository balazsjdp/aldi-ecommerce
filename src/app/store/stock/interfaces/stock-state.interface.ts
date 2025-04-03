import Product from '../../../shared/interfaces/product.interface';

export interface StockState {
  products: Product[];
  loading: boolean;
  error: Error | null;
}
