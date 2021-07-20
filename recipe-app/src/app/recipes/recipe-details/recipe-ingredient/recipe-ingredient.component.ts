import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html',
  styleUrls: ['./recipe-ingredient.component.css']
})
export class RecipeIngredientComponent implements OnInit {
  @Input() recipe_ingredients : string[];

  constructor() { }

  ngOnInit(): void {
  }

}
