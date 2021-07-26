import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeOptionsComponent } from './recipe-options.component';

describe('RecipeOptionsComponent', () => {
  let component: RecipeOptionsComponent;
  let fixture: ComponentFixture<RecipeOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
