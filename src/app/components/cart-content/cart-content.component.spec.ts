import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartContentComponent } from './cart-content.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  selectCartItems,
  selectCartTotalPrice,
} from '../../store/cart/cart.selectors';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import CartItem from '../../shared/interfaces/cart-item.interface';
import { provideRouter } from '@angular/router';

@Component({
  selector: 'app-cart-item-row',
  standalone: true,
  template: '<div>{{ item?.name }}</div>',
})
class MockCartItemRowComponent {
  @Input() item: unknown;
}

describe('CartContentComponent', () => {
  let component: CartContentComponent;
  let fixture: ComponentFixture<CartContentComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartContentComponent, MockCartItemRowComponent], // Move MockCartItemRowComponent to imports
      providers: [provideMockStore(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CartContentComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize cartItems with the value from selectCartItems', () => {
    const mockCartItems: CartItem[] = [
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        quantity: 2,
        img: '',
      },
      {
        id: '2',
        name: 'Product 2',
        price: 200,
        quantity: 1,
        img: '',
      },
    ];
    store.overrideSelector(selectCartItems, mockCartItems);
    store.overrideSelector(selectCartTotalPrice, 0);
    fixture.detectChanges();

    expect(component.cartItems()).toEqual(mockCartItems);
  });

  it('should initialize cartSubTotal with the value from selectCartTotalPrice', () => {
    store.overrideSelector(selectCartTotalPrice, 500);
    fixture.detectChanges();

    expect(component.cartSubTotal()).toBe(500);
  });

  it('should render a CartItemRowComponent for each cart item', () => {
    const mockCartItems: CartItem[] = [
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        quantity: 2,
        img: '',
      },
      {
        id: '2',
        name: 'Product 2',
        price: 200,
        quantity: 1,
        img: '',
      },
    ];
    store.overrideSelector(selectCartItems, mockCartItems);
    fixture.detectChanges();

    const cartItemRows = fixture.debugElement.queryAll(
      By.css('app-cart-item-row')
    );
    expect(cartItemRows.length).toBe(mockCartItems.length);
  });
});
