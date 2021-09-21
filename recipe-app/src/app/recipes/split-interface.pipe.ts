import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitInterface'
})
export class SplitInterfacePipe implements PipeTransform {

  transform(text: string, splitby: string, index: number): any {
    console.log(text)
    let p
    if(Array.isArray(text))
    {
      p = text[0].split(splitby)
    }
    else
    {
      p = text.split(splitby)
    }
      
    return p[index]
  }

}
