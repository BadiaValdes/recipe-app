import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], searchTerm: string): any[] {
    
    if(!value)
    {
      return [];
    }
    if(!searchTerm)
    {
      return value;
    }else{
      searchTerm = searchTerm.toLocaleLowerCase();
      return value.filter(dat => {
        return dat.name.toLocaleLowerCase().includes(searchTerm)
      });}



    

    
  }

}
