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

  customVal():AsyncValidatorFn{
    return(ctrl: AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.rs.existRecipe(ctrl.value).pipe(
        map(res => {
          if(res){
            return {asyncValDirective : { value: ctrl.value }};
          }
          else
            return null;
        })
      )
    }
  }

  // Validación Async
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

  // Async Validator for nomencladores
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

