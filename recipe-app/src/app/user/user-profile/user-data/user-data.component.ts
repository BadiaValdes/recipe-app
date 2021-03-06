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
  @Input() showSettings?: boolean = true;
  @Input() showSiteInfo?: boolean = true;
  userRecipe:number = 0;
  constructor(private _recipe : RecipeService, private _user: UserPageService, private _userService : UserService, private _router: Router) { }

  ngOnInit(): void {
    this._recipe.getUserRecipes(this.userData.id).subscribe(
      data => {
        this.userRecipe = data.length
      }
    )
  }

  getLogedUser()
  {
    return this._userService.getLogedUser()
  }

  openAvatarDialog(type : number){
    this._user.UpadteAvatarDialog(this.userData.id, type)
  }

  openPasswordDialog(){
    this._user.updateUserPasswordDialog(this.userData.id)
  }

  openUpdateProfileDialog(){
    this._user.updateUserDataDialog(this.userData.id)
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
