import { TestBed } from '@angular/core/testing';

import { ActivitiesCalculationsService } from './activities-calculations.service';

describe('ActivitiesCalculationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivitiesCalculationsService = TestBed.get(ActivitiesCalculationsService);
    expect(service).toBeTruthy();
  });
});
