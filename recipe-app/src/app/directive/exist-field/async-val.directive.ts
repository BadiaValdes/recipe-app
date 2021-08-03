import { Directive } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { RecipeService } from '../../service/recipe.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Directive({
  selector: '[asyncValDirective]',
  providers: [
    {
        provide: NG_ASYNC_VALIDATORS,
        useExisting: AsyncValDirective, 
        multi: true
    }
]
})
export class AsyncValDirective implements AsyncValidator{

  constructor(private rs: RecipeService) { }
  validate(ctrl: AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.rs.getRecipe().pipe(
      map(recipe => {
        console.log('inicio')
        let exist: boolean = false;
        recipe.forEach(element => {
          if(element.name === ctrl.value)
          {
            console.log('existe')
            exist = true;
          }
        });
        console.log(exist)
        return exist ? {asyncValDirective : { value: ctrl.value }} : null;
      }),
      catchError(() => of(null))
    )

  }

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
}
