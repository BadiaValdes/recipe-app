import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { RecipeService } from 'src/app/service/recipe.service';
import { UserPageService } from 'src/app/service/user-page.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  @Input() userData : User;
  userRecipe:number = 0;
  constructor(private _recipe : RecipeService, private _user: UserPageService, private _userService : UserService, private _router: Router) { }

  ngOnInit(): void {
    this._recipe.getUserRecipes(this.userData.id).subscribe(
      data => {
        this.userRecipe = data.length
      }
    )
  }

  openAvatarDialog(type : number){
    this._user.UpadteAvatarDialog(this.userData.id, type)
  }

  openPasswordDialog(){
    this._user.updateUserPasswordDialog(this.userData.id)
  }

  logOut(){
    this._userService.logout()
  }

  searchRecipes(){

    this._router.navigateByUrl('/recipe',{ state: { recipeSearch: true, user: this.userData.id}

      })
      this._user.updateValueSubjectNext(true);
  }

  

}
