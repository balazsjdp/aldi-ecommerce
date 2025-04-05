import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartIndicatorComponent } from './cart-indicator.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectCartItemsDistinctQuantity } from '../../store/cart/cart.selectors';
import { By } from '@angular/platform-browser';
import { IconCartComponent } from '../../shared/ui/icon-cart/icon-cart.component';
import { provideRouter } from '@angular/router';

describe('CartIndicatorComponent', () => {
  let component: CartIndicatorComponent;
  let fixture: ComponentFixture<CartIndicatorComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartIndicatorComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectCartItemsDistinctQuantity,
              value: 3,
            },
          ],
        }),
        provideRouter([]),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CartIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct cart item count', () => {
    const badge = fixture.debugElement.query(By.css('.text-xs')).nativeElement;
    expect(badge.textContent.trim()).toBe('3');
  });

  it('should contain a link to /cart', () => {
    const button = fixture.debugElement.query(
      By.css('button[routerLink="/cart"]')
    );
    expect(button).toBeTruthy();
  });

  it('should display the cart icon', () => {
    const icon = fixture.debugElement.query(By.directive(IconCartComponent));
    expect(icon).toBeTruthy();
  });
});
