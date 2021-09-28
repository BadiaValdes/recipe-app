import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBackgroundImageUpdateComponent } from './user-background-image-update.component';

describe('UserBackgroundImageUpdateComponent', () => {
  let component: UserBackgroundImageUpdateComponent;
  let fixture: ComponentFixture<UserBackgroundImageUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBackgroundImageUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBackgroundImageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
