import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavItemComponent } from './nav-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavItemComponent', () => {
  let component: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NavItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavItemComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label input correctly', () => {
    component.label = 'Home';
    component.routerLink = '/home';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(labelElement.textContent).toContain('Home');
  });

  it('should bind the routerLink input correctly', () => {
    component.label = 'Home';
    component.routerLink = '/home';
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('a')).attributes[
      'ng-reflect-router-link'
    ];
    expect(linkElement).toBe('/home');
  });

  it('should use the default label when no label is provided', () => {
    component.routerLink = '/unknown';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(labelElement.textContent).toContain('UNKNOWN_ROUTE');
  });
});
