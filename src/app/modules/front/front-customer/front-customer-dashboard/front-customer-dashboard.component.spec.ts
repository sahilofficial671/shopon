import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontCustomerDashboardComponent } from './front-customer-dashboard.component';

describe('FrontCustomerDashboardComponent', () => {
  let component: FrontCustomerDashboardComponent;
  let fixture: ComponentFixture<FrontCustomerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontCustomerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontCustomerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
