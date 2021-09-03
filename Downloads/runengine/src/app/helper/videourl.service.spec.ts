import { TestBed } from '@angular/core/testing';

import { VideourlService } from './videourl.service';

describe('VideourlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideourlService = TestBed.get(VideourlService);
    expect(service).toBeTruthy();
  });
});
