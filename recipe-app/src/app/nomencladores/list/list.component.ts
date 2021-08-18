import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

// Site configuration
import { nomencladoresArray } from '../../config/nomencladores';

// Service
import { GeneralApiServicesService } from '../../service/general-api-services.service';

// Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface nomencladores_interface {
  name: string;
  slug: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, AfterViewInit {
  data = nomencladoresArray;

  nomencladores_data = null;

  // Table vars
  displayedColumns: string[] = ['no', 'name', 'slug', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild('paginator') paginator?: MatPaginator; // Usado para caputrar un componente HTML con etiqueta #
  @ViewChild(MatSort) sort? : MatSort;
  // END TABLE VARS

  constructor(private _serviceNomencladores: GeneralApiServicesService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addClickEvent(value) {
    console.log(`El click se dio en ${value}`);
  }

  selectEvent(value) {
    this.dataHttpOriginSelector(value);
  }

  delete(value) {
    console.log(`Eliminar ${value}`);
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

  setTableData(data){
    this.nomencladores_data = data;
    this.dataSource.data = data;
    setTimeout(() => {
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
