import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Recipe } from 'src/app/interfaces/recipe';
import { trigger, state, style, transition, animate } from '@angular/animations';

// my animation
import {scaleCenter,inOutAnimationFast} from '../../../animations'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
  animations: [
    trigger('detailExpand', [ state('collapsed, void', style({ height: '0px' })), state('expanded', style({ height: '*' })), transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')), transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')) ]),
    scaleCenter,
    inOutAnimationFast,
  ],
})
export class ListViewComponent implements OnInit, AfterViewInit {
  @Input() recipes: Recipe[];
  showTable : boolean = false;  
  expandedElement : Recipe | null;
  displayedColumns: string[] = [ 'name', 'category', 'difficulty', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator; // Usado para caputrar un componente HTML con etiqueta #
  @ViewChild(MatSort) sort?: MatSort; // Get sort element
  

  constructor(private _router: Router) {

   }

  ngOnInit(): void {  
   this.populateDataSource()

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  populateDataSource(){
    console.log('lol'+this.recipes)
    this.dataSource.data = this.recipes;
    // Override the Filter Predicate behaviero
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return (
        data.name.toLowerCase().includes(filter) ||
        // You need to add the data.ATRIBUTE that you whant to filter
        data.fk_category.toLowerCase().includes(filter) ||
        data.fk_difficult.toLowerCase().includes(filter)
      );
    };

  }

  touchedRow(row){

  }

  mainIngredient(ingredients: string[]){
    return ingredients.filter(ingredient => ingredient.slice(-4) === 'True')
  }


  applyFilter(event:string){
    event = event.trim().toLocaleLowerCase()
    this.dataSource.filter = event;
  }

  navigateTo(slug){
    this._router.navigateByUrl(this._router.url+'/'+slug)
  }

}
