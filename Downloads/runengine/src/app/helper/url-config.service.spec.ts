import { TestBed, inject } from '@angular/core/testing';

import { UrlConfigService } from './url-config.service';

describe('UrlConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlConfigService]
    });
  });

  it('should be created', inject([UrlConfigService], (service: UrlConfigService) => {
    expect(service).toBeTruthy();
  }));
});
