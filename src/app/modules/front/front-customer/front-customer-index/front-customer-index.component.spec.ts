import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontCustomerIndexComponent } from './front-customer-index.component';

describe('FrontCustomerIndexComponent', () => {
  let component: FrontCustomerIndexComponent;
  let fixture: ComponentFixture<FrontCustomerIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontCustomerIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontCustomerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
