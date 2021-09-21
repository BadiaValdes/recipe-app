import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-mini-card-view',
  templateUrl: './mini-card-view.component.html',
  styleUrls: ['./mini-card-view.component.css']
})
export class MiniCardViewComponent implements OnInit {

  @Input() recipes: Recipe[];

  constructor() { }

  ngOnInit(): void {
  }

}
