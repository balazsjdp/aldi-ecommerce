import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import Product from '../shared/interfaces/product.interface';
import ProductUtils from '../shared/utils/product.utils';

/**
 * ProductService handles the HTTP interactions related to product data.
 * It communicates with a mock API to fetch the product list
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _http = inject(HttpClient);
  private readonly apiUrl =
    'https://63c10327716562671870f959.mockapi.io/products';

  /**
   * Fetches the list of all products from the API.
   * The result is transformed using a utility function to ensure each product has a unique ID,
   * due to the API returning duplicated IDs.
   *
   * @returns {Observable<Product[]>} - A stream of products with corrected unique IDs.
   */
  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.apiUrl).pipe(
      map(
        (products: Product[]) =>
          products.map((p: Product) => ProductUtils.productWithUid(p)) // The provided API has an ID duplication. Here I assign new unique ids for each product
      )
    );
  }
}
