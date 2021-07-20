import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDescriptionComponent } from './recipe-description.component';

describe('RecipeDescriptionComponent', () => {
  let component: RecipeDescriptionComponent;
  let fixture: ComponentFixture<RecipeDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
