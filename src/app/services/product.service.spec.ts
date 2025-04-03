import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import Product from '../shared/interfaces/product.interface';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
    providers: [ProductService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(
      'https://63c10327716562671870f959.mockapi.io/products'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts); // Respond with mock data
  });

  it('should fetch a product by ID', () => {
    const mockProduct = mockProducts[0];

    service.getProductById('1').subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(
      'https://63c10327716562671870f959.mockapi.io/products/1'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });
});
