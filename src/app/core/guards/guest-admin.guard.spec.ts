import { TestBed } from '@angular/core/testing';

import { GuestAdminGuard } from './guest-admin.guard';

describe('GuestAdminGuard', () => {
  let guard: GuestAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuestAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
