import { TestBed } from '@angular/core/testing';

import { OpenSheetService } from './open-sheet.service';

describe('OpenSheetService', () => {
  let service: OpenSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
