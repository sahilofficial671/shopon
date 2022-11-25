import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontProductCardComponent } from './front-product-card.component';

describe('FrontProductCardComponent', () => {
  let component: FrontProductCardComponent;
  let fixture: ComponentFixture<FrontProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontProductCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
