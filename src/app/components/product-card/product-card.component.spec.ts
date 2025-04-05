import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { provideStore } from '@ngrx/store';
import CartItem from '../../shared/interfaces/cart-item.interface';
import { stockReducer } from '../../store/stock/stock.reducer';

const mockItem: CartItem = {
  id: 'abc123',
  name: 'Test Product',
  img: 'https://via.placeholder.com/100',
  price: 500,
  quantity: 2,
};

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [
        provideStore({
          stock: stockReducer,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('productData', mockItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
