import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-recipe-result',
  templateUrl: './recipe-result.component.html',
  styleUrls: ['./recipe-result.component.css']
})
export class RecipeResultComponent implements OnInit {

  @Input() recipes_list : Recipe[];
  constructor() { }

  ngOnInit(): void {
  }

}
