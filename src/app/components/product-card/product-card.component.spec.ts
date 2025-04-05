import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ToastrService } from 'ngx-toastr';
import { HufPipe } from '../../shared/pipes/huf/huf.pipe';
import { ProductFallbackImageDirective } from '../../shared/directives/product-fallback-image.directive';
import Product from '../../shared/interfaces/product.interface';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let mockStore: MockStore;
  let mockToastr: jasmine.SpyObj<ToastrService>;

  const productMock: Product = {
    id: 'p1',
    name: 'Test Product',
    price: 1000,
    img: 'test.jpg',
    minOrderAmount: 2,
    availableAmount: 0,
  };

  const initialState = {
    stock: {
      stock: { p1: 10 },
    },
    cart: {
      items: {
        p1: { product: productMock, quantity: 1 },
      },
    },
  };

  beforeEach(async () => {
    mockToastr = jasmine.createSpyObj('ToastrService', ['info']);

    await TestBed.configureTestingModule({
      imports: [ProductCardComponent, HufPipe, ProductFallbackImageDirective],
      providers: [
        provideMockStore({ initialState }),
        { provide: ToastrService, useValue: mockToastr },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);

    fixture.componentRef.setInput('productData', productMock);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize quantity with minOrderAmount', () => {
    expect(component.quantity()).toBe(2);
  });

  it('should handle quantity input below minOrderAmount', () => {
    const input = new Event('input');
    const inputElement = document.createElement('input');
    inputElement.value = '1'; // less than minOrderAmount (2)
    Object.defineProperty(input, 'target', { value: inputElement });

    component.onQuantityInput(input);
    expect(component.quantity()).toBe(2);
  });

  it('should not dispatch addToCart if quantity <= 0', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.quantity.set(0);
    component.handleAddToCart();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
