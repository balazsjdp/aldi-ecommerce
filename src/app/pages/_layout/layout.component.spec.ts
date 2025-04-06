/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { provideStore } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { NavItemComponent } from '../../shared/ui/nav-item/nav-item.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let routerEvents$: Subject<any>;
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    routerEvents$ = new Subject();

    mockRouter = {
      events: routerEvents$.asObservable(),
      url: '/products',
      createUrlTree: jasmine
        .createSpy('createUrlTree')
        .and.callFake((commands: any[]) => commands),
      serializeUrl: jasmine
        .createSpy('serializeUrl')
        .and.callFake((url: any) => url.toString()),
    };

    const mockActivatedRoute = {
      snapshot: {
        data: {},
        params: {},
        queryParams: {},
        fragment: '',
        url: [],
      },
    };

    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [
        provideStore(),
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update pageTitle when route changes to a matching navigation item', () => {
    routerEvents$.next(new NavigationEnd(1, '/products', '/products'));
    fixture.detectChanges();
    expect(component.pageTitle()).toBe('Products');

    Object.defineProperty(mockRouter, 'url', { get: () => '/cart' });
    routerEvents$.next(new NavigationEnd(2, '/cart', '/cart'));
    fixture.detectChanges();
    expect(component.pageTitle()).toBe('Cart');
  });

  it('should set pageTitle to NOT_FOUND when route does not match any navigation item', () => {
    Object.defineProperty(mockRouter, 'url', { get: () => '/unknown' });
    routerEvents$.next(new NavigationEnd(3, '/unknown', '/unknown'));
    fixture.detectChanges();
    expect(component.pageTitle()).toBe('Not Found');
  });

  it('should initialize navigationItems correctly', () => {
    expect(component.navigationItems).toEqual([
      { label: 'Products', routerLink: '/products' },
      { label: 'Cart', routerLink: '/cart' },
    ]);
  });

  it('should render navigation items in the template', () => {
    const navItems = fixture.debugElement.queryAll(
      By.directive(NavItemComponent)
    );
    expect(navItems.length).toBe(component.navigationItems.length);

    navItems.forEach((item, index) => {
      const navItemComponent = item.componentInstance as NavItemComponent;
      expect(navItemComponent.routerLink).toBe(
        component.navigationItems[index].routerLink
      );
      expect(navItemComponent.label).toBe(
        component.navigationItems[index].label
      );
    });
  });

  it('should display page title in the template', () => {
    routerEvents$.next(new NavigationEnd(1, '/products', '/products'));
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent).toContain('Products');
  });

  it('should display "Not Found" in the template when navigating to /asd route', () => {
    Object.defineProperty(mockRouter, 'url', { get: () => '/asd' });
    routerEvents$.next(new NavigationEnd(4, '/asd', '/asd'));
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent).toContain('Not Found');
  });
});
