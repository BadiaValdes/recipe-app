import { Injectable } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet'; 
import {OpenSheetComponent} from '../reusables/openSheet/open-sheet/open-sheet.component'
@Injectable({
  providedIn: 'root'
})
export class OpenSheetService {

  constructor(
    private _sheet : MatBottomSheet,
    private _sheetRef : MatBottomSheetRef<OpenSheetComponent>
  ) { }

  openSheet(data){
    this._sheetRef = this._sheet.open(OpenSheetComponent, data)
  }

  afterClose(){
    this._sheetRef.dismiss()
  }
}
