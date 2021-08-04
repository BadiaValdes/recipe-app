import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
import {UserService} from '../../service/user.service';
import {RecipeService} from '../../service/recipe.service';
import { Observable } from 'rxjs';

//Directive
import {checkPrincipalValidator} from '../../directive/arra-form/principal-check.directive'
import {existRecipe} from '../../directive/exist-field/recipe/recipe-name.directive'
import {AsyncValServiceService} from '../../directive/exist-field/async-val-service.service'
import { elementAt } from 'rxjs/operators';


@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})

export class RecipeCreateComponent implements OnInit {

  lastIndex : number = 0;
  cant_ingredients: number = 0;

  // Select options
  product_options$ :  Observable<Product[]> ;
  category_options$ :  Observable<Category[]> ;
  difficulty_options$ :  Observable<Difficulty[]> ;
  measurement_options$ :  Observable<Measurement[]> ;
  image_data;
  slug_in_construction:string= "";

  principal : boolean = true;

  constructor(private generalAPI: GeneralApiServicesService,
    private formB : FormBuilder, 
    private rs : RecipeService, 
    private asyncValDirective : AsyncValServiceService,
    private cd : ChangeDetectorRef,
    private us : UserService) { }


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

    this.recipe_name.valueChanges.subscribe((value: string)=>{
      this.slug.setValue(this.replaceAll(value));
    })
  }

  // Devolver el arreglo actual de ingredietnes
  ingredients() : FormArray {
    return this.recipeForm.get('ingredients') as FormArray
  }

  // Crear parametros internos del array
  newIngredients() : FormGroup{
    this.cant_ingredients ++;
    return this.formB.group({
      product : new FormControl(null, Validators.required),
      cantidad: new FormControl(null, Validators.required),
      measurement: new FormControl(null, Validators.required),
      principal : new FormControl(this.principal, Validators.required),
    })
  }

  replaceAll(text: string){
    let char = [...text];
    let new_text = ""
    char.forEach(element => {
      if(element === " ")
      new_text += "_";
      else
      new_text += element;
    })
    return new_text.toLowerCase();
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

  // geters form Control

  get recipe_name(){
    return this.recipeForm.get("recipe_name")}

  get slug(){
      return this.recipeForm.get("slug")}
  
  get description(){
    return this.recipeForm.get("description")}
  

  get image(){
    return this.recipeForm.get("img")}
  
  get difficulty(){
    return this.recipeForm.get("difficulty")}  

  get category(){
    return this.recipeForm.get("category")}

  get steps(){
    return this.recipeForm.get("steps")}

  get ingredientsArray(){
    return this.recipeForm.get("ingredients")}
  

  //Create new recipe
  
  
  onSubmit(): void{
    const form = new FormData();
    let p = JSON.parse(this.us.getLocalSotrage().getItem('user'));
    let data = {
      'slug':this.recipeForm.get('slug').value,
      'name':this.recipeForm.get('recipe_name').value,
      'img': this.recipeForm.get('img').value,
      'description': this.recipeForm.get('description').value,
     // 'fk_difficult':  this.recipeForm.get('difficulty').value,
     // 'fk_category': this.recipeForm.get('category').value,
      'steps':  this.recipeForm.get('steps').value,
      'recipe_ingredient': this.recipeForm.get('ingredients').value,
     // 'fk_user': p['id'],
    };
    console.log(this.recipeForm.get('ingredients').value)
    form.set('slug', this.recipeForm.get('slug').value);
    form.set('name', this.recipeForm.get('recipe_name').value);
    form.append('img', this.recipeForm.get('img').value, this.image_data.name);
    form.set('description', this.recipeForm.get('description').value);
    form.set('fk_difficult', this.recipeForm.get('difficulty').value);
    form.set('fk_category', this.recipeForm.get('category').value);
    form.set('steps', this.recipeForm.get('steps').value);
    let d = this.recipeForm.get("ingredients").value;
    let cc : any = {};
    //d.forEach(element => {
    //  let c = {
     //   'main_ingredient': element.principal,
     //   'amount': element.cantidad,
     //   'fk_measurement_unit_id': element.measurement,
     //   'fk_product_id': element.product,
    //  }
     // cc.      
    //});
    form.append('recipe_ingredient', JSON.stringify(this.recipeForm.get("ingredients").value));
    
    //form.append('recipe_ingredient', this.recipeForm.get("ingredients").value); 
    form.set('fk_user', p['id']);

    this.rs.postRecipe(form);
  }

   onFileSelect(event) {
    let reader = new FileReader();
    if (event.target.files.length > 0 && event.target.files) {
      /*const [file] = event.target.files;
      reader.readAsDataURL(file)

      reader.onload = () => {
        this.recipeForm.patchValue({
          img: reader.result
        })

        this.cd.markForCheck;
      }     
      /*this.recipeForm.patchValue({
        img: event.target.files.item(0)
      })*/
      //const file = event.target.files[0]
      const file = event.target.files[0]
      this.image_data = file;
      this.recipeForm.patchValue({
        img: file
      })
      this.recipeForm.get('img').updateValueAndValidity()
 
    }
    //this.recipeForm.get('img').setValue(event.target.files[0]);
  }
  sendInfo(){
    console.warn("Hola")
    console.log(this.recipeForm.get("ingredients").value)
    let p = this.recipeForm.get("ingredients").value;
    p.forEach(element => {
      let c = {
        main_ingredient: element.principal,
        amount: element.cantidad,
        fk_measurement_unit_id: element.measurement,
        fk_product_id: element.product,
      }
      console.log(c)
        
    });
   
  }

}
  
  






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