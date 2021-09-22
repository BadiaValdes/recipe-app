import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mini-card-view',
  templateUrl: './mini-card-view.component.html',
  styleUrls: ['./mini-card-view.component.css']
})
export class MiniCardViewComponent implements OnInit {

  @Input() recipes: Recipe[];
  @Input() filters: boolean = false;

  searchFilterText : string = "";

  constructor(
    private _router : Router
  ) { }

  ngOnInit(): void {
  }

  openDetailRoute(slug){
    this._router.navigateByUrl('recipe/'+slug);
  }

}
