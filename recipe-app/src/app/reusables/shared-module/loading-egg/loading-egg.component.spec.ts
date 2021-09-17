import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingEggComponent } from './loading-egg.component';

describe('LoadingEggComponent', () => {
  let component: LoadingEggComponent;
  let fixture: ComponentFixture<LoadingEggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingEggComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingEggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
