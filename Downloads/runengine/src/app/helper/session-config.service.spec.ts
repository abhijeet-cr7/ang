import { TestBed, inject } from '@angular/core/testing';

import { SessionConfigService } from './session-config.service';

describe('SessionConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionConfigService]
    });
  });

  it('should be created', inject([SessionConfigService], (service: SessionConfigService) => {
    expect(service).toBeTruthy();
  }));
});
