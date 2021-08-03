import { TestBed } from '@angular/core/testing';

import { AsyncValServiceService } from './async-val-service.service';

describe('AsyncValServiceService', () => {
  let service: AsyncValServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsyncValServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
