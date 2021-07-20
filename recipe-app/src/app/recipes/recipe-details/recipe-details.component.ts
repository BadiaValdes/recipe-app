import { Component, OnInit } from '@angular/core';

// For url parser, needs to be injected
import { ActivatedRoute, ParamMap, Router } from '@angular/router'; //Holds the info from de url that points to this component
import { Location } from '@angular/common'; // Angular service to interact with the browser

import { switchMap } from 'rxjs/operators';

// Service 
import {RecipeService} from '../../service/recipe.service';

// Observable
import { Observable } from 'rxjs';

// Interface
import {Recipe} from '../../interfaces/recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe_details$! : Observable<Recipe>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService,
  ) { }

  ngOnInit(): void {
    this.recipe_details$ = this.route.paramMap.pipe(
      switchMap((param: ParamMap)=> this.service.getRecipeDitails(param.get('id')!))
    )
  }

}
