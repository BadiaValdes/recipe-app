import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';
import { MatDialog } from '@angular/material/dialog';

// Componets
import {RecipeInstantDetailsComponent} from '../recipe-instant-details/recipe-instant-details.component'
@Component({
  selector: 'app-recipe-card-item',
  templateUrl: './recipe-card-item.component.html',
  styleUrls: ['./recipe-card-item.component.css']
})
export class RecipeCardItemComponent implements OnInit {

  @Input() recip: Recipe;

  constructor(private _dialogComponent : MatDialog,) { }

  ngOnInit(): void {
  }

  instantDetails(recipe : Recipe){
    this._dialogComponent.open(RecipeInstantDetailsComponent, {data: {
      image: recipe.img,
      nombre: recipe.name,
      dificultad: recipe.fk_difficult,
      ingredientes: recipe.recipe_ingredient,
      descripcion: recipe.description,
      recip: recipe,
    }})
  }

}
