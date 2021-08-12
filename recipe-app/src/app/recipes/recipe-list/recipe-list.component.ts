import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router'
import {Observable, from, Subscriber, Subscription} from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import {Recipe} from '../../interfaces/recipe'

import {RecipeService} from '../../service/recipe.service'

import {EventEmitterService} from '../../service/event-emitter.service'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  breakpoint : number = 4

  /* Save the HTTP CALL as an observable */
  recipes$ :  Observable<Recipe[]>;
  recipes_list :  Recipe[];

  // event
  eventSubcriber : Subscription;
  constructor(private rs : RecipeService, private route : ActivatedRoute,
    private _eventEmitterService : EventEmitterService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
    this.rs.getRecipe().subscribe(
      data => {
       this.recipes_list = data;
      }
    )

    this.eventSubcriber = this._eventEmitterService.miFistEventEmitter.subscribe(data => {
      console.log(data)
      this.recipes_list.push(data)
    })
    //this.getRecipes()
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.eventSubcriber){
      this.eventSubcriber.unsubscribe();
      this.eventSubcriber = null;
    }
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
