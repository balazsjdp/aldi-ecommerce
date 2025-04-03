import Product from '../interfaces/product.interface';
import { v4 as uuidv4 } from 'uuid';

export default class ProductUtils {
  /**
   * Generates a new product object by copying the provided product
   * and assigning it a new unique identifier.
   * WHY: The provided api response has an ID duplication. (id: 5)
   *
   * @param {Product} product - The original product object
   * @returns {Product} A new product object with a freshly generated UUID as the `id`.
   */
  public static productWithUid(product: Product) {
    return {
      ...product,
      id: uuidv4(),
    };
  }
}
