import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], searchTerm: string): any[] {
    
    if(!value)
    {
      console.log("No value to show")
      return [];
    }
    if(!searchTerm)
    {
      console.log(searchTerm)
      return value;
    }else{
      searchTerm = searchTerm.toLocaleLowerCase();
      return value.filter(dat => {
        console.log(searchTerm)
        return dat.name.toLocaleLowerCase().includes(searchTerm)
      });}



    

    
  }

}
