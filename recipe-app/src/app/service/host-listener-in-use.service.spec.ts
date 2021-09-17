import { TestBed } from '@angular/core/testing';

import { HostListenerInUseService } from './host-listener-in-use.service';

describe('HostListenerInUseService', () => {
  let service: HostListenerInUseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostListenerInUseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
