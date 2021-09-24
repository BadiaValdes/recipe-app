import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subString'
})
export class SubStringPipe implements PipeTransform {

  transform(value: string, subStringInitial : number, subStringFinal : number): unknown {

    return value.substr(subStringInitial,subStringFinal);
  }

}
