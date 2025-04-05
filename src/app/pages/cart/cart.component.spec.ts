import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from '../../store/cart/cart.selectors';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [provideMockStore(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    store.overrideSelector(selectCartItems, []);
    store.overrideSelector(selectCartTotalPrice, 0);
  });

  it('should initialize cartItemQuantity with the value from selectCartTotalQuantity', () => {
    store.overrideSelector(selectCartTotalQuantity, 5);
    fixture.detectChanges();

    expect(component.cartItemQuantity()).toBe(5);
  });

  it('should display CartEmptyComponent when cart is empty', () => {
    store.overrideSelector(selectCartTotalQuantity, 0);
    fixture.detectChanges();

    const emptyComponent = fixture.debugElement.query(By.css('app-cart-empty'));
    const contentComponent = fixture.debugElement.query(
      By.css('app-cart-content')
    );

    expect(emptyComponent).toBeTruthy();
    expect(contentComponent).toBeFalsy();
  });

  it('should display CartContentComponent when cart has items', () => {
    store.overrideSelector(selectCartTotalQuantity, 3);
    fixture.detectChanges();

    const emptyComponent = fixture.debugElement.query(By.css('app-cart-empty'));
    const contentComponent = fixture.debugElement.query(
      By.css('app-cart-content')
    );

    expect(contentComponent).toBeTruthy();
    expect(emptyComponent).toBeFalsy();
  });
});
