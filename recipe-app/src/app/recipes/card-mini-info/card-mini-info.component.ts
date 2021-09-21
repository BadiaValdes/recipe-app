import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-card-mini-info',
  templateUrl: './card-mini-info.component.html',
  styleUrls: ['./card-mini-info.component.css']
})
export class CardMiniInfoComponent implements OnInit {

  @Input() viewMode : number;
  @Input() recipeToShow : Recipe;

  constructor() { }

  ngOnInit(): void {

  }

}
