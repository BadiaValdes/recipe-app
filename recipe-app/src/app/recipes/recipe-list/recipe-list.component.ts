import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  NavigationStart,
} from '@angular/router';
import {
  Observable,
  from,
  Subscriber,
  Subscription,
  fromEvent,
  fromEventPattern,
  Subject,
} from 'rxjs';
import {
  switchMap,
  map,
  debounceTime,
  debounce,
  distinctUntilChanged,
  throttleTime,
  subscribeOn,
} from 'rxjs/operators';

import { Recipe } from '../../interfaces/recipe';

import { RecipeService } from '../../service/recipe.service';

import { EventEmitterService } from '../../service/event-emitter.service';
import { MatDialog } from '@angular/material/dialog';

// Instant Details
import { RecipeInstantDetailsComponent } from '../recipe-instant-details/recipe-instant-details.component';

// animation
import {
  inOutAnimation,
  inOutAnimationFast,
  inOutAnimationFast2,
} from '../../animations';
import { HostListenerInUseService } from 'src/app/service/host-listener-in-use.service';
import { UserPageService } from 'src/app/service/user-page.service';

// debounce

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  animations: [inOutAnimation, inOutAnimationFast, inOutAnimationFast2],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  searchText: string = '';
  // Filters activation
  filters: boolean = true;

  // An old var for "Responsive design"
  breakpoint: number = 4; // Obsolete

  /* Save the HTTP CALL as an observable */
  recipes$: Observable<Recipe[]>; // Recipe Observable -> Needs to be displayed with the async Pipe
  recipes_list: Recipe[]; // Recipe List -> Used in the simple way
  recipe_copy: Recipe[];

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  // isLoading
  loading = true;
  // event emiter Subscription
  eventSubcriber: Subscription;

  // User Recipe subscription
  loggedUserRecipe: Subscription;

  // Subject for debouncing method
  filterSubject: Subject<string> = new Subject<string>(); // Creates a observable variable

  // Autocomplete options
  recipe_names: string[];

  // Options Obervable
  recipe_names_observable: Subject<string> = new Subject<string>();
  // The subject works like and observable but only shows the last value if U subscribe after the next() call

  // View type
  viewType: number = 0;
  //

  // If a recipe user search
  @Input() searchByUser? = false;
  @Input() searchedUser?;
  @Input() showSerchUserIcon? = true;
  constructor(
    private rs: RecipeService, // recipe handle
    private route: ActivatedRoute, // Routes handle
    private _router: Router,
    private _eventEmitterService: EventEmitterService, // We can subscribe to this event to recive the new recipe after creation
    private _dialogComponent: MatDialog,
    private _hostListenerInUse: HostListenerInUseService,
    private _userPage: UserPageService
  ) {
    if (
      this._router.getCurrentNavigation() != null &&
      this._router.getCurrentNavigation().extras.state &&
      this._router.getCurrentNavigation().extras.state.recipeSearch
    ) {
      this.searchByUser = true;
      this.searchedUser = this._router.getCurrentNavigation().extras.state.user;
    }
  }

  ngOnInit(): void {
    //this.breakpoint = window.innerWidth <= 400 ? 1 : 4; // Depreciated.

    this.dataApiGet();
    this.eventDataSubcriber();
    this._userPage.getUserRecipeSubject().subscribe((d) => {
      console.log(d);
      if (d != null) {
        this.getDataFromOutsideTheBox(d);
      }
    });
  }

  reloadData() {
    this.searchByUser = false;
    this.dataApiGet();
  }

  getDataFromOutsideTheBox(userID) {
    this.searchByUser = true;
    this.searchedUser = userID;
    this.dataApiGet();
  }

  // Get data from API and store it in recipes_list
  dataApiGet() {
    if (!this.searchByUser)
      this.rs.getRecipe().subscribe((data) => {
        this.recipes_list = data;
        console.log(this.recipes_list);
        this.cloneRecipe();
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    else
      this._userPage.searchForUser(this.searchedUser).subscribe((data) => {
        this.recipes_list = data;
        console.log(this.recipes_list);
        this.cloneRecipe();
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
  }

  // Create the data for instant deatils dialog
  instantDetails(recipe: Recipe) {
    this._dialogComponent.open(RecipeInstantDetailsComponent, {
      data: {
        image: recipe.img,
        nombre: recipe.name,
        dificultad: recipe.fk_difficult,
        ingredientes: recipe.recipe_ingredient,
        descripcion: recipe.description,
        recip: recipe,
      },
    });
  }

  // Event Subscription
  eventDataSubcriber() {
    this.eventSubcriber = this._eventEmitterService.miFistEventEmitter.subscribe(
      (data) => {
        console.log(data);
        this.recipes_list.push(data);
        this.cloneRecipe();
      }
    );
  }

  // Whe the component goes "offline" we need to unsubscribe all the events
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.eventSubcriber){
      this.eventSubcriber.unsubscribe();
      this.eventSubcriber = null;
    }


    if (this.recipe_names_observable.observers.length > 0) {
      this.recipe_names_observable.unsubscribe();
      this.recipe_names_observable = null;
    }


    this._userPage.userRecipeSubjectNext(null);
    this.searchByUser = false;
  }

  // Depreciated
  breakpointResize(event) {
    if (event.target.innerWidth >= 400 && event.target.innerWidth <= 600)
      this.breakpoint = 2;
    else if (event.target.innerWidth <= 400) this.breakpoint = 1;
    else this.breakpoint = 4;
  }

  // Get API data via Observable
  getRecipes() {
    this.recipes$ = this.route.paramMap.pipe(
      switchMap((params) => {
        return this.rs.getRecipe();
      })
    );
  }

  consoleThis(value) {
    console.log(value);
  }

  endSearch() {
    this._hostListenerInUse.hostListenerInUseNextState(false);
  }

  search(event) {
    // Here U can see the way of use a subject
    // First subscribe
    //this._hostListenerInUse.hostListenerInUseNextState(true)
    if (this.recipe_names_observable.observers.length === 0) {
      this.recipe_names_observable.pipe().subscribe((text) => {
        this.optionsFilter(text);
      });
    }
    // then next
    this.recipe_names_observable.next(event);

    // In case that here U make a subsribe, the first element will never will be show

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

    /* 

     We have three ways of filtering in this component:
      1- Via PIPE
        - We need to create a pipe
        - The transformation method has as params the items array and a search word
        - Inside the method:
          - If array is empty, it returns empty
          - If search word in null or empty, it returns items array
          - Finally return the items after applaying the filter
        - In the HTML, use the pipe in the ngFor
      2- Via Method
        - Create an event (input) in the input html element
        - Inside the method:
          - If event is empty, it returns array
          - else, it returns items after filtering
      3- Use an subject with debounceTime or throttleTime
        - Pipe the subject, and after that, create a subscription and execute the method in way 2
     */
  }

  // For HTTP filtering
  searchLoadData(event) {
    this.rs.getRecipe().subscribe((data) => {
      if (event) {
        this.recipes_list = data.filter((dat) =>
          dat.name.toLocaleLowerCase().includes(event.toLocaleLowerCase())
        );
      } else {
        this.recipes_list = data;
      }
    });
  }

  // Clone the recipe, Why? -> Don't lose the orginal data
  cloneRecipe() {
    this.recipe_copy = this.recipes_list;
    this.recipe_names = this.recipeNames;
  }

  get recipeNames() {
    return this.recipes_list.map((data) => data.name);
  }

  // Filter Option 3
  optionsFilter(word: string) {
    if (word === '') {
      this.recipe_names = this.recipeNames;
    } else {
      this.recipe_names = this.recipe_names.filter((data) =>
        data.toLocaleLowerCase().includes(word.toLocaleLowerCase())
      );
    }
  }
}
