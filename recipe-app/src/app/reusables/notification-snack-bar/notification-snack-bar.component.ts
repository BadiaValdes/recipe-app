import { Component, OnInit, Input, Inject } from '@angular/core';

// Material SnackBar component
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-notification-snack-bar',
  templateUrl: './notification-snack-bar.component.html',
  styleUrls: ['./notification-snack-bar.component.css']
})
export class NotificationSnackBarComponent implements OnInit {

  constructor(
    private _selfRef : MatSnackBarRef<NotificationSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data : any,

  ) { }

  ngOnInit(): void {
  }

  closeMe() {
    this._selfRef.dismiss()
  }

}
