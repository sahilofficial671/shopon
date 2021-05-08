import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontIndexComponent } from './front-index.component';

describe('FrontIndexComponent', () => {
  let component: FrontIndexComponent;
  let fixture: ComponentFixture<FrontIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
