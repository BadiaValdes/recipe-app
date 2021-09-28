import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UserPageService } from 'src/app/service/user-page.service';
import { take } from 'rxjs/operators';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  userData;


  constructor(
    private _userService : UserService,
    private _userPage : UserPageService
  ) { }

  ngOnInit(): void {    
    this._userPage.updateSubjectSubscriber().pipe().subscribe(
      data => {
        this.userData = this._userService.getLogedUser();
      }
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._userPage.updateValueSubjectNext(true);
  }

}
