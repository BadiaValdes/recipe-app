import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeModifyComponent } from './recipe-modify.component';

describe('RecipeModifyComponent', () => {
  let component: RecipeModifyComponent;
  let fixture: ComponentFixture<RecipeModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
