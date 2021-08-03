import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPrincipalCheck]'
})
export class PrincipalCheckDirective {

  constructor() { }

}

export function checkPrincipalValidator() : ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {

    return {ceckName: {value: true}}
  }
}
