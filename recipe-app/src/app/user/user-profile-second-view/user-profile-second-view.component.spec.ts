import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileSecondViewComponent } from './user-profile-second-view.component';

describe('UserProfileSecondViewComponent', () => {
  let component: UserProfileSecondViewComponent;
  let fixture: ComponentFixture<UserProfileSecondViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileSecondViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileSecondViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
