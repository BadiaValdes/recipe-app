import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router'
import {Observable, from} from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {Recipe} from '../../interfaces/recipe'

import {RecipeService} from '../../service/recipe.service'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  breakpoint : number = 4

  recipes$ :  Observable<Recipe[]>;
  constructor(private rs : RecipeService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
    this.getRecipes()
  }

  breakpointResize(event){
    if(event.target.innerWidth  >= 400 && event.target.innerWidth  <= 600 )
      this.breakpoint =  2;
    else if(event.target.innerWidth  <= 400)
      this.breakpoint =  1;
    else 
      this.breakpoint =  4;
  }

  getRecipes(){
    this.recipes$ = this.route.paramMap.pipe(
      switchMap(params => {        
        return this.rs.getRecipe()
      })
  )}

}
