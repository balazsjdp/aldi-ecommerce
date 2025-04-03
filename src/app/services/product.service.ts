import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import Product from '../shared/interfaces/product.interface';
import ProductUtils from '../shared/utils/product.utils';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl =
    'https://63c10327716562671870f959.mockapi.io/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiUrl)
      .pipe(
        map((products: Product[]) =>
          products.map((p: Product) => ProductUtils.productWithUid(p))
        )
      );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
