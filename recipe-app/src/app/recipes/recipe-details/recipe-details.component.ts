import { Component, OnInit, OnDestroy } from '@angular/core';

// For url parser, needs to be injected
import { ActivatedRoute, ParamMap, Router, NavigationEnd, NavigationError } from '@angular/router'; //Holds the info from de url that points to this component
import { Location } from '@angular/common'; // Angular service to interact with the browser

import { switchMap, map } from 'rxjs/operators';

// Service 
import {RecipeService} from '../../service/recipe.service';
import {UserService} from '../../service/user.service';
import {LocalStorageService} from '../../service/local-storage.service'

// Observable
import { Observable } from 'rxjs';

// Interface
import {Recipe} from '../../interfaces/recipe';

// Child components
import {RecipeOptionsComponent} from './recipe-options/recipe-options.component'

// Buton Sheet
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

// EventEmiter
import {EventEmitterService} from '../../service/event-emitter.service'

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  recipe_details$! : Observable<Recipe>;
  currentID: string = null;
  idToPass : string = null;
  cargando : boolean = true;

  recipe_detail = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService,
    private buttonSheet: MatBottomSheet,
    private userService : UserService,
    private _eventEmitter : EventEmitterService,
    private _location : Location,
    private _localStorageService : LocalStorageService,
  ) {
    /* console.log("CONSTRUCTOR")
    console.log(this.router.getCurrentNavigation().extras.state) // Only works in the constructur  */
    // The router state in the constructor is a data or undefined in the second call (other place)
    if(this.router.getCurrentNavigation().extras.state)
    {
      this._localStorageService.localStorage(1).setItem('recipe_details', JSON.stringify(this.router.getCurrentNavigation().extras.state))
    }
    //this.recipe_detail = this.router.getCurrentNavigation().extras.state;
    // Router events
    this.router.events.subscribe(
      event => {      
        if(event instanceof NavigationEnd) // What happen after navigation Ends
        {
          setTimeout(() => {
            this.cargando = false;
          }, 500);
          
        }
        if(event instanceof NavigationError)
        {
          console.log("Problemas con la navegacion")
        }
      }
    )
  }

  ngOnInit(): void {
    // In these two cases, the state always going to change
    // console.log(history.state) // Get Router dynamic vars
    // this._location.getState()
   
    // Get the recipe from the local storage -> Persist data after user reload the page
    this.recipe_detail = JSON.parse(this._localStorageService.localStorage(1).getItem('recipe_details')); // Like history
    
    this.currentID = this.recipe_detail.slug;
    this.idToPass = this.recipe_detail.id;
    /* this.recipe_details$ = this.route.paramMap.pipe(
      switchMap((param: ParamMap)=> {
        this.currentID = param.get('id');
        return this.service.getRecipeDitails(this.currentID!)
      })
    )    
    this.recipe_details$.subscribe(data => {
      this.idToPass = data.id;
    }) */
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._localStorageService.localStorage(1).removeItem(
      'recipe_details'
    );
  }

  // Open the bottom sheet for recipe options
  openSheet():void{
       
    this.buttonSheet.open(RecipeOptionsComponent, {data: {
      currentID: this.currentID,
      recipe: this.service.getRecipeDitailsJSON(this.idToPass!),
    }});
  }

  // Is user authenticated
  isAuth(){
    return this.userService.isAuth();
  }

  // Get user id
  userID(){
    if(this.userService.isAuth())
      return JSON.parse(this.userService.getLocalSotrage().getItem('user'))    
  }

}
