import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

//Api recipe
import {RecipeService} from "../../../service/recipe.service"
import { map, switchMap } from 'rxjs/operators';

//interface 

import {Recipe} from "../../../interfaces/recipe"
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[appRecipeName]'
})
export class RecipeNameDirective {

  constructor() { }

}

export function existRecipe(): ValidatorFn{
  
  return (control: AbstractControl): ValidationErrors | null => {
    return null
  }
}
