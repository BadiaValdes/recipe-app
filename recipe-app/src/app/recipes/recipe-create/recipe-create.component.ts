import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl,  FormGroupDirective,  NgForm, NgControl} from '@angular/forms';
import { NgModule } from '@angular/core';

//Interface
import {Category} from '../../interfaces/category';
import {Difficulty} from '../../interfaces/difficulty';
import {Ingredient} from '../../interfaces/ingredients';
import {Product} from '../../interfaces/product';
import {Measurement} from '../../interfaces/measurement';

// General API
import {GeneralApiServicesService} from '../../service/general-api-services.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})

export class RecipeCreateComponent implements OnInit {

  // Select options
  product_options$ :  Observable<Product[]> ;
  category_options$ :  Observable<Category[]> ;
  difficulty_options$ :  Observable<Difficulty[]> ;
  measurement_options$ :  Observable<Measurement[]> ;


  // Form
  recipeForm = new FormGroup({
    recipe_name: new FormControl,
    slug: new FormControl,
    img: new FormControl,
    description: new FormControl,
    difficulty: new FormControl,
    category: new FormControl,
    steps: new FormControl,
    ingredients: new FormControl,
  });

  constructor(private generalAPI: GeneralApiServicesService) { }

  ngOnInit(): void {
    this.product_options$ = this.generalAPI.getProducts()
    this.category_options$ = this.generalAPI.getCategory()
    this.difficulty_options$ = this.generalAPI.getDifficulty()
    this.measurement_options$= this.generalAPI.getMeasurement()
  }

}
