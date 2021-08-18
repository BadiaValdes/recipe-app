//----- IMPORTS -------

import { Component, OnInit, ChangeDetectorRef, Inject, HostListener } from '@angular/core';
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

// Form Settings
import {formSettings} from '../../interfaces/formSettings'

// Editor Configuration
import {editorConfig} from '../../interfaces/editorConfig'

// Stepper Options
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper' // Import the CDK

//----- END IMPORTS -------
@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false,
    }
  }]
})

export class RecipeCreateComponent implements OnInit {

  //@Output() event_TO_Parent = new EventEmitter<String>();
  // Spinner values
  diameter = 3

  // Var that I dont use and I don't know why they are here
  lastIndex : number = 0;
  cant_ingredients: number = 0;
  // END OF THAT VARS

  // VAR to storage the new Recipe after creation
  recipeNewOne : Recipe;
  
  // Select options
  product_options$ :  Observable<Product[]> ;
  category_options$ :  Observable<Category[]> ;
  difficulty_options$ :  Observable<Difficulty[]> ;
  measurement_options$ :  Observable<Measurement[]> ;
  // END OF SELECT OPTIONS VARS

  // RANDOM VAR that has use but I dont remember now
  image_data; // Save the image after file load
  slug_in_construction:string= ""; // Construct the slug from the recipe name
  recipe_id: string = ""; // Storage the recipe ID -> Used when the form is call as modification
  principal : boolean = true; // Set the principal ingredient -> Whe have to find a better solution
  img_to_show = null; // Storage the image after load and show it
  showImageField : boolean = this.data ? false : true; // The image can be displayed? -> Use to ocult the image in modification

  // Settings -> Loads the settings of the form
  formSetting = formSettings;

  // editor Configuration -> Loads the WYSIWYG configuration
  editConfig = editorConfig;

  // Is all loaded
  isAllLoaded = false;
  
  constructor(
    private router : Router, // Works with the routes
    private route : ActivatedRoute, // Loads route params
    private generalAPI: GeneralApiServicesService, // Call the general models in the API
    private formB : FormBuilder, // Form Builder -> The name says all
    private rs : RecipeService,  // Call the API for recipe
    private asyncValDirective : AsyncValServiceService, // Calls the async validation functions
    private cd : ChangeDetectorRef, // I dont remember
    private us : UserService, // User service 
    public dialogRef: MatDialogRef<RecipeCreateComponent>, // Self reference
    @Inject (MAT_DIALOG_DATA) public data: any, // Data sent by params
    ) { }

  


  // Form GROUPS
  recipeForm = new FormGroup({
    // Validación async -> El asyncValidators:[this.asyncValDirective.customVal2()]
    recipe_name: new FormControl(null, {updateOn: "blur"}, ),
    slug: new FormControl(null, [Validators.required,]),
    img: new FormControl(null, [Validators.required,]),
    description: new FormControl(null, [Validators.required]),
  });

  secondForm = new FormGroup({
    difficulty: new FormControl(null, [Validators.required,]),
    category: new FormControl(null, [Validators.required,]),
    steps: new FormControl(null, [Validators.required,]),
  })

  thirdForm = new FormGroup({
    ingredients: this.formB.array([]),
  })
// END FORM GROUPS


  // CUSTOM VALIDATIONS FUNCTIONS
  descriptionLength() :ValidatorFn{
    return (control : AbstractControl)  => {
      return this.recipeForm.get('description').value?.length<1 ? {wrongColor: "Debe ser mayor"} : null
    }
  }
  // END OF CUTOM VALIDATIONS FUNCTIONS

  // Stepper direction
  direction = "horizontal"

  // browser window size
  size : any;

  ngOnInit(): void {  
   this.sleep(500).then(_ =>{
    this.isAllLoaded = true;
   })
   
  }

  // Change stepper direction on resize
  @HostListener('window:resize', ['$event']) // Decorator
  onResize(event){
    this.size = window.innerWidth;
    if(this.size < 600)
    {
      this.direction = "vertical"
    }
    else
    {
      this.direction = "horizontal"
    }
  
  }

  loadAll(){
    this.initNomencladores();
    this.slugGenerator();
    this.setValidators();
     if(this.data != null){
       this.setUpdatesValues(this.data)
     }
  }

  // Wait before show
  sleep(time){
    return new Promise(resolve => {
      this.loadAll()
      setTimeout(resolve,time)
    })
  }

  // Set some validators
  setValidators(){
    this.recipeForm.get('description').setValidators([Validators.required, this.descriptionLength])
   this.recipeForm.get('recipe_name').setAsyncValidators(this.asyncValDirective.customVal())
  }

  // Asign the generated slug
  slugGenerator(){
    this.recipe_name.valueChanges.subscribe((value: string)=>{
      this.slug.setValue(this.replaceAll(value));
    })
  }

  // Set the values of the options fiels
  initNomencladores() : void{
    this.product_options$ = this.generalAPI.getProducts()
    this.category_options$ = this.generalAPI.getCategory()
    this.difficulty_options$ = this.generalAPI.getDifficulty()
    this.measurement_options$= this.generalAPI.getMeasurement()
  }

