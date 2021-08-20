import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

// Site configuration
import { nomencladoresArray } from '../../config/nomencladores';

// Service
import { GeneralApiServicesService } from '../../service/general-api-services.service';

// Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

// animation
import {inOutAnimation} from '../../animations'

export interface nomencladores_interface {
  name: string;
  slug: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [inOutAnimation]
})
export class ListComponent implements OnInit, AfterViewInit {
  data = nomencladoresArray;

  selector? = null;

  nomencladores_data = null;

  showForm = false;

  formNomencladorValue = 0;

  showMotivationText = true;

  // Table vars
  displayedColumns: string[] = ['no', 'name', 'slug', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator; // Usado para caputrar un componente HTML con etiqueta #
  @ViewChild(MatSort) sort? : MatSort;
  // END TABLE VARS

  constructor(private _serviceNomencladores: GeneralApiServicesService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showMotivationText = false;
    }, 3000);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addClickEvent(value: number) {
    if(value == 0)
    {
      this.showForm = false;
      console.log(`El click se dio en ${value}`);
    }
    else{
      this.showForm = true;
      this.formNomencladorValue = value;
    }
    
    console.log(`El click se dio en ${value}`);
  }

  selectEvent(value) {
    this.dataHttpOriginSelector(value);
    this.selector = value;
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
