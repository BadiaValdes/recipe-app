import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSnackCreateComponent } from './recipe-snack-create.component';

describe('RecipeSnackCreateComponent', () => {
  let component: RecipeSnackCreateComponent;
  let fixture: ComponentFixture<RecipeSnackCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeSnackCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSnackCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
