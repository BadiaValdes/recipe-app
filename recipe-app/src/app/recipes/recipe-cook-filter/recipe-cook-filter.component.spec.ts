import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCookFilterComponent } from './recipe-cook-filter.component';

describe('RecipeCookFilterComponent', () => {
  let component: RecipeCookFilterComponent;
  let fixture: ComponentFixture<RecipeCookFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeCookFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCookFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
