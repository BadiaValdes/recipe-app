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

  constructor(
    private _dialog: MatDialog,
   
  ) { }
  dialogReference : MatDialogRef<ConfigDialogComponent>
  deleteConfirmDialog(dialogData : any){
   
  }

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

  dialogFinalValue() : Observable<any>{
    return this.dialogReference.afterClosed().pipe(take(1), map (res => {
      return res;
    }))
  }

}
