import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
  NgControl,
  FormArray,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

// API
import { GeneralApiServicesService } from '../../../service/general-api-services.service';
import {RecipeService} from '../../../service/recipe.service'
import { Recipe } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-cook-form',
  templateUrl: './cook-form.component.html',
  styleUrls: ['./cook-form.component.css'],
})
export class CookFormComponent implements OnInit, AfterViewInit {
  products: any[];

  selected_products?: any[] = [];

  ingredient_form = new FormGroup({
    ingredients: this.formB.array([], { updateOn: 'submit' }),
  });

  recipe :Recipe[];

  @Output() data = new EventEmitter<Recipe[]>();

  constructor(
    private formB: FormBuilder,
    private _generalApi: GeneralApiServicesService,
    private _recipeApi: RecipeService,
  ) {}

  ngOnInit(): void {
    this._generalApi.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  ingredients(): FormArray {
    return this.ingredient_form.get('ingredients') as FormArray;
  }

  // Find repeating ingredients
 /*  noRepeatIngredient(): ValidatorFn {
    return (control: AbstractControl) => {
      let existe: boolean = false;
      if (this.selected_products.length > 0) {
        this.selected_products.forEach((d) => {
          if (d === control.value) existe = true;
        });
      }

      console.log(this.ingredient_form.get('ingredients').value);

      if (!existe && control.value != null) {
        this.selectionChange(control.value);
        console.log('No existe');
        return null;
      } else {
        console.log('existe');
        return { wrong: 'jj' };
      }
    };
  } */

  // Create the new ingredientes without values
  newIngredients(): FormGroup {
    return this.formB.group({
      product: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'change',
      }),
    });
  }

  // Add blank ingredient
  adicionarIngrediente() {
    this.ingredients().push(this.newIngredients());
  }

  // Remove ingredient from list
  removeIngredient(i: number) {
    this.ingredients().removeAt(i);
    this.deleteElement(i);
  }

  selectionChange(data) {
    this.selected_products.push(data);
  }

  deleteElement(i: number) {
    this.selected_products = this.selected_products?.filter((_, index) => {
      return index != i;
    });
  }


  submit(){
    this._recipeApi.getSearchFor(JSON.stringify(this.ingredient_form.get("ingredients")?.value)).toPromise().then(data => {this.recipe = data}).then(_ => {
      this.data.emit(this.recipe);
    })
/*     .subscribe((data:Recipe[]) => {
      this.recipe = data;
      console.log(this.recipe)
    }) */
  }
}
