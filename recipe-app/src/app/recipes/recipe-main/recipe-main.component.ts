import { Component, OnInit } from '@angular/core';

// Dialog
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

// Component
import {RecipeCreateComponent} from '../recipe-create/recipe-create.component'

@Component({
  selector: 'app-recipe-main',
  templateUrl: './recipe-main.component.html',
  styleUrls: ['./recipe-main.component.css']
})
export class RecipeMainComponent implements OnInit {

  opened: boolean = false;

  changeOpenArrowDirection(){
    this.opened = this.opened ? false : true;
  }

  constructor(public matDialog : MatDialog) { }

  openCreateDialog(){
    this.matDialog.open(RecipeCreateComponent);
  }

  ngOnInit(): void {
  }

}
