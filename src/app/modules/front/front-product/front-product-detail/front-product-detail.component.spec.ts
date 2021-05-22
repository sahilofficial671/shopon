import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontProductDetailComponent } from './front-product-detail.component';

describe('FrontProductDetailComponent', () => {
  let component: FrontProductDetailComponent;
  let fixture: ComponentFixture<FrontProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontProductDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
