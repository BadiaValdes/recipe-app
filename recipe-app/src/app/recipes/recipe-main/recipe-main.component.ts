import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
