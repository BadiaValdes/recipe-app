import { TestBed } from '@angular/core/testing';

import { NotificationSnackBarService } from './notification-snack-bar.service';

describe('NotificationSnackBarService', () => {
  let service: NotificationSnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationSnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
