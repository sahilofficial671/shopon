import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontCategoryDetailComponent } from './front-category-detail.component';

describe('FrontCategoryDetailComponent', () => {
  let component: FrontCategoryDetailComponent;
  let fixture: ComponentFixture<FrontCategoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontCategoryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
