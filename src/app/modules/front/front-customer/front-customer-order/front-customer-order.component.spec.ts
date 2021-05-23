import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontCustomerOrderComponent } from './front-customer-order.component';

describe('FrontCustomerOrderComponent', () => {
  let component: FrontCustomerOrderComponent;
  let fixture: ComponentFixture<FrontCustomerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontCustomerOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontCustomerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
