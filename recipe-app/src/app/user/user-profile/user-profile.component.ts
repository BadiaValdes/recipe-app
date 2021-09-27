import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UserPageService } from 'src/app/service/user-page.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData;

  constructor(
    private _userService : UserService,
    private _userPage : UserPageService
  ) { }

  ngOnInit(): void {
 
    
    this._userPage.updateSubjectSubscriber().pipe().subscribe(
      data => {
        console.log(data)
        if (data){
          this.userData = this._userService.getLogedUser();
          this._userPage.updateValueSubjectNext(false);
        }
      }
    )
  }

}
