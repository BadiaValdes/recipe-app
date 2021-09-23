import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData;

  constructor(
    private _userService : UserService
  ) { }

  ngOnInit(): void {
    this.userData = this._userService.getLogedUser();
    console.log(this._userService.getLogedUser())
  }

}
