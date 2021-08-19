import { Injectable } from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef, TextOnlySnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar'; 

//SnackBar component
import {NotificationSnackBarComponent} from '../reusables/notification-snack-bar/notification-snack-bar.component'

@Injectable({
  providedIn: 'root'
})


export class NotificationSnackBarService {

  constructor(
    private _notificationSnackBar : MatSnackBar,
  ) { }

  snackRef : MatSnackBarRef<NotificationSnackBarComponent>
  simpleSnackRef : MatSnackBarRef<TextOnlySnackBar>;

  // {data,duration,direction,verticalPosition,horizontalPosition}

  openSimpleNotificationSnackBar(message: string = "Mensaje por defecto", closeText: string ="Cerrar", options)
  {
    this.simpleSnackRef = this._notificationSnackBar.open(message, closeText, {
      duration: options.duration,
      verticalPosition: options.verticalPosition,
      horizontalPosition: options.horizontalPosition,
    } )
  }

  openComplexSnackBarNotification(options){
    this.snackRef = this._notificationSnackBar.openFromComponent(NotificationSnackBarComponent, {
      duration: options.duration,
      verticalPosition: options.verticalPosition,
      horizontalPosition: options.horizontalPosition,
      data: options.data
    })
  }

  // verticalPosition : Top || Bottom
  // horizontalPosition: Start || Center || END || Right || Left

}

