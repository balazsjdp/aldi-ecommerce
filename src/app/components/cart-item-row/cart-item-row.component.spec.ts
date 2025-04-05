import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemRowComponent } from './cart-item-row.component';
import CartItem from '../../shared/interfaces/cart-item.interface';

describe('CartItemRowComponent', () => {
  let component: CartItemRowComponent;
  let fixture: ComponentFixture<CartItemRowComponent>;

  const mockItem: CartItem = {
    id: 'abc123',
    name: 'Test Product',
    img: 'https://via.placeholder.com/100',
    price: 500,
    quantity: 2,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemRowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', mockItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct subtotal', () => {
    expect(component.itemSubTotal()).toBe(1000); // 500 * 2
  });
});
