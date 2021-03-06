import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

// Site configuration
import { nomencladoresArray } from '../../../config/nomencladores';
import {defaultDeleteMessage} from '../../../config/dialogDefaultMessages'

// Service
import { GeneralApiServicesService } from '../../../service/general-api-services.service';

// Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// Snack Service
import { NotificationSnackBarService } from '../../../service/notification-snack-bar.service';
import { ConfirmDialogServiceService } from '../../../service/confirm-dialog-service.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  data = nomencladoresArray;
  @Input() data2; // input data

  // Table vars
  displayedColumns: string[] = ['no', 'name', 'slug', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator; // Usado para caputrar un componente HTML con etiqueta #
  @ViewChild(MatSort) sort?: MatSort; // Get sort element
  // END TABLE VARS
  constructor(
    private _serviceNomencladores: GeneralApiServicesService, 
    private _notificationService: NotificationSnackBarService, // Snack msg notification
    private _confirmDialog: ConfirmDialogServiceService, // Dialog confirmation before delete
  ) {}

  ngOnInit(): void {
    // Get the origin of the event and fill the table rows
    this.dataHttpOriginSelector(this.data2).subscribe((data) => {
      this.setTableData(data);
    });
    console.log(this.data2);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Delete Actions
  delete(value) {

    this._confirmDialog.openDialog(defaultDeleteMessage); // Open generic dialog confirm
    // What happen next?
    this._confirmDialog.dialogFinalValue().subscribe((data) => {
      if (data) {
        this.deleteAction(value);
      }
    });
  }
  
  deleteAction(value){
    // Send the delete to the http call
    this.deleteHttpOriginSelector(value).then((_) => {
      // After the delete operation, get the data and delete the deleted appearance 
      this.dataSource.data = this.dataSource.data.filter(
        (data) => data.id != value
      );
      // Create the snack bar options
      let options = {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      };
      // Show the snack bar with the corresponding data
      this._notificationService.openSimpleNotificationSnackBar(
        'Datos eliminados',
        'cerrar',
        options
      );
    });
  }
  // END OF DELETE ACTIONS

  // OPTION SELECTOR
  // Get data origin
  dataHttpOriginSelector(value) {
    switch (value) {
      case 1:
        return this._serviceNomencladores.getCategory();

      case 2:
        return this._serviceNomencladores.getDifficulty();

      case 3:
        return this._serviceNomencladores.getMeasurement();

      case 4:
        return this._serviceNomencladores.getProducts();
    }
  }

  // delete value
  deleteHttpOriginSelector(value) {
    switch (this.data2) {
      case 1:
        return this._serviceNomencladores.deleteCategory(value);

      case 2:
        return this._serviceNomencladores.deleteDifficulty(value);

      case 3:
        return this._serviceNomencladores.deleteMeasurement(value);

      case 4:
        return this._serviceNomencladores.deleteProduct(value);
    }
  }

  // set the table data
  setTableData(data) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    /*  Use this when the table is in the parent component
   setTimeout(() => {
      

    });
 */
  }
}
