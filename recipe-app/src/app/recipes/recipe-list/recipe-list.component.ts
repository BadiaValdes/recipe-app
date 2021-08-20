import { Component, OnInit, OnDestroy } from '@angular/core';

import {ActivatedRoute, Router, NavigationEnd, NavigationStart} from '@angular/router'
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
export class RecipeListComponent implements OnInit, OnDestroy {

  // An old var for "Responsive design"
  breakpoint : number = 4 // Obsolete

  /* Save the HTTP CALL as an observable */
  recipes$ :  Observable<Recipe[]>; // Recipe Observable -> Needs to be displayed with the async Pipe
  recipes_list :  Recipe[]; // Recipe List -> Used in the simple way

  // isLoading
  loading = true;
  // event emiter Subscription
  eventSubcriber : Subscription; 
  constructor(private rs : RecipeService, // recipe handle
    private route : ActivatedRoute, // Routes handle
    private _router : Router,
    private _eventEmitterService : EventEmitterService // We can subscribe to this event to recive the new recipe after creation
    ) { }

  ngOnInit(): void {    
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4; // Depreciated
    this.dataApiGet();
    this.eventDataSubcriber();    
  }

  // Get data from API and store it in recipes_list
  dataApiGet(){
    this.rs.getRecipe().subscribe(
      data => {
       this.recipes_list = data;
        setTimeout(() => {
        this.loading = false;
       }, 500); 
       
      }
    )
  }

  // Event Subscription
  eventDataSubcriber(){
    this.eventSubcriber = this._eventEmitterService.miFistEventEmitter.subscribe(data => {
      console.log(data)
      this.recipes_list.push(data)
    })
  }

  // Whe the component goes "offline" we need to unsubscribe all the events
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.eventSubcriber){
      this.eventSubcriber.unsubscribe();
      this.eventSubcriber = null;
    }

    
  }

  // Depreciated
  breakpointResize(event){
    if(event.target.innerWidth  >= 400 && event.target.innerWidth  <= 600 )
      this.breakpoint =  2;
    else if(event.target.innerWidth  <= 400)
      this.breakpoint =  1;
    else 
      this.breakpoint =  4;
  }

  // Get API data via Observable
  getRecipes(){
    this.recipes$ = this.route.paramMap.pipe(
      switchMap(params => {        
        return this.rs.getRecipe()
      })
  )}

  consoleThis(value){
    console.log(value)
  }

    
  

}
