import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-steps',
  templateUrl: './recipe-steps.component.html',
  styleUrls: ['./recipe-steps.component.css']
})
export class RecipeStepsComponent implements OnInit {

  @Input()
  setp!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
