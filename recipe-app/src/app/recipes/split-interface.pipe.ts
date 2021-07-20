import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitInterface'
})
export class SplitInterfacePipe implements PipeTransform {

  transform(text: string, splitby: string, index: number): any {
    let p = text.split(splitby)
    return p[index]
  }

}
