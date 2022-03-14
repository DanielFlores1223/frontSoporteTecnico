import { TestBed } from '@angular/core/testing';

import { BusinessUnitService } from './business-unit.service';

describe('BusinessUnitService', () => {
  let service: BusinessUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
