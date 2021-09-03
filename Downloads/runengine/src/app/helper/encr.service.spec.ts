import { TestBed, inject } from '@angular/core/testing';

import { EncrService } from './encr.service';

describe('EncrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncrService]
    });
  });

  it('should be created', inject([EncrService], (service: EncrService) => {
    expect(service).toBeTruthy();
  }));
});
