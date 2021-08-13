import { Injectable } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog'
import { Observable } from 'rxjs';

// Dialog Component
import {ConfigDialogComponent} from '../reusables/config-dialog/config-dialog.component'

import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogServiceService {
  // Service for reusable MatDialog

  constructor(
    private _dialog: MatDialog, 
   
  ) { }

  dialogReference : MatDialogRef<ConfigDialogComponent> // Create Component reference


  deleteConfirmDialog(dialogData : any){
  }

  // Open the dialog with some options -> This case data
  openDialog(options : any)
  {
    this.dialogReference = this._dialog.open(ConfigDialogComponent, {
      data:{
        title: options.title,
        description: options.description,
        actionButton: options.actionButton,
        name: options.name
    }
  }
    )
  }

 /*  
 Para aceptar llamadas del teclado
 @HostListener("keydown.esc") 
  public onEsc() {
    this.close(false);
  } */

  // Return an observable after close
  dialogFinalValue() : Observable<any>{
    return this.dialogReference.afterClosed().pipe(
      take(1), // Takes the first element
      map (res => { // Return the result
      return res;
    }))
  }

}
