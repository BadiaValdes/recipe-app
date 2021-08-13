import { Component, OnInit, Input } from '@angular/core';

import {UserService} from '../../../service/user.service'

@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html',
  styleUrls: ['./recipe-ingredient.component.css']
})
export class RecipeIngredientComponent implements OnInit {
  // Takes in via parent data the recipe's ingredient
  @Input() recipe_ingredients : any[];

  public token = this.us.token; 
  public mainOne;
  constructor(private us : UserService) { }

  ngOnInit(): void {
    console.log(this.recipe_ingredients)
  }



}
