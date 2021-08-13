import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSheetComponent } from './open-sheet.component';

describe('OpenSheetComponent', () => {
  let component: OpenSheetComponent;
  let fixture: ComponentFixture<OpenSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
