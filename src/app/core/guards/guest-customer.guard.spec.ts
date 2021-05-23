import { TestBed } from '@angular/core/testing';

import { GuestCustomerGuard } from './guest-customer.guard';

describe('GuestCustomerGuard', () => {
  let guard: GuestCustomerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuestCustomerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
