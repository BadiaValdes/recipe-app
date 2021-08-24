import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';

import {ActivatedRoute, Router, NavigationEnd, NavigationStart} from '@angular/router'
import {Observable, from, Subscriber, Subscription, fromEvent, fromEventPattern, Subject,} from 'rxjs';
import { switchMap, map, debounceTime, debounce, distinctUntilChanged, throttleTime, subscribeOn } from 'rxjs/operators';

import {Recipe} from '../../interfaces/recipe'

import {RecipeService} from '../../service/recipe.service'

import {EventEmitterService} from '../../service/event-emitter.service'
import { MatDialog } from '@angular/material/dialog';

// Instant Details
import {RecipeInstantDetailsComponent} from '../recipe-instant-details/recipe-instant-details.component'

// animation 
import {inOutAnimation} from '../../animations'

// debounce



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  animations: [inOutAnimation]
})
export class RecipeListComponent implements OnInit, OnDestroy {

  searchText : string ="";
  // Filters activation
  filters: boolean = true;

  // An old var for "Responsive design"
  breakpoint : number = 4 // Obsolete

  /* Save the HTTP CALL as an observable */
  recipes$ :  Observable<Recipe[]>; // Recipe Observable -> Needs to be displayed with the async Pipe
  recipes_list :  Recipe[]; // Recipe List -> Used in the simple way
  recipe_copy: Recipe[];

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  // isLoading
  loading = true;
  // event emiter Subscription
  eventSubcriber : Subscription; 

  // Subject for debouncing method
  filterSubject : Subject<string> = new Subject<string>(); // Creates a observable variable

  constructor(private rs : RecipeService, // recipe handle
    private route : ActivatedRoute, // Routes handle
    private _router : Router,
    private _eventEmitterService : EventEmitterService, // We can subscribe to this event to recive the new recipe after creation
    private _dialogComponent : MatDialog,
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
       this.cloneRecipe()
        setTimeout(() => {
        this.loading = false;
       }, 500); 
       
      }
    )
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

  // Event Subscription
  eventDataSubcriber(){
    this.eventSubcriber = this._eventEmitterService.miFistEventEmitter.subscribe(data => {
      console.log(data)
      this.recipes_list.push(data)
      this.cloneRecipe()
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

  search(event){

/*     // Avoid consecutive HTTP calls
    // Performance optimization
    if(this.filterSubject.observers.length === 0) // Looks for subscribers in the filterSubject, if the amount of subcribers is 0, create a new one
    { // U need to create a subject to observe
      this.filterSubject.pipe(
        debounceTime(1000), // Wait time
        // throttleTime(2000), // -> Used in the same way
      distinctUntilChanged(), // Avoid user search operation, if you type a character and delete it immediately 
      ).subscribe(text => {
        this.searchLoadData(text);
      })
      
    }

    this.filterSubject.next(event); // Reads the next character */

/*      this.searchText = event.toLocaleLowerCase();
     if(this.searchText === ""){
       console.log('no search text')
       console.log(this.recipe_copy)
       this.recipes_list = this.recipe_copy;
     }
     else{
       this.recipes_list = this.recipes_list.filter(dat => 
         dat.name.toLocaleLowerCase().includes(this.searchText)
       )
     }  */

     /* 
        Throttlin -> a function executed at least every N milisec -> Strict way of implementation, the function will only fire every N milliseconds 
        debounce -> execute a function after a cooling period -> Emit the value if the user stops writing
     */
    
    

     
     
    }

    // For HTTP filtering
    searchLoadData(event){
      this.rs.getRecipe()
     .subscribe(data => {      
       if(event)
       {
        this.recipes_list = data.filter(dat => dat.name.toLocaleLowerCase().includes(event.toLocaleLowerCase()));
       }
       else
       {
        this.recipes_list = data;
       }
   
     })   
     
    }
  
  cloneRecipe(){
    this.recipe_copy = this.recipes_list;
  }

    
  }

    
  


