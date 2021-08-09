import { Component, OnInit } from '@angular/core';

// For url parser, needs to be injected
import { ActivatedRoute, ParamMap, Router } from '@angular/router'; //Holds the info from de url that points to this component
import { Location } from '@angular/common'; // Angular service to interact with the browser

import { switchMap, map } from 'rxjs/operators';

// Service 
import {RecipeService} from '../../service/recipe.service';
import {UserService} from '../../service/user.service'

// Observable
import { Observable } from 'rxjs';

// Interface
import {Recipe} from '../../interfaces/recipe';

// Child components
import {RecipeOptionsComponent} from './recipe-options/recipe-options.component'

// Buton Sheet
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe_details$! : Observable<Recipe>;
  currentID: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService,
    private buttonSheet: MatBottomSheet,
    private userService : UserService,
  ) { }

  ngOnInit(): void {
    this.recipe_details$ = this.route.paramMap.pipe(
      switchMap((param: ParamMap)=> {
        this.currentID = param.get('id');
        return this.service.getRecipeDitails(this.currentID!)
      })
    )    
  }

  openSheet():void{
    this.buttonSheet.open(RecipeOptionsComponent, {data:this.currentID});
  }

  isAuth(){
    return this.userService.isAuth();
  }

  userID(){
    if(this.userService.isAuth())
      return JSON.parse(this.userService.getLocalSotrage().getItem('user'))    
  }

}
