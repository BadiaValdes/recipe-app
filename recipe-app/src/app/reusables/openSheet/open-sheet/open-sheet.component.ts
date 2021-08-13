import { Component, OnInit, Inject } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet'; 
@Component({
  selector: 'app-open-sheet',
  templateUrl: './open-sheet.component.html',
  styleUrls: ['./open-sheet.component.css']
})
export class OpenSheetComponent implements OnInit {

  buttonList : any = null;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data : any,
  
  ) { }

  ngOnInit(): void {
  }

}
