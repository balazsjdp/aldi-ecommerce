import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadProducts } from '../../store/stock/stock.actions';
import {
  selectStock,
  selectStockLoading,
} from '../../store/stock/stock.selectors';
import { provideToastr } from 'ngx-toastr';
import Product from '../../shared/interfaces/product.interface';
import { selectCartItems } from '../../store/cart/cart.selectors';
import { By } from '@angular/platform-browser';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

describe('ProductListComponent', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let store: MockStore;
  const initialState = {
    stock: {
      products: [],
      loading: false,
    },
  };

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Test Product',
      price: 100,
      img: '',
      availableAmount: 50,
      minOrderAmount: 10,
    },
    {
      id: '1',
      name: 'Test Product',
      price: 100,
      img: '',
      availableAmount: 50,
      minOrderAmount: 10,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, ProductCardComponent],
      providers: [provideMockStore({ initialState }), provideToastr()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;

    store.overrideSelector(selectStock, []);
    store.overrideSelector(selectStockLoading, false);

    store.overrideSelector(selectCartItems, []);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProducts if products are not loaded', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(loadProducts());
  });

  it('should NOT dispatch loadProducts if products ARE loaded', () => {
    store.overrideSelector(selectStock, mockProducts);

    const dispatchSpy = spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should display loading skeleton when productsLoading is true', () => {
    store.overrideSelector(selectStockLoading, true);
    fixture.detectChanges();

    const skeleton = fixture.debugElement.query(By.css('app-product-skeleton'));
    expect(skeleton).toBeTruthy();
  });

  it('should display product cards when products are loaded', () => {
    store.overrideSelector(selectStock, mockProducts);
    store.overrideSelector(selectStockLoading, false);

    fixture = TestBed.createComponent(ProductListComponent);
    fixture.detectChanges();

    const productCards = fixture.debugElement.queryAll(
      By.css('app-product-card')
    );

    expect(productCards.length).toBe(mockProducts.length);
  });

  it('should correctly determine if products are loaded', () => {
    store.overrideSelector(selectStock, mockProducts);

    fixture = TestBed.createComponent(ProductListComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component.productsLoaded).toBeTrue();
  });
});
