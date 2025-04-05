import ProductUtils from './product.utils';
import Product from '../interfaces/product.interface';
import { validate as isUuid } from 'uuid';

describe('ProductUtils', () => {
  it('should return a product with the same properties except for a new unique id', () => {
    const originalProduct: Product = {
      id: '1',
      name: 'Test Product',
      price: 100,
      img: '',
      availableAmount: 50,
      minOrderAmount: 10,
    };

    const newProduct = ProductUtils.productWithUid(originalProduct);

    expect(newProduct).toEqual({
      ...originalProduct,
      id: newProduct.id,
    });

    // Verify the new id is a valid UUID
    expect(isUuid(newProduct.id)).toBe(true);

    // Verify the id is different from the original product's id
    expect(newProduct.id).not.toBe(originalProduct.id);
  });
});