  // On update, set default values
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
      this.secondForm.get('difficulty').setValue('3dfd91059c');
      this.secondForm.get('category').setValue('47f60a1189');
      this.secondForm.get('steps').setValue(defaultData.steps);
      defaultData.recipe_ingredient.forEach((element, index) => {   
        this.ingredients().push(this.newIngredientsWithValues(element.fk_product, element.amount, element.fk_measurement_unit, element.main_ingredient));
        if(element.main_ingredient == true){
          this.lastIndex = index;
        }
        this.principal = false;
      }); 
      console.log(data)
    })
  }

  // Return the ingredient array
  ingredients() : FormArray {
    return this.thirdForm.get('ingredients') as FormArray
  }

  // Create the new ingredientes without values
  newIngredients() : FormGroup{
    this.cant_ingredients ++;
    return this.formB.group({
      product : new FormControl(null, Validators.required),
      cantidad: new FormControl(null, Validators.required),
      measurement: new FormControl(null, Validators.required),
      principal : new FormControl(this.principal, Validators.required),
    })
  }

  // Create the new group of ingredients with values
  newIngredientsWithValues(product,cantidad,measurement,principal) : FormGroup{
    this.cant_ingredients ++;
    return this.formB.group({
      product : new FormControl(product, Validators.required),
      cantidad: new FormControl(cantidad, Validators.required),
      measurement: new FormControl(measurement, Validators.required),
      principal : new FormControl(principal, Validators.required),
    })
  }

  // Create the slug
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

  // Add blank ingredient
  adicionarIngrediente() {
    this.ingredients().push(this.newIngredients());
    this.principal = false;
  }

  // Remove ingredient from list
  removeIngredient(i:number){
    this.ingredients().removeAt(i);
  }

  // The same than below but more complex and expensive
  mainIngredient(i:number){
    this.ingredients().controls.forEach ((element,index) => {
      if(index == i)
        element.get("principal").setValue(true);
      else
        element.get("principal").setValue(false);
    })
  }

  // Set the main ingredient
  mainIngredientSlide(i:number){   
     this.ingredients().at(this.lastIndex).get("principal").setValue(false);
   this.lastIndex = i;
  }

  // FORM CONTROL GETTERS

  get recipe_name(){
    return this.recipeForm.get("recipe_name")}
  

  get slug(){
      return this.recipeForm.get("slug")}
  
  get description(){
    return this.recipeForm.get("description")}
  
  get image(){
    return this.recipeForm.get("img")}
  
  get difficulty(){
    return this.secondForm.get("difficulty")}  

  get category(){
    return this.secondForm.get("category")}

  get steps(){
    return this.secondForm.get("steps")}

  get ingredientsArray(){
    return this.thirdForm.get("ingredients")}
  
  // END FORM CONTROL GETTERS

  //Create new recipe
  
  // save the forms values and send it
  onSubmit(): void{
    const form = new FormData(); // The data will be storage in the FormData -> It can handle the images
    let p = JSON.parse(this.us.getLocalSotrage().getItem('user'));    // Get the current user and turn it in json

    form.set('slug', this.slug?.value); // Save the slug value
    form.set('name', this.recipe_name?.value); // Save the recipe name value
    if(this.showImageField == true) // If create, the image will be saved
    {
      form.append('img', this.recipeForm.get('img')?.value, this.image_data.name);
    }
    form.set('description', this.description?.value); // Save description
    form.set('fk_difficult', this.difficulty.value); // save difficulty
    form.set('fk_category', this.category.value); // Save category
    // With these two the first time (just a formGroup) I didn't have to do anything in the backEnd, but now I have to do a few things, see the backend for details. 
    form.set('steps', this.steps?.value);// Save the steps
    form.append('recipe_ingredient', JSON.stringify(this.thirdForm.get("ingredients")?.value)); // Append all the ingredient as an arry of strings
    form.set('fk_user', p['id']); // Save the user ID

    // IF data (created in the constructur) if null, the form is for creations
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

  // What happend on destroy the component
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

  // Clear the file field for now drop object
  clearFile(event)
  {
    event.target.value = null;  
    this.cd.markForCheck; 
  }

  // LOADS the file that user selects
  onFileSelect(event) {
    let reader = new FileReader(); // Create the file rider var
    if (event.target.files.length > 0 && event.target.files) {
      // Has the input any value
      const [file2] = event.target.files; // Save That value
      reader.readAsDataURL(file2) // Read That Value

      // what happened in the load process
      reader.onload = () => {
       
          this.img_to_show = reader.result // Save the result value after read in the var that will show the image to user
      

        this.cd.markForCheck; // Detect the reference
      }    
    
      //const file = event.target.files[0]
      const file = event.target.files[0] // save the file into a variable
      this.image_data = file; // save it again why?
      this.recipeForm.patchValue({
        img: file
      }) // Save it in the recipeForm group
      this.recipeForm.get('img').updateValueAndValidity() // Update the formGroup image
 
    }}
    //this.recipeForm.get('img').setValue(event.target.files[0]);
  


  // SENT DATA FOR UPDATE
  recipeUpdate(data):void{
    this.rs.patchRecipe(data, this.recipe_id).then(data =>{
      this.sendInfo(2);      
    }).catch(_ => {
      this.sendInfo(3);
    })
  }

  // SENT DATA FOR CREATION
  recipeCreate(form):void{
    this.rs.postRecipe(form)       
      .then(data =>{        
        this.sendInfo(2,data);      
      }).catch(_ => {
        this.sendInfo(3);
      })
  }
  
  // WHAT DO AFTER POST OR PATCH
  sendInfo(numb : number, receta?){
    // Send params by URL
    //this.router.navigate(['./recipe'],{queryParams:{done:'good'}, queryParamsHandling: "merge"})
    this.closeDialog(numb, receta);
    this.router.navigate(['./recipe'])
    
   
  }

  closeDialog(num : number, receta?): void {
    this.dialogRef.close({
      num: num,
      receta: receta});
  }
  // END OF THAT
}