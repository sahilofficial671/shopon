import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontProductSpecialComponent } from './front-product-special.component';

describe('FrontProductSpecialComponent', () => {
  let component: FrontProductSpecialComponent;
  let fixture: ComponentFixture<FrontProductSpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontProductSpecialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontProductSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
