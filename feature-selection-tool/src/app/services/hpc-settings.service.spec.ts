import { TestBed } from '@angular/core/testing';

import { HPCSettingsService } from './hpc-settings.service';

describe('HPCSettingsService', () => {
  let service: HPCSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HPCSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
