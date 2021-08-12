import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSnackBarComponent } from './notification-snack-bar.component';

describe('NotificationSnackBarComponent', () => {
  let component: NotificationSnackBarComponent;
  let fixture: ComponentFixture<NotificationSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationSnackBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
