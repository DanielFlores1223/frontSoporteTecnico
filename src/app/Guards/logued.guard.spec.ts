import { TestBed } from '@angular/core/testing';

import { LoguedGuard } from './logued.guard';

describe('LoguedGuard', () => {
  let guard: LoguedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoguedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
