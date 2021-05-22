import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontProductSliderComponent } from './front-product-slider.component';

describe('FrontProductSliderComponent', () => {
  let component: FrontProductSliderComponent;
  let fixture: ComponentFixture<FrontProductSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontProductSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontProductSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
