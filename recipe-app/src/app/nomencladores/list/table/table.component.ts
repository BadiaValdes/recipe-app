import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';

// Site configuration
import { nomencladoresArray } from '../../../config/nomencladores';

// Service
import { GeneralApiServicesService } from '../../../service/general-api-services.service';

// Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit , AfterViewInit{
  data = nomencladoresArray;
  @Input() data2;

    // Table vars
    displayedColumns: string[] = ['no', 'name', 'slug', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator?: MatPaginator; // Usado para caputrar un componente HTML con etiqueta #
    @ViewChild(MatSort) sort? : MatSort;
    // END TABLE VARS
  constructor(private _serviceNomencladores: GeneralApiServicesService) { }

  ngOnInit(): void {
    this.dataHttpOriginSelector(this.data2)
    console.log(this.data2)
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  dataHttpOriginSelector(value) {
    switch (value) {
      case 1:
        this._serviceNomencladores.getCategory().subscribe((data) => {
          this.setTableData(data)
        });
        break;
      case 2:
        this._serviceNomencladores.getDifficulty().subscribe((data) => {
          this.setTableData(data)
        });
        break;
      case 3:
        this._serviceNomencladores.getMeasurement().subscribe((data) => {
          this.setTableData(data)
        });
        break;
      case 4:
        this._serviceNomencladores.getProducts().subscribe((data) => {
          this.setTableData(data)
          
        });
        break;
      default:
        break;
    }
  }

  delete(value) {
    console.log(`Eliminar ${value}`);
  }


  setTableData(data){
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  /*  Use this when the table is in the parent component
   setTimeout(() => {
      

    });
 */
}
}
