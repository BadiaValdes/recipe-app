import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  @Input() userData : User;
  userRecipe:number = 0;
  constructor(private _recipe : RecipeService) { }

  ngOnInit(): void {
    this._recipe.getUserRecipes(this.userData.id).subscribe(
      data => {
        this.userRecipe = data.length
      }
    )
  }

}
