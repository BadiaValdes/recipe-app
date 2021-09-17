import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';

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
import { RecipeService } from '../../../service/recipe.service';
import { Recipe } from 'src/app/interfaces/recipe';
import { Observable } from 'rxjs';

// Stepper Options
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper' // Import the CDK

@Component({
  selector: 'app-cook-form',
  templateUrl: './cook-form.component.html',
  styleUrls: ['./cook-form.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false,
    }
  }],
})
export class CookFormComponent implements OnInit, AfterViewInit {
  products: any[]; // store the products http call
  dificultad: any[]; // store the difficult http call

  selected_products?: any[] = []; // OLD -> Create an array of the selected products

  // FORM VAR DECLARATION
  ingredient_form = new FormGroup({
    ingredients: this.formB.array([]),
  });

  difficulty_form = new FormGroup({
    difficult: new FormControl('', [Validators.required]),
  });

  precision_form = new FormGroup({
    precision: new FormControl(0, [Validators.required]),
  });

  // END FORM VAR DECLARATION

  slideValue = 0; // The value of the how many ingredients I really need
  slideDificultyValue = 0; // The value of the how many ingredients I really need

  recipe: Recipe[]; // Thre result of the filter proccess

  ingredientProductCounter : number = 0;

  // Observable
  productFilterOption : Observable<any[]>;

  @Output() data = new EventEmitter<Recipe[]>(); // Send the collected recipes

  constructor(
    private formB: FormBuilder,
    private _generalApi: GeneralApiServicesService,
    private _recipeApi: RecipeService
  ) {}

  ngOnInit(): void {
    this.formVariableInit();
    this.adicionarIngrediente();
  }

  // Populate the products and dificultad vars.
  formVariableInit() {
    this._generalApi.getProducts().subscribe((data) => {
      this.products = data;
    });

    this._generalApi.getDifficulty().subscribe((data) => {
      this.dificultad = data;
      console.log(this.dificultad);
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  // Get the for ingredient array
  ingredients(): FormArray {
    return this.ingredient_form.get('ingredients') as FormArray;
  }

  // at least one ingredient

  noRepeatIngredient(): ValidatorFn {
    return (control: AbstractControl) => {
        let isItRepeated = false;
        isItRepeated =this.ingredient_form.get('ingredients')?.value.find((element) => {
          return element.product === control.value;
        })        
        return isItRepeated && control ? {repeated : {value:'true'}} : null ;
      }
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
    this.ingredientProductCounter ++;
    return this.formB.group({
      product: new FormControl(null, {
        validators: [ this.noRepeatIngredient()],

      }),
    });
  }

  // Add blank ingredient
  adicionarIngrediente() {
    this.ingredients().push(this.newIngredients());
  }

  // Remove ingredient from list
  removeIngredient(i: number) {
    this.ingredientProductCounter --;
    this.ingredients().removeAt(i);
    this.deleteElement(i);
  }

  // OLD -> Get the selected option
  selectionChange(data) {
    this.selected_products.push(data);
  }

  // Delete a product option
  deleteElement(i: number) {
    this.selected_products = this.selected_products?.filter((_, index) => {
      return index != i;
    });
  }

  // Submit all the data
  submit() {
    let dificultAfterSildeValue = this.dificultyIDAfterSlideValue(this.slideDificultyValue)
    console.log(this.ingredient_form.get('ingredients')?.value[0]['product'].id)
    this._recipeApi
      .getSearchFor(
        JSON.stringify(this.ingredient_form.get('ingredients')?.value),
        dificultAfterSildeValue,
        this.slideValue,
      )
      .toPromise()
      .then((data) => {
        this.recipe = data;
      })
      .then((_) => {
        this.data.emit(this.recipe);
      });
    /*     .subscribe((data:Recipe[]) => {
      this.recipe = data;
      console.log(this.recipe)
    }) */
  }

  // Form GET
  get difficulta() {
    return this.difficulty_form.get('difficult');
  }

  // OLD get the slide value
  algo(event){    
    this.slideValue = event
  }

  dificultyValue(event){
    this.slideDificultyValue = event;
  }

  dificultyIDAfterSlideValue(value){
    console.log(`SlideDificultValue ${value}`)
    switch (value) {
      case 0:
        return 0;
      default:        
        return this.dificultad.find((_,index) => index == value-1).id;
    }
  }

  // Get the main ingredient
  mainIngredient(){
    return this.products.filter(data => data.id == this.ingredient_form.get('ingredients').value[0]['product'].id)[0].name;
  }



  displayOnlyName(value){ 
    if(value)
    {
      return value.name
    }
  }

}
