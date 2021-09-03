import { Injectable } from '@angular/core';
import { AsyncValidator, ValidationErrors, AbstractControl, AsyncValidatorFn } from '@angular/forms';

import {RecipeService} from '../../service/recipe.service';
import {GeneralApiServicesService} from '../../service/general-api-services.service';
import { Recipe } from 'src/app/interfaces/recipe';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, debounceTime, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// Async validator
export class AsyncValServiceService {

  constructor(private rs: RecipeService,
    private _genarlAPI : GeneralApiServicesService) { }

  // Validator service
  customVal():AsyncValidatorFn{
    return(ctrl: AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      // Search for existing recipe
      return this.rs.existRecipe(ctrl.value).pipe(
        // As and observable, whe can manipulate de data before make a subscription
        map(res => {
          // In case that a Recipe with the same value exist, we need to send an error Flag
          if(res){
            return {asyncValDirective : { value: ctrl.value }};
          }
          // Else, all is well
          else
            return null;
        })
      )
    }
  }

  // Validación Async - Same as before but with lower code
  customVal2():AsyncValidatorFn{
    return(ctrl: AbstractControl) => {
      return this.rs.getRecipe().pipe(
        map(data=>{
          let exist = data.find(d => (d.name.toLowerCase() === ctrl.value.toLowerCase()))
          return exist ? {asyncVal: true} : null;
        })
      )
    }

  }

  // Async Validator for nomencladores - Same as before but with other model
  nomencladoresAsynVal():AsyncValidatorFn{
    return(ctrl: AbstractControl) => {
      return this._genarlAPI.getCategory().pipe(
        map(data=>{
          let exist = data.find(d => (d.name.toLowerCase() === ctrl.value.toLowerCase()))
          return exist ? {asyncVal: true} : null;
        })
      )
    }
  }
}

