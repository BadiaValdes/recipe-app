import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';

import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-recipe-cook-filter',
  templateUrl: './recipe-cook-filter.component.html',
  styleUrls: ['./recipe-cook-filter.component.css']
})
export class RecipeCookFilterComponent implements OnInit {

  filterOn = false;
  loadingResult = false;

  recipe_list : Recipe[];

  baseURL = environment.baseImgURL;

  constructor(
   
  ) { }

  ngOnInit(): void {
  }

  recipeOutputDataReciver(data){
    this.recipe_list = data;
    this.recipe_list = this.recipe_list.map(data => {
      data.img = `${this.baseURL}${data.img}`
      return data;
    })
    console.log("Is emmited")
    console.log(this.recipe_list);
    this.enableDisableFilter(true,true);
    setTimeout(() => {
      this.enableDisableFilter(false,true);
    }, 1000);
  }

  enableDisableFilter(loadingResult:boolean=false, filterOn:boolean=false){
    this.loadingResult=loadingResult;
    this.filterOn = filterOn;
  }


}
