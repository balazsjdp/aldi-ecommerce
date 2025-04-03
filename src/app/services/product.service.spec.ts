import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import Product from '../shared/interfaces/product.interface';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Orange',
      price: 100,
      minOrderAmount: 1,
      img: '',
      availableAmount: 10,
    },
    {
      id: '2',
      name: 'Smartwatch',
      price: 29990,
      minOrderAmount: 1,
      img: '',
      availableAmount: 25,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ProductService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch list of products', () => {
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
  
      // Compare only fields that are static
      expect(products[0].name).toBe(mockProducts[0].name);
      expect(products[0].price).toBe(mockProducts[0].price);
      expect(products[0].availableAmount).toBe(mockProducts[0].availableAmount);
  
      expect(products[1].name).toBe(mockProducts[1].name);
      expect(products[1].price).toBe(mockProducts[1].price);
      expect(products[1].availableAmount).toBe(mockProducts[1].availableAmount);
    });
  
    const req = httpMock.expectOne(
      'https://63c10327716562671870f959.mockapi.io/products'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);  
  });
});
