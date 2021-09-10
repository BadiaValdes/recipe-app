import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

// Site configuration
import { nomencladoresArray } from '../../config/nomencladores';

// Service
import { GeneralApiServicesService } from '../../service/general-api-services.service';

// Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// animation
import { inOutAnimation } from '../../animations';

export interface nomencladores_interface {
  name: string;
  slug: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [inOutAnimation],
})
export class ListComponent implements OnInit, AfterViewInit {
  data = nomencladoresArray; // Get Nomencladores Data Array from Config File

  selector? = null;

  nomencladores_data = null; // Single nomenclador Data

  showForm = false; // Flag for form show

  formNomencladorValue = 0; // Current value to show in form

  showMotivationText = true; // Motivation text

  nomencladorSelected = null;

  // Table vars
  displayedColumns: string[] = ['no', 'name', 'slug', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator; // Usado para caputrar un componente HTML con etiqueta #
  @ViewChild(MatSort) sort?: MatSort; // Capture the matSort tag
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

  // Was selected a nomenclador option?
  addClickEvent(value: number) {
    if (value == 0) {
      this.showForm = false;
      console.log(`El click se dio en ${value}`);
    } else {
      this.showForm = true;
      this.formNomencladorValue = value;
    }
    this.nomencladorSelectorName(value);

    console.log(`El click se dio en ${value}`);
  }

  // Select event
  selectEvent(value) {
    this.dataHttpOriginSelector(value);
    this.selector = value;
    this.nomencladorSelectorName(value)
  }

  nomencladorSelectorName(value: number) {
    switch (value) {
      case 1:
        this.nomencladorSelected = 'Categoria';
        break;
      case 2:
        this.nomencladorSelected = 'Dificultad';
        break;
      case 3:
        this.nomencladorSelected = 'Measurement';
        break;
      case 4:
        this.nomencladorSelected = 'Product';
        break;
      default:
        this.nomencladorSelected = null;
        break;
    }
  }

  // Delete event
  delete(value) {
    console.log(`Eliminar ${value}`);
  }

  // Get Data from the selected value
  dataHttpOriginSelector(value) {
    switch (value) {
      case 1:
        this._serviceNomencladores.getCategory().subscribe((data) => {
          this.setTableData(data);
        });
        break;
      case 2:
        this._serviceNomencladores.getDifficulty().subscribe((data) => {
          this.setTableData(data);
        });
        break;
      case 3:
        this._serviceNomencladores.getMeasurement().subscribe((data) => {
          this.setTableData(data);
        });
        break;
      case 4:
        this._serviceNomencladores.getProducts().subscribe((data) => {
          this.setTableData(data);
        });
        break;
      default:
        break;
    }
  }

  // Set the data to the table
  setTableData(data) {
    this.nomencladores_data = data;
    this.dataSource.data = data;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
