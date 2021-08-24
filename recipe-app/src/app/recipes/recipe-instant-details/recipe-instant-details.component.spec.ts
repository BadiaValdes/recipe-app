import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeInstantDetailsComponent } from './recipe-instant-details.component';

describe('RecipeInstantDetailsComponent', () => {
  let component: RecipeInstantDetailsComponent;
  let fixture: ComponentFixture<RecipeInstantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeInstantDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeInstantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
