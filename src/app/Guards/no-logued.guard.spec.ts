import { TestBed } from '@angular/core/testing';

import { NoLoguedGuard } from './no-logued.guard';

describe('NoLoguedGuard', () => {
  let guard: NoLoguedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoLoguedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
