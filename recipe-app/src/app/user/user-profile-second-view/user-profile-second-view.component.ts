import { Component, OnInit } from '@angular/core';
import { UserPageService } from 'src/app/service/user-page.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile-second-view',
  templateUrl: './user-profile-second-view.component.html',
  styleUrls: ['./user-profile-second-view.component.css']
})
export class UserProfileSecondViewComponent implements OnInit {
  userData;
  userRouteData$;
  constructor(private _user : UserPageService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userRouteData$ = this._route.paramMap.pipe(
      switchMap((param: ParamMap)=> {       
        return this._user.getUserDetailsByUsername(param.get('username'))
      })
    )    
    this.userRouteData$.subscribe(data => {
      this.userData = data;
    }) 
  }

}
