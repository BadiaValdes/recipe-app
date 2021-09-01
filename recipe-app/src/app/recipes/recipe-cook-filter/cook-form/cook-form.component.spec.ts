import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookFormComponent } from './cook-form.component';

describe('CookFormComponent', () => {
  let component: CookFormComponent;
  let fixture: ComponentFixture<CookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
