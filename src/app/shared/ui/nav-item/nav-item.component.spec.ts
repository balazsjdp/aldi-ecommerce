import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavItemComponent } from './nav-item.component';
import { provideRouter } from '@angular/router';

describe('NavItemComponent', () => {
  let fixture: ComponentFixture<NavItemComponent>;
  let component: NavItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavItemComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
