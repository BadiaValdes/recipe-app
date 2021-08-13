import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Service for dialog config

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  styleUrls: ['./config-dialog.component.css'],
})

export class ConfigDialogComponent implements OnInit {
  constructor(
    private _selfReference: MatDialogRef<ConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any // Injected data
  ) {}

  ngOnInit(): void {}

  closeMe() {
    this._selfReference.close();
  }

  confirmMe() {
    this._selfReference.close(true);
  }
}
