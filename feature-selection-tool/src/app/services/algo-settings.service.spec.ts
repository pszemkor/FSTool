import { TestBed } from '@angular/core/testing';

import { AlgoSettingsService } from './algo-settings.service';

describe('AlgoSettingsService', () => {
  let service: AlgoSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgoSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
