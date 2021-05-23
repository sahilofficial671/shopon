import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontLoginComponent } from './front-login.component';

describe('FrontLoginComponent', () => {
  let component: FrontLoginComponent;
  let fixture: ComponentFixture<FrontLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
