import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl,  FormGroupDirective,  NgForm, NgControl, FormArray, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { NgModule } from '@angular/core';

//Interface
import {Category} from '../../interfaces/category';
import {Difficulty} from '../../interfaces/difficulty';
import {Ingredient} from '../../interfaces/ingredients';
import {Product} from '../../interfaces/product';
import {Measurement} from '../../interfaces/measurement';

// General API
import {GeneralApiServicesService} from '../../service/general-api-services.service';
import {RecipeService} from '../../service/recipe.service';
import { Observable } from 'rxjs';

//Directive
import {checkPrincipalValidator} from '../../directive/arra-form/principal-check.directive'
import {existRecipe} from '../../directive/exist-field/recipe/recipe-name.directive'
import {AsyncValServiceService} from '../../directive/exist-field/async-val-service.service'


@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})

export class RecipeCreateComponent implements OnInit {

  lastIndex : number = 0;

  // Select options
  product_options$ :  Observable<Product[]> ;
  category_options$ :  Observable<Category[]> ;
  difficulty_options$ :  Observable<Difficulty[]> ;
  measurement_options$ :  Observable<Measurement[]> ;

  principal : boolean = true;

  constructor(private generalAPI: GeneralApiServicesService,private formB : FormBuilder, private rs : RecipeService, private asyncValDirective : AsyncValServiceService) { }


  // Form
  recipeForm = new FormGroup({
    // Validación async -> El asyncValidators:[this.asyncValDirective.customVal2()]
    recipe_name: new FormControl(null, {validators: [Validators.required], asyncValidators:[this.asyncValDirective.customVal()] ,updateOn: "blur"}, ),
    slug: new FormControl(null, [Validators.required,]),
    img: new FormControl(null, [Validators.required,]),
    description: new FormControl(null, [Validators.required,]),
    difficulty: new FormControl(null, [Validators.required,]),
    category: new FormControl(null, [Validators.required,]),
    steps: new FormControl(null, [Validators.required,]),
    ingredients: this.formB.array([]),
  });

 


  ngOnInit(): void {
    this.product_options$ = this.generalAPI.getProducts()
    this.category_options$ = this.generalAPI.getCategory()
    this.difficulty_options$ = this.generalAPI.getDifficulty()
    this.measurement_options$= this.generalAPI.getMeasurement()
  }

  // Devolver el arreglo actual de ingredietnes
  ingredients() : FormArray {
    return this.recipeForm.get('ingredients') as FormArray
  }

  // Crear parametros internos del array
  newIngredients() : FormGroup{
    return this.formB.group({
      product : new FormControl(null, Validators.required),
      cantidad: new FormControl(null, Validators.required),
      measurement: new FormControl(null, Validators.required),
      principal : new FormControl(this.principal, Validators.required),
    })
  }

  adicionarIngrediente() {
    this.ingredients().push(this.newIngredients());
    this.principal = false;
  }

  removeIngredient(i:number){
    this.ingredients().removeAt(i);
  }

  mainIngredient(i:number){
    this.ingredients().controls.forEach ((element,index) => {
      if(index == i)
        element.get("principal").setValue(true);
      else
        element.get("principal").setValue(false);
    })
  }

  mainIngredientSlide(i:number){
   
     this.ingredients().at(this.lastIndex).get("principal").setValue(false);
   this.lastIndex = i;
  }

  // Errors geters

  get recipe_name(){
    console.log(this.recipeForm.get("recipe_name").errors)
    return this.recipeForm.get("recipe_name")}



  // Intento fallido
  /*validateRecipeNameInDB(): ValidatorFn{
    let existe : boolean = false;
    return (control: AbstractControl): any => {          
      
      this.rs.existRecipe(control.value).subscribe(data => {
        existe = data;
        console.log(existe)
        if(existe)
          return {alredyExist: {value : true}} ;
        else
          return null;
      })
      

     

           
      
     
    }
  }
*/

}
