import { Component, OnInit, Inject } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet'; 

// Service 
import {RecipeService} from '../../../service/recipe.service'

// Router
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-options',
  templateUrl: './recipe-options.component.html',
  styleUrls: ['./recipe-options.component.css']
})
export class RecipeOptionsComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _recipeService : RecipeService,
    private _router: Router,
    private _selfMatBSReference: MatBottomSheetRef<RecipeOptionsComponent>,
  ) {
    console.log(data)
   }

  ngOnInit(): void {
  }

  // Delete Recipe
  eliminarReceta(){
    this._recipeService.deleteRecipe(this.data).then(_ => {
      this._selfMatBSReference.dismiss()
      this._router.navigate(['./recipe'])
    })
    
  }

}
