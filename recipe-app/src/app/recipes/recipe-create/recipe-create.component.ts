import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl,  FormGroupDirective,  NgForm, NgControl, FormArray, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { NgModule } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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

//Event emitter
import {Output, EventEmitter} from '@angular/core'  
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/interfaces/recipe';


@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})

export class RecipeCreateComponent implements OnInit {

  //@Output() event_TO_Parent = new EventEmitter<String>();

  lastIndex : number = 0;
  cant_ingredients: number = 0;

  recipeNewOne : Recipe;

  

  // Select options
  product_options$ :  Observable<Product[]> ;
  category_options$ :  Observable<Category[]> ;
  difficulty_options$ :  Observable<Difficulty[]> ;
  measurement_options$ :  Observable<Measurement[]> ;

  image_data;
  slug_in_construction:string= "";
  recipe_id: string = ""
  principal : boolean = true;
  img_to_show = null;
  showImageField : boolean = this.data ? false : true;
  
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private generalAPI: GeneralApiServicesService,
    private formB : FormBuilder, 
    private rs : RecipeService, 
    private asyncValDirective : AsyncValServiceService,
    private cd : ChangeDetectorRef,
    private us : UserService,
    public dialogRef: MatDialogRef<RecipeCreateComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any,
    ) { }


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


  closeDialog(num : number, receta?): void {
    this.dialogRef.close({
      num: num,
      receta: receta});
  }

  ngOnInit(): void {
   this.initNomencladores();
   this.slugGenerator();
    if(this.data != null){
      this.setUpdatesValues(this.data)
    }
  }

  slugGenerator(){
    this.recipe_name.valueChanges.subscribe((value: string)=>{
      this.slug.setValue(this.replaceAll(value));
    })
  }

  initNomencladores(){
    this.product_options$ = this.generalAPI.getProducts()
    this.category_options$ = this.generalAPI.getCategory()
    this.difficulty_options$ = this.generalAPI.getDifficulty()
    this.measurement_options$= this.generalAPI.getMeasurement()
  }

  setUpdatesValues(data)
  {
    data.subscribe(data => {
      const defaultData = data;
      this.recipe_id = data.id;
      this.recipeForm.get('recipe_name').setValue(defaultData.name);
      this.recipeForm.removeControl('img')
      this.showImageField = false
      //this.recipeForm.get('img').setValue(defaultData.img);
      this.recipeForm.get('description').setValue(defaultData.description);
      this.recipeForm.get('difficulty').setValue('3dfd91059c');
      this.recipeForm.get('category').setValue('47f60a1189');
      this.recipeForm.get('steps').setValue(defaultData.steps);
      defaultData.recipe_ingredient.forEach(element => {     
        this.ingredients().push(this.newIngredientsWithValues(element.fk_product, element.amount, element.fk_measurement_unit, element.main_ingredient));
        this.principal = false;
      }); 
      console.log(data)
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

  newIngredientsWithValues(product,cantidad,measurement,principal) : FormGroup{
    this.cant_ingredients ++;
    return this.formB.group({
      product : new FormControl(product, Validators.required),
      cantidad: new FormControl(cantidad, Validators.required),
      measurement: new FormControl(measurement, Validators.required),
      principal : new FormControl(principal, Validators.required),
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
    console.log(this.recipeForm.get('ingredients').value)
    form.set('slug', this.recipeForm.get('slug').value);
    form.set('name', this.recipeForm.get('recipe_name').value);
    if(this.showImageField == true)
    {
      form.append('img', this.recipeForm.get('img').value, this.image_data.name);
    }
    form.set('description', this.recipeForm.get('description').value);
    form.set('fk_difficult', this.recipeForm.get('difficulty').value);
    form.set('fk_category', this.recipeForm.get('category').value);
    form.set('steps', this.recipeForm.get('steps').value);
    form.append('recipe_ingredient', JSON.stringify(this.recipeForm.get("ingredients").value));
    form.set('fk_user', p['id']);

    if(this.data == null)
    {
      this.recipeCreate(form)
    }
    else{
      this.recipeUpdate(form)
    }
    
/*     .subscribe( data => {
      this.sendInfo();
    }) */

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

  onFileSelect(event) {
    let reader = new FileReader();
    if (event.target.files.length > 0 && event.target.files) {
      const [file2] = event.target.files;
      reader.readAsDataURL(file2)

      reader.onload = () => {
       
          this.img_to_show = reader.result
      

        this.cd.markForCheck;
      }    
    
      //const file = event.target.files[0]
      const file = event.target.files[0]
      this.image_data = file;
      this.recipeForm.patchValue({
        img: file
      })
      this.recipeForm.get('img').updateValueAndValidity()
 
    }}
    //this.recipeForm.get('img').setValue(event.target.files[0]);
  
  sendInfo(numb : number, receta?){
    // Send params by URL
    //this.router.navigate(['./recipe'],{queryParams:{done:'good'}, queryParamsHandling: "merge"})
    this.closeDialog(numb, receta);
    this.router.navigate(['./recipe'])
    
   
  }

  recipeUpdate(data):void{
    this.rs.patchRecipe(data, this.recipe_id).then(data =>{
      this.sendInfo(2);      
    }).catch(_ => {
      this.sendInfo(3);
    })
  }

  recipeCreate(form):void{
    this.rs.postRecipe(form)       
      .then(data =>{        
        this.sendInfo(2,data);      
      }).catch(_ => {
        this.sendInfo(3);
      })
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