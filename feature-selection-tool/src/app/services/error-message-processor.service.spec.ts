import { TestBed } from '@angular/core/testing';

import { ErrorMessageProcessorService } from './error-message-processor.service';

describe('ErrorMessageProcessorService', () => {
  let service: ErrorMessageProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMessageProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
