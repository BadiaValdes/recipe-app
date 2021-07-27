import { TestBed } from '@angular/core/testing';

import { GeneralApiServicesService } from './general-api-services.service';

describe('GeneralApiServicesService', () => {
  let service: GeneralApiServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralApiServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
