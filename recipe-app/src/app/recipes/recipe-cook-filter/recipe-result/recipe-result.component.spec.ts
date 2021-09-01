import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeResultComponent } from './recipe-result.component';

describe('RecipeResultComponent', () => {
  let component: RecipeResultComponent;
  let fixture: ComponentFixture<RecipeResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
