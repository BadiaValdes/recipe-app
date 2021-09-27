import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { RecipeService } from 'src/app/service/recipe.service';
import { UserPageService } from 'src/app/service/user-page.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  @Input() userData : User;
  userRecipe:number = 0;
  constructor(private _recipe : RecipeService, private _user: UserPageService) { }

  ngOnInit(): void {
    this._recipe.getUserRecipes(this.userData.id).subscribe(
      data => {
        this.userRecipe = data.length
      }
    )
  }

  openAvatarDialog(){
    this._user.UpadteAvatarDialog(this.userData.id)
  }

}
