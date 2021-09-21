import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCardViewComponent } from './mini-card-view.component';

describe('MiniCardViewComponent', () => {
  let component: MiniCardViewComponent;
  let fixture: ComponentFixture<MiniCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniCardViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
