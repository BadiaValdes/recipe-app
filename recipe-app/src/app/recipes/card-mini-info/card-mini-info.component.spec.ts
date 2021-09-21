import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMiniInfoComponent } from './card-mini-info.component';

describe('CardMiniInfoComponent', () => {
  let component: CardMiniInfoComponent;
  let fixture: ComponentFixture<CardMiniInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMiniInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMiniInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
